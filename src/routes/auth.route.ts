import express from "express";
import { authLoginController, authSignupController } from "../controllers";

const router = express.Router();


router.post("/login",authLoginController)
router.post("/signup",authSignupController)

export const authRoute = router;
