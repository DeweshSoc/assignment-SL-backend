import express from "express";
import { createProjectController, getAllProjects } from "../controllers";

const router = express.Router();

router.post("/create", createProjectController);
router.get("", getAllProjects);

export const projectRoute = router;
