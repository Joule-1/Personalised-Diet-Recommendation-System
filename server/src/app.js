import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middlewares.js";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.static("public"));
app.use(cookieParser());
app.use(
    express.json({
        limit: "16kb",
        strict: true,
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);

import userLoginRouter from "./routes/userLoginCredentials.route.js";
import userPreferencesRouter from "./routes/userPreferences.route.js";

app.use("/api/v1/user", userLoginRouter);
app.use("/api/v1/userPreferences", userPreferencesRouter);

app.use(errorHandler);

export { app };
