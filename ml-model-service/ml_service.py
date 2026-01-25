from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# 🔹 LOAD BOTH FILES (IMPORTANT)
model = joblib.load("diet_model_personalized.pkl")
condition_encoder = joblib.load("condition_encoder.pkl")

# 🔹 LOAD DATASET
df = pd.read_csv("final_df_cleaned.csv")

FEATURE_COLS = [
    "Calories (kcal)",
    "Protein (g)",
    "Carbohydrates (g)",
    "Fats (g)",
    "Fibre (g)",
    "Sodium (mg)",
    "Vitamin C (mg)",
    "Folate (µg)",
    "condition_encoded",
    "age",
    "gender",
    "BMI"
]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # ---- USER INPUT ----
    age = data["age"]
    gender = 1 if data["gender"].lower() == "female" else 0
    height = data["height"]
    weight = data["weight"]
    condition = data["condition"]
    meal_type = data.get("meal_type")
    diet_pref = data.get("diet_preference")
    top_k = data.get("top_k", 5)
    threshold = data.get("threshold", 0.7)

    # ---- USER FEATURES ----
    BMI = weight / (height ** 2)
    condition_encoded = condition_encoder.transform([condition])[0]

    # ---- FILTER FOODS ----
    subset = df[df["condition"] == condition].copy()

    if meal_type:
        subset = subset[subset["meal_type"] == meal_type]
    if diet_pref:
        subset = subset[subset["diet_preference"] == diet_pref]

    # ---- INJECT USER CONTEXT ----
    subset["age"] = age
    subset["gender"] = gender
    subset["BMI"] = BMI
    subset["condition_encoded"] = condition_encoded

    # ---- ML PREDICTION ----
    X = subset[FEATURE_COLS]
    subset["score"] = model.predict_proba(X)[:, 1]

    # ---- CONTROL OUTPUT ----
    subset = subset[subset["score"] >= threshold]
    subset = subset.sort_values("score", ascending=False).head(top_k)

    return jsonify(
        subset[
            ["Dish Name", "score", "Calories (kcal)", "Protein (g)", "Sodium (mg)"]
        ].to_dict(orient="records")
    )

if __name__ == "__main__":
    app.run(port=5001)
