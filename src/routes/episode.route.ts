import express from "express";
import {
    createEpisodeController,
    getAllEpisodesController,
    updateEpisodeController,
    getEpisodesByIdController
} from "../controllers";

const router = express.Router();


// episode routes
router.post("/create",createEpisodeController);
router.post("/update", updateEpisodeController);
router.post("/",getEpisodesByIdController);
router.post("/all",getAllEpisodesController);

export const episodeRoute = router;
