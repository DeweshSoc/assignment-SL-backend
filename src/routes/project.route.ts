import express from "express";
import { createProjectController } from "../controllers";

const router = express.Router();

router.post("/create",createProjectController);

export const projectRoute = router;
