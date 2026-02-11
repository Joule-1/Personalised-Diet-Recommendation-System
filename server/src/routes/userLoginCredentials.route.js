import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
} from "../controllers/userLoginCredentials.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router({
    caseSensitive: true,
    strict: true,
});

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//  Secured routes
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/refresh-token").get(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

export default router; 
