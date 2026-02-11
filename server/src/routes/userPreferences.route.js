import { Router } from "express";
import {
    upsertUserPreferences,
    getCurrentPreferences,
} from "../controllers/userPreferences.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router({
    caseSensitive: true,
    strict: true,
});

//  Secured routes
router.route("/registerUserPreferences").put(verifyJWT, upsertUserPreferences);
router.route("/getCurrentPreferences").get(verifyJWT, getCurrentPreferences);

export default router;
