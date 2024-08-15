import express from "express";
import { authLoginController, authSignupController, logoutController } from "../controllers";

const router = express.Router();


router.post("/login",authLoginController)
router.post("/signup",authSignupController)
router.get("/logout",logoutController)

export const authRoute = router;
