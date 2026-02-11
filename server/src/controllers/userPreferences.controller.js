import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UserPreferences } from "../models/userPreferences.model.js";

const registerUserPreferences = asyncHandler(async (req, res) => {
    const { conditions, mealType, foodGroup, dietPreference } = req.body;

    if (!conditions || !Array.isArray(conditions) || conditions.length === 0) {
    throw new ApiError(400, "At least one condition is required");
    }

    if (
        [mealType, foodGroup, dietPreference].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    if(req.user._id)
        throw new ApiError(400, "User reference is required for registering user preferences");

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

  if(!savedPreferences)
    throw new ApiError(500, "Unable to register user preferences")

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .json(
            new ApiResponse(201, savedPreferences, "UserLogin Registered Successfully")
        );
});

export{
    registerUserPreferences
}