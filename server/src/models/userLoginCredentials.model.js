import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLoginSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [6, "Name must be at least 6 characters long"],
            maxlength: [254, "Name cannot exceed 254 characters"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            minlength: [6, "Email must be at least 6 characters long"],
            maxlength: [254, "Email cannot exceed 254 characters"],
            trim: true,
            index: true,
            lowercase: true,
            unique: true,
            validate: [validator.isEmail, "Invalid Email Format"],
            set: (value) => validator.normalizeEmail(value),
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: [validator.isStrongPassword, "Invalid Password"],
        },
        avatarURL: {
            type: String,
            required: [true, "Avatar is required"],
            trim: true,
            validate: {
                validator: (value) => {
                    return validator.isURL(value, {
                        protocols: ["http", "https"],
                        require_protocol: true,
                    });
                },
                message: "Invalid avatar URL",
            },
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// userLoginSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10); // encrypt password with HS256 algo 10 rounds
//     next();
// });

// userLoginSchema.methods.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

userLoginSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userLoginSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

const UserLogin = mongoose.model("UserLogin", userLoginSchema);

export { UserLogin };
