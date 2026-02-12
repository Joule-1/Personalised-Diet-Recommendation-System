# ml-model-service/app.py
import os
import json
import logging
from typing import Dict, List, Tuple, Any

from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np

# ----------------------------
# Basic logging
# ----------------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("diet-ml-service")

# ----------------------------
# Configuration (move to JSON for production)
# ----------------------------
CONFIG = {
    # how much each component contributes to final score
    "weights": {
        "ml": 0.7,
        "direction": 0.1,    # nutrient-direction preference (soft)
        "calorie": 0.15,
        "protein": 0.05
    },
    # maximum number of conditions allowed (protects dilution)
    "max_conditions": 6,
    # meal percent mapping if calorieTarget not provided
    "meal_percentages": {
        "breakfast": 0.25,
        "lunch": 0.35,
        "dinner": 0.30,
        "snack": 0.10,
        "beverage": 0.05
    },
    # strict conflicts (medical contradictions) - configurable
    "strict_conflicts": [
        ("CKD_Early", "Muscle_Gain"),
        ("CKD_Early", "Body_Recomposition"),
        ("CKD_Early", "Sarcopenia"),
    ],
    # per-condition hard nutrient limits (only use for critical safety)
    # keys are condition names -> nutrient -> dict(min/max)
    "condition_hard_constraints": {
        "CKD_Early": {
            "Protein (g)": {"max": 20}
        },
        "Hypertension": {
            "Sodium (mg)": {"max": 1500}
        },
        "Diabetes": {
            "Free Sugar (g)": {"max": 25}
        }
    },
    # nutrient direction profiles (soft preferences). Positive = want more, negative = penalize high values
    # Use small integers; they will be normalized when applied.
    "condition_direction_profile": {
        "Muscle_Gain": {"Protein (g)": 3, "Calories (kcal)": 2},
        "Obesity": {"Calories (kcal)": -3, "Fibre (g)": 2},
        "PCOS": {"Free Sugar (g)": -2, "Carbohydrates (g)": -1, "Fibre (g)": 1},
        "Diabetes": {"Free Sugar (g)": -3, "Carbohydrates (g)": -2, "Fibre (g)": 2},
        "Hypertension": {"Sodium (mg)": -3, "Fibre (g)": 1},
        "Vegan": {},  # diet framework may be handled via filters rather than directions
        "Keto": {"Carbohydrates (g)": -3, "Fats (g)": 2}
        # extend as needed...
    },
    # minimal nutritional sanity checks: generic rules that eliminate obviously unsuitable foods
    "sanity_filters": [
        # each entry: (predicate_name, lambda row, conditions -> bool keep_row)
        # These are represented below in apply_sanity_filters() as configurable checks.
    ]
}


# ----------------------------
# Helpers: load model + encoders + dataset
# ----------------------------
MODEL_PATH = "diet_model.pkl"
ENCODERS = {
    "le_condition": "le_condition.pkl",
    "le_meal": "le_meal.pkl",
    "le_diet": "le_diet.pkl"
}
DATA_PATH = "final_df_cleaned.csv"


def load_artifacts():
    # load model
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"{MODEL_PATH} not found. Place the trained model in the service folder.")
    model = joblib.load(MODEL_PATH)
    # load encoders
    encoders = {}
    for k, fn in ENCODERS.items():
        if not os.path.exists(fn):
            raise FileNotFoundError(f"Encoder file {fn} missing. Save encoders from training (joblib.dump).")
        encoders[k] = joblib.load(fn)
    # load dataset
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(f"Dataset {DATA_PATH} missing.")
    df = pd.read_csv(DATA_PATH)
    return model, encoders, df


# ----------------------------
# Initialize service
# ----------------------------
app = Flask(__name__)
try:
    model, encoders, df = load_artifacts()
    le_condition = encoders["le_condition"]
    le_meal = encoders["le_meal"]
    le_diet = encoders["le_diet"]
    logger.info("Model, encoders and dataset loaded successfully.")
except Exception as e:
    logger.exception("Failed to load artifacts at startup: %s", e)
    # in production you might want to exit; here we keep app running to return helpful errors
    model = None
    le_condition = le_meal = le_diet = None
    df = pd.DataFrame()


# ----------------------------
# Utility functions
# ----------------------------
def validate_request(data: Dict[str, Any]) -> Tuple[bool, str]:
    required = ["conditions", "meal_type", "diet_preference"]
    for r in required:
        if r not in data:
            return False, f"Missing required field: {r}"
    if not isinstance(data["conditions"], list):
        return False, "conditions must be a list"
    return True, ""


