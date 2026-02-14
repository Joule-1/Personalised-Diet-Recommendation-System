import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UserLogin } from "../models/userLoginCredentials.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await UserLogin.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generation refresh and access token"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, avatarURL } = req.body;

    if (
        [name, email, password, avatarURL].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await UserLogin.findOne({ email: email });

    if (existedUser)
        throw new ApiError(
            409,
            "UserLogin with email or username already exists"
        );

    const user = await UserLogin.create({
        name,
        email,
        password,
        avatarURL,
    });

    if (!user) throw new ApiError(500, "UserLogin is not being created");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const createdUser = await UserLogin.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser)
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                201,
                createdUser,
                "UserLogin Registered Successfully"
            )
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email)
        throw new ApiError(400, "Username or Email is required");

    const user = await UserLogin.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) throw new ApiError(400, "UserLogin doesn't exist");

    //const isPasswordValid = await user.isPasswordCorrect(password);

    // if (!isPasswordValid)
    //     throw new ApiError(401, "Invalid UserLogin Credentials");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await UserLogin.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!loggedInUser)
        throw new ApiError(
            500,
            "Something went wrong while logging in the user"
        );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                loggedInUser,
                "UserLogin logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    await UserLogin.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "UserLogin Logged Out"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Current UserLogin Fetched Successfully"
            )
        );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized Request");

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await UserLogin.findById(decodedToken?._id);

        if (!user) throw new ApiError(401, "Invalid Refresh Token");

        if (incomingRefreshToken !== user?.refreshToken)
            throw new ApiError(401, "Refresh Token is expired or used");

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, {}, "Access Token Refreshed"));
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await UserLogin.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) throw new ApiError(400, "Invalid Old Password");

    user.password = newPassword;

    try {
        await user.save();
    } catch (err) {
        if (err.name === "ValidationError") {
            const firstError = Object.values(err.errors)[0].message;
            throw new ApiError(400, firstError); // you’ll now get "Invalid password"
        }
        throw new ApiError(500, "Unexpected error while saving new password");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) throw new ApiError(400, "All fields are required");

    const user = await UserLogin.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                name,
                email,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Account Details Updated Successfully")
        );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

    const existingUser = await UserLogin.findById(req.user?._id);

    if (!existingUser) throw new ApiError(400, "UserLogin not found");

    if (existingUser.avatar) {
        try {
            const parts = existingUser.avatar.split("/");
            const filename = parts[parts.length - 1];
            const publicId = filename.split(".")[0];

            await cloudinary.uploader.destroy(publicId, {
                resource_type: "image",
            });
        } catch (error) {
            console.log(
                "Error while deleting old avatar from cloudinary ",
                error
            );

            throw new ApiError(
                400,
                "Error while deleting old avatar from cloudinary"
            );
        }
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.secure_url)
        throw new ApiError(400, "Error while uploading avatar");

    const user = await UserLogin.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.secure_url,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path;

    if (!coverImageLocalPath)
        throw new ApiError(400, "Cover image file is missing");

    const existingUser = await UserLogin.findById(req.user?._id);

    if (!existingUser) throw new ApiError(400, "UserLogin not found");

    if (existingUser.avatar) {
        try {
            const parts = existingUser.avatar.split("/");
            const filename = parts[parts.length - 1];
            const publicId = filename.split(".")[0];

            await cloudinary.uploader.destroy(publicId, {
                resource_type: "image",
            });
        } catch (error) {
            console.log(
                "Error while deleting old cover image from cloudinary ",
                error
            );

            throw new ApiError(
                400,
                "Error while deleting old cover image from cloudinary"
            );
        }
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!coverImage.secure_url)
        throw new ApiError(400, "Error while uploading cover image");

    const user = await UserLogin.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.secure_url,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Cover image updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username.trim()) throw new ApiError(400, "Username is missing");

    const channel = await UserLogin.aggregate([
        {
            $match: {
                username,
            },
        },
        {
            //  list of subscribers
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo",
            },
        },
        {
            $set: {
                subscribersCount: {
                    $size: "$subscribers",
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo",
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                name: true,
                username: true,
                email: true,
                avatar: true,
                coverImage: true,
                subscribersCount: true,
                channelsSubscribedToCount: true,
                isSubscribed: true,
            },
        },
    ]);

    if (!channel?.length) throw new ApiError(404, "Channel does not exist");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                channel[0],
                "UserLogin channel fetched successfully"
            )
        );
});

const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await UserLogin.aggregate([
        {
            $match: {
                _id: req.user._id,
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        name: true,
                                        username: true,
                                        avatar: true,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $set: {
                            owner: {
                                $first: "$owner",
                            },
                        },
                    },
                ],
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user[0].watchHistory,
                "Watch history fetched successfully"
            )
        );
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory,
};
