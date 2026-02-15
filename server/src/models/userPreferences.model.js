import mongoose, { Schema } from "mongoose";
import { HealthCondition } from "../dataMappings/health_conditions_mappings.js";

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
            type: Number,
            required: true,
            min: 10,
            max: 100,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },

        height: {
            type: Number, // cm
            required: true,
        },

        weight: {
            type: Number, // kg
            required: true,
        },

        bodyFatPercentage: {
            type: Number,
        },

        // Optional personalization overrides
        calorieTarget: {
            type: Number,
        },

        proteinTarget: {
            type: Number,
        },

        allergies: {
            type: [String],
            default: [],
        },

        // Optional: Store computed metrics (recommended)
        bmi: {
            type: Number,
        },

        bmr: {
            type: Number,
        },

        tdee: {
            type: Number,
        },
    },
    { timestamps: true }
);

const UserPreferences = mongoose.model(
    "UserPreferences",
    userPreferencesSchema
);

export { UserPreferences };