def sanitize_conditions(conditions: List[str]) -> Tuple[List[str], List[Tuple[str, str]]]:
    """
    Apply config-defined strict conflict resolution:
    - If strict conflict found, drop the goal-type condition (the second item in pair) and return conflicts list.
    """
    conflicts_found = []
    conditions_set = list(dict.fromkeys(conditions))  # preserve order, remove duplicates

    # limit number of conditions to avoid dilution
    if len(conditions_set) > CONFIG["max_conditions"]:
        conditions_set = conditions_set[: CONFIG["max_conditions"]]

    for a, b in CONFIG["strict_conflicts"]:
        if a in conditions_set and b in conditions_set:
            # keep a (medical), remove b (goal) — configurable policy
            if b in conditions_set:
                conditions_set.remove(b)
            conflicts_found.append((a, b))

    return conditions_set, conflicts_found


def apply_hard_constraints(df_in: pd.DataFrame, conditions: List[str]) -> pd.DataFrame:
    """
    Apply per-condition hard min/max constraints from CONFIG['condition_hard_constraints'].
    This is vectorized and generic (no hardcoded condition checks).
    """
    df_out = df_in.copy()
    for cond in conditions:
        rules = CONFIG.get("condition_hard_constraints", {}).get(cond, {})
        for nutrient, bounds in rules.items():
            if "max" in bounds and nutrient in df_out.columns:
                df_out = df_out[df_out[nutrient] <= bounds["max"]]
            if "min" in bounds and nutrient in df_out.columns:
                df_out = df_out[df_out[nutrient] >= bounds["min"]]
            # after each rule, early return if empty
            if df_out.empty:
                return df_out
    return df_out


def apply_sanity_filters(df_in: pd.DataFrame, conditions: List[str]) -> pd.DataFrame:
    """
    Apply a set of generic, high-level nutritional sanity filters that operate on nutrient patterns
    rather than named foods. These are lightweight rules to remove clearly unsuitable items.
    """
    df_out = df_in.copy()
    # Example: remove items that are high sugar and ultra-low protein when obesity/diabetes present
    if any(c in conditions for c in ("Obesity", "Diabetes")):
        if "Free Sugar (g)" in df_out.columns and "Protein (g)" in df_out.columns:
            df_out = df_out[~((df_out["Free Sugar (g)"] > 20) & (df_out["Protein (g)"] < 5))]

    # Example: if muscle gain, prefer foods with some minimum protein
    if "Muscle_Gain" in conditions and "Protein (g)" in df_out.columns:
        df_out = df_out[df_out["Protein (g)"] >= 8]

    # Example: hypertension sodium cap
    if "Hypertension" in conditions and "Sodium (mg)" in df_out.columns:
        df_out = df_out[df_out["Sodium (mg)"] <= 1500]

    return df_out


def build_direction_score(df_subset: pd.DataFrame, conditions: List[str]) -> np.ndarray:
    """
    Create a combined direction score based on CONFIG['condition_direction_profile'].
    Steps:
      - gather the weighted direction vector for all selected conditions
      - normalize relevant nutrient columns to 0-1
      - compute dot product of normalized nutrient values with weights
    """
    if df_subset.empty:
        return np.array([])

    # gather combined direction weights for selected conditions
    combined_weights = {}
    for cond in conditions:
        profile = CONFIG.get("condition_direction_profile", {}).get(cond, {})
        for nutrient, w in profile.items():
            combined_weights[nutrient] = combined_weights.get(nutrient, 0) + w

    if not combined_weights:
        return np.zeros(len(df_subset))

    # only use nutrients present in dataframe
    nutrients = [n for n in combined_weights.keys() if n in df_subset.columns]
    if not nutrients:
        return np.zeros(len(df_subset))

    # normalize nutrient columns to 0-1
    norm = df_subset[nutrients].astype(float).copy()
    denom = norm.max() - norm.min()
    denom = denom.replace(0, 1)  # avoid division by zero
    norm = (norm - norm.min()) / denom

    # build weight vector aligned to nutrients order
    weight_vector = np.array([combined_weights[n] for n in nutrients], dtype=float)

    # direction score = normalized_values dot weights (higher better if weight positive; lower better if negative)
    # we normalize result to 0-1 by min-max scaling to keep scale consistent
    raw = norm.values.dot(weight_vector)
    if raw.size == 0:
        return np.zeros(len(df_subset))

    # min-max normalize raw to 0-1
    raw_min, raw_max = raw.min(), raw.max()
    if raw_max - raw_min == 0:
        return np.ones(len(raw)) * 0.5
    direction_score = (raw - raw_min) / (raw_max - raw_min)
    return direction_score


