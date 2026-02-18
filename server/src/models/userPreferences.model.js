import mongoose, { Schema } from "mongoose";
import { HealthCondition } from "../dataMappings/health_conditions_mappings.js";

const numericRangeValidator = (min, max, allowDecimal = true) => ({
    validator: function (value) {
        if (value === undefined || value === null || value === "") return true;

        const regex = allowDecimal ? /^\d+(\.\d+)?$/ : /^\d+$/;
        if (!regex.test(value)) return false;

        const num = Number(value);
        return num >= min && num <= max;
    },
    message: (props) => `${props.path} must be between ${min} and ${max}`,
});

const userPreferencesSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        conditions: {
            type: [String],
            enum: Object.values(HealthCondition),
            default: [],
            index: true,
        },

        dietPreference: {
            type: String,
            enum: ["veg", "egg", "non_veg"],
            required: true,
        },

        activityLevel: {
            type: String,
            enum: ["sedentary", "light", "moderate", "active", "very_active"],
            required: true,
        },

        age: {
            type: String,
            required: true,
            validate: numericRangeValidator(10, 100),
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },

        height: {
            type: String,
            required: true,
            validate: numericRangeValidator(50, 300), // cm
        },

        weight: {
            type: String,
            required: true,
            validate: numericRangeValidator(20, 500), // kg
        },
        
        bodyFatPercentage: {
            type: String,
            validate: numericRangeValidator(1, 70), // %
        },

        calorieTarget: {
            type: String,
            validate: numericRangeValidator(800, 10000),
        },

        proteinTarget: {
            type: String,
            validate: numericRangeValidator(10, 400),
        },

        bmi: {
            type: String,
            validate: numericRangeValidator(12, 50),
        },

        bmr: {
            type: String,
            validate: numericRangeValidator(800, 4000),
        },

        tdee: {
            type: String,
            validate: numericRangeValidator(1200, 5000),
        },
    },
    { timestamps: true }
);

const UserPreferences = mongoose.model(
    "UserPreferences",
    userPreferencesSchema
);

export { UserPreferences };
