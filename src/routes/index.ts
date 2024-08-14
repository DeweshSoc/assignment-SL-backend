import { authRoute, episodeRoute, projectRoute, userRoute } from "./routes";

import express from "express";
const router = express.Router();



router.use("/auth", authRoute);
router.use("/episode", episodeRoute);
router.use("/project", projectRoute);
router.use("/user", userRoute);

export default router;