def compute_calorie_target(user_profile: Dict[str, Any]) -> float:
    """
    Compute meal calorie target from user profile if not explicitly provided.
    Recognizes tdee stored in profile or computes BMR if height/weight/age/gender provided.
    Uses CONFIG['meal_percentages'] to split for meal type.
    """
    # prefer explicit
    if user_profile.get("calorieTarget"):
        return user_profile["calorieTarget"]

    # prefer tdee if stored
    tdee = user_profile.get("tdee")
    if tdee:
        pct = CONFIG["meal_percentages"].get(user_profile.get("meal_type", "lunch"), 0.3)
        return float(tdee) * pct

    # compute BMR via Mifflin-St Jeor if possible
    try:
        weight = float(user_profile.get("weight"))
        height_cm = float(user_profile.get("height"))
        age = float(user_profile.get("age"))
        gender = user_profile.get("gender", "male")
        if gender == "male":
            bmr = 10 * weight + 6.25 * height_cm - 5 * age + 5
        else:
            bmr = 10 * weight + 6.25 * height_cm - 5 * age - 161
        activity_map = {"sedentary": 1.2, "light": 1.375, "moderate": 1.55, "active": 1.725, "very_active": 1.9}
        activity = user_profile.get("activityLevel", "moderate")
        tdee = bmr * activity_map.get(activity, 1.55)
        pct = CONFIG["meal_percentages"].get(user_profile.get("meal_type", "lunch"), 0.3)
        return tdee * pct
    except Exception:
        # fallback default calorie
        return 500.0


def compute_protein_target(user_profile: Dict[str, Any]) -> float:
    if user_profile.get("proteinTarget"):
        return float(user_profile["proteinTarget"])
    # default: 1.2 g/kg for general; adjust by goal if available
    weight = float(user_profile.get("weight", 70))
    # if user has muscle goals, bump it
    if any(g in user_profile.get("conditions", []) for g in ("Muscle_Gain", "Body_Recomposition", "Sarcopenia")):
        factor = 1.6
    else:
        factor = 1.2
    return weight * factor


# ----------------------------
# Core ML scoring and pipeline
# ----------------------------
def run_ml_scoring(user_input: Dict[str, Any]) -> pd.DataFrame:
    """
    1) Filter dataset by meal_type & diet_preference (using saved encoders)
    2) Sanitize and limit conditions
    3) Apply hard constraints (for safety)
    4) Apply ML model multi-condition averaging to compute ml_score
    """
    if model is None or df.empty or le_meal is None or le_diet is None:
        raise RuntimeError("Model or artifacts not loaded")

    # basic validation
    ok, msg = validate_request(user_input)
    if not ok:
        raise ValueError(msg)

    # sanitize and limit conditions
    conditions = user_input.get("conditions", [])
    conditions, conflicts = sanitize_conditions(conditions)

    # decode encoders (they map string -> int previously used in training)
    try:
        meal_code = le_meal.transform([user_input["meal_type"]])[0]
        diet_code = le_diet.transform([user_input["diet_preference"]])[0]
    except Exception as e:
        raise ValueError(f"Encoder transform failed for meal_type/diet_preference: {e}")

    # filter dataset
    filtered = df[(df["meal_type"] == meal_code) & (df["diet_preference"] == diet_code)].copy()
    if filtered.empty:
        return pd.DataFrame()  # nothing to recommend

    # apply per-condition hard constraints (medical safety)
    filtered = apply_hard_constraints(filtered, conditions)
    if filtered.empty:
        return pd.DataFrame()

    # apply sanity filters (generic)
    filtered = apply_sanity_filters(filtered, conditions)
    if filtered.empty:
        return pd.DataFrame()

    # ML multi-condition scoring: predict for each condition then average
    probs_list = []
    for cond in conditions:
        if cond not in le_condition.classes_:
            # if a condition was not in training label encoder, skip it
            logger.warning("Condition '%s' not seen in encoder classes, skipping ML scoring for it.", cond)
            continue
        cond_code = le_condition.transform([cond])[0]
        filtered["condition"] = cond_code
        X = filtered.drop(columns=["Dish Name", "suitable", "portion_basis"], errors="ignore")
        probs = model.predict_proba(X)[:, 1]
        probs_list.append(probs)

    if not probs_list:
        # fallback: model can't score (no valid conditions), set neutral ml score
        filtered["ml_score"] = 0.5
    else:
        avg = np.mean(probs_list, axis=0)
        filtered["ml_score"] = avg

    return filtered


