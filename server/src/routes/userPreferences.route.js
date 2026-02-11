import { Router } from "express";
import {
    registerUserPreferences
} from "../controllers/userPreferences.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router({
    caseSensitive: true,
    strict: true,
});

//  Secured routes
router.route("/registerUserPreferences").get(verifyJWT, registerUserPreferences);


export default router; 
