import express from "express";
import { createUserController } from "../controllers";

const router = express.Router();

// user routes
router.post("/create", createUserController);


export const userRoute = router;