def post_process_and_personalize(scored_df: pd.DataFrame, user_profile: Dict[str, Any], top_n: int = 10) -> Tuple[List[Dict], Dict]:
    """
    Apply direction scoring, calorie/protein alignment, combine scores and return final ordered list
    Also return a small debug summary.
    """
    if scored_df.empty:
        return [], {"reason": "no_candidates"}

    conditions = user_profile.get("conditions", [])

    # direction (soft): build a normalized direction score 0-1
    dir_score = build_direction_score(scored_df, conditions)
    scored_df["direction_score"] = dir_score

    # calorie & protein target
    meal_calorie_target = compute_calorie_target(user_profile)
    protein_target = compute_protein_target(user_profile)

    # calorie_score: closeness to target (1 best -> 0 worst)
    if "Calories (kcal)" in scored_df.columns:
        scored_df["calorie_diff"] = (scored_df["Calories (kcal)"] - meal_calorie_target).abs()
        md = scored_df["calorie_diff"].max()
        scored_df["calorie_score"] = 1 - (scored_df["calorie_diff"] / (md if md != 0 else 1))
    else:
        scored_df["calorie_score"] = 0.5

    # protein_score
    if "Protein (g)" in scored_df.columns:
        scored_df["protein_diff"] = (scored_df["Protein (g)"] - protein_target).abs()
        md = scored_df["protein_diff"].max()
        scored_df["protein_score"] = 1 - (scored_df["protein_diff"] / (md if md != 0 else 1))
    else:
        scored_df["protein_score"] = 0.5

    # combine with configurable weights
    w = CONFIG["weights"]
    scored_df["final_score"] = (
        w["ml"] * scored_df["ml_score"]
        + w["direction"] * scored_df["direction_score"]
        + w["calorie"] * scored_df["calorie_score"]
        + w["protein"] * scored_df["protein_score"]
    )

    # select top_n
    out = scored_df.sort_values("final_score", ascending=False).head(top_n)

    # prepare response dicts
    results = []
    for _, r in out.iterrows():
        results.append({
            "Dish Name": r.get("Dish Name"),
            "Calories (kcal)": float(r.get("Calories (kcal)", np.nan)),
            "Protein (g)": float(r.get("Protein (g)", np.nan)),
            "Free Sugar (g)": float(r.get("Free Sugar (g)", np.nan)) if "Free Sugar (g)" in r else None,
            "ml_score": float(r.get("ml_score", 0)),
            "direction_score": float(r.get("direction_score", 0)),
            "calorie_score": float(r.get("calorie_score", 0)),
            "protein_score": float(r.get("protein_score", 0)),
            "final_score": float(r.get("final_score", 0))
        })

    debug = {
        "requested_conditions": conditions,
        "computed_meal_calorie_target": meal_calorie_target,
        "computed_protein_target": protein_target,
        "candidates_before_postprocess": int(scored_df.shape[0]),
    }
    return results, debug


# ----------------------------
# Flask endpoint
# ----------------------------
@app.route("/recommend", methods=["POST"])
def recommend():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        payload = request.get_json(force=True)
    except Exception:
        return jsonify({"error": "Invalid JSON payload"}), 400

    ok, msg = validate_request(payload)
    if not ok:
        return jsonify({"error": msg}), 400

    try:
        scored = run_ml_scoring(payload)
        if scored.empty:
            return jsonify({"message": "No candidates after filters"}), 200

        # Second safety pass: apply any additional hard constraints from config once again
        scored = apply_hard_constraints(scored, payload.get("conditions", []))
        scored = apply_sanity_filters(scored, payload.get("conditions", []))

        results, debug = post_process_and_personalize(scored, payload, top_n=10)
        return jsonify({"results": results, "debug": debug}), 200

    except Exception as e:
        logger.exception("Recommendation failure: %s", e)
        return jsonify({"error": str(e)}), 500


# ----------------------------
# Run server
# ----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
