import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UserPreferences } from "../models/userPreferences.model.js";

const upsertUserPreferences = asyncHandler(async (req, res) => {
    const { conditions, mealType, foodGroup, dietPreference } = req.body;

    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized user");
    }

    if (!conditions || !Array.isArray(conditions) || conditions.length === 0) {
        throw new ApiError(400, "At least one condition is required");
    }

    if (
        [mealType, foodGroup, dietPreference].some(
            (field) => typeof field !== "string" || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const savedPreferences = await UserPreferences.findOneAndUpdate(
        { user: req.user._id },
        {
            conditions,
            mealType,
            foodGroup,
            dietPreference,
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );

    if (!savedPreferences) {
        throw new ApiError(500, "Unable to save user preferences");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                savedPreferences,
                "User Preferences Saved Successfully"
            )
        );
});

const getCurrentPreferences = asyncHandler(async (req, res) => {
    const currentPreferences = await UserPreferences.findOne({
        user: req.user._id,
    });

    if (!currentPreferences) {
        throw new ApiError(404, "Preferences not found");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                currentPreferences,
                "Current Preferences Fetched Successfully"
            )
        );
});

export { upsertUserPreferences, getCurrentPreferences };
