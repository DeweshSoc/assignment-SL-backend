import express from "express";
import { updateUserController } from "../controllers";

const router = express.Router();

// user routes
router.post("/update", updateUserController);

export const userRoute = router;
