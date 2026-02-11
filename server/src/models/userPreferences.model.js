import mongoose, { Schema } from "mongoose";

const userPreferencesSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [
                true,
                "User reference is required for registering user preferences",
            ],
            unique: true,
        },
        conditions: {
            type: [String],
            enum: [
                "Obesity",
                "Diabetes",
                "Hypertension",
                "Hyperlipidemia",
                "Metabolic_Syndrome",
                "Lactose_Intolerance",
                "IBS",
                "Gluten_Sensitivity",
                "GERD",
                "PCOS",
                "Pregnancy",
                "Lactation",
                "Menopause",
                "Anemia",
                "Muscle_Gain",
                "Body_Recomposition",
                "Endurance",
                "Sarcopenia",
                "Gout",
                "NAFLD",
                "CKD_Early",
                "Osteoporosis",
                "Inflammation",
                "Vegan",
                "Keto",
                "Mediterranean",
                "Intermittent_Fasting",
            ],
            index: true,
            default: [],
            validate: {
                validator: function (value) {
                    return Array.isArray(value) && value.length > 0;
                },
            },
        },
        mealType: {
            type: String,
            enum: ["breakfast", "lunch", "dinner", "snack", "beverage"],
            required: [true, "Meal type is required"],
        },
        foodGroup: {
            type: String,
            enum: [
                "fruit",
                "cereal",
                "protein",
                "fat",
                "dairy",
                "vegetable",
                "beverage",
            ],
            required: [true, "Food group is required"],
        },
        dietPreference: {
            type: String,
            enum: ["veg", "egg", "non_veg"],
            required: [true, "Diet preference is required"],
        },
    },
    {
        timestamps: true,
    }
);

const UserPreferences = mongoose.model(
    "UserPreferences",
    userPreferencesSchema
);

export { UserPreferences };
