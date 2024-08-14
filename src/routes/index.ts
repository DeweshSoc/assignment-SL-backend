import { authenticate } from "../middlewares/auth.middleware";
import { authRoute, episodeRoute, projectRoute, userRoute } from "./routes";

import express from "express";
const router = express.Router();



router.use("/auth", authRoute);
router.use("/episode", authenticate ,episodeRoute);
router.use("/project", authenticate, projectRoute);
router.use("/user",authenticate ,userRoute);

export default router;

