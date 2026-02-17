import React, { useState, useMemo } from "react";
import Select from "react-select";
import { dietTypeOptions } from "../utils/options/dietType_options";
import { activityLevelOptions } from "../utils/options/activityLevel_options";
import { healthConditionOptions } from "../utils/options/healthCondition_options";
import { genderOptions } from "../utils/options/gender_options";

const UserPreferencesCollector = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const [diet, setDiet] = useState(false);
    const [activityLevel, setActivityLevel] = useState("");
    const [conditions, setConditions] = useState([]);
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [bodyFatPercentage, setBodyFatPercentage] = useState("");
    const [calorieTarget, setCalorieTarget] = useState("");
    const [proteinTarget, setProteinTarget] = useState("");

    const bmi = useMemo(() => {
        if (!height || !weight) return 0;

        const value = weight / (height / 100) ** 2;
        return Number(value.toFixed(1));
    }, [height, weight]);

    const bmr = useMemo(() => {
        if (!weight || !height || !age || !gender) return 0;

        if (gender === "male") {
            return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
        }

        return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    }, [weight, height, age, gender]);

    const tdee = useMemo(() => {
        if (!bmr || !activityLevel) return 0;

        const multipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            very_active: 1.9,
        };
        console.log(activityLevel)
        console.log(multipliers[activityLevel.value])
        return Math.round(bmr * multipliers[activityLevel.value]);
    }, [bmr, activityLevel]);

// BMI	Category
// < 18.5	Underweight
// 18.5 – 24.9	Normal
// 25 – 29.9	Overweight
// 30 – 34.9	Obese Class I
// 35 – 39.9	Obese Class II
// ≥ 40	Obese Class III

// Women
// Category	BMR
// Low	< 1200
// Normal	1200 – 1600
// High	> 1600
// Men
// Category	BMR
// Low	< 1400
// Normal	1400 – 1900
// High	> 1900

// Very high BMR often = muscular / large body mass.

// By Calorie Level
// TDEE	Meaning
// < 1500	Very low expenditure
// 1500 – 2200	Light/moderate
// 2200 – 3000	Active
// 3000 – 4000	Highly active
// > 4000	Athlete-level
    return (
        <section className="flex">
            <div className="flex-2 border">
                <div>BMI:(12-50)     {bmi}</div>
                <div>BMR: (800-4000) {bmr}</div>
                <div>TDEE: (1200-5000){tdee}</div>
            </div>
            <div className="flex flex-4 flex-col items-center border">
                <div className="flex w-full flex-wrap place-content-evenly">
                    <Select
                        placeholder="Diet Preferences*"
                        value={diet}
                        onChange={(selected) => setDiet(selected)}
                        className="w-[250px]"
                        options={dietTypeOptions}
                    />
                    <Select
                        placeholder="Activity Level*"
                        value={activityLevel}
                        onChange={(selected) => setActivityLevel(selected)}
                        className="w-[250px]"
                        options={activityLevelOptions}
                    />

                    <Select
                        placeholder="Conditions*"
                        isOptionDisabled={() => conditions.length >= 3}
                        isMulti
                        value={conditions}
                        onChange={(selected) => {
                            if (!selected || selected.length <= 3) {
                                setConditions(selected);
                            }
                        }}
                        className="w-[250px]"
                        options={healthConditionOptions}
                    />
                    <Select
                        placeholder="Gender*"
                        value={gender}
                        onChange={(selected) => setGender(selected)}
                        className="w-[250px]"
                        options={genderOptions}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="poppins-semibold hover:border-bg-green-700 cursor-pointer rounded-xl border-4 bg-green-700 px-4 py-2 text-white hover:bg-white hover:text-green-700"
                >
                    Submit
                </button>
            </div>
            <div className="flex-3 border">
                <div className="flex w-full flex-wrap place-content-evenly">
                    <input
                        type="number"
                        step="0.1"
                        min="54.6"
                        max="243.84"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-[210px] rounded-md border border-gray-300 px-3 py-2 text-center"
                        placeholder="Height (in cm)*"
                    />
                    <input
                        type="number"
                        step="0.1"
                        min="15"
                        max="300"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-[210px] rounded-md border border-gray-300 px-3 py-2 text-center"
                        placeholder="Weight (in kg)*"
                    />
                    <input
                        type="number"
                        min="10"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-[210px] rounded-md border border-gray-300 px-3 py-2 text-center"
                        placeholder="Age (10-100)*"
                    />
                    <input
                        type="number"
                        step="0.1"
                        min="3"
                        max="50"
                        value={bodyFatPercentage}
                        onChange={(e) => setBodyFatPercentage(e.target.value)}
                        className="w-[210px] rounded-md border border-gray-300 px-3 py-2 text-center"
                        placeholder="Body Fat Percentage"
                    />
                    <input
                        type="number"
                        step="0.1"
                        min="800"
                        max="6000"
                        value={calorieTarget}
                        onChange={(e) => setCalorieTarget(e.target.value)}
                        className="w-[210px] rounded-md border border-gray-300 px-3 py-2 text-center"
                        placeholder="Calorie Target (in kcal)"
                    />
                    <input
                        type="number"
                        step="0.1"
                        min="30"
                        max="350"
                        value={proteinTarget}
                        onChange={(e) => setProteinTarget(e.target.value)}
                        className="w-[210px] rounded-md border border-gray-300 px-3 py-2 text-center"
                        placeholder="Protein Target (in gm)"
                    />
                </div>
            </div>
        </section>
    );
};

export default UserPreferencesCollector;
