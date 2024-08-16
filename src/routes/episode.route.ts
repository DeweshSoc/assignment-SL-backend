import express from "express";
import { createEpisodeController,getAllEpisodesController } from "../controllers";

const router = express.Router();


// episode routes
router.post("/create",createEpisodeController);
router.post("/all",getAllEpisodesController);

export const episodeRoute = router;
