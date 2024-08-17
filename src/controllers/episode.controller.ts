import { Request, Response, NextFunction } from "express";
import { Episode } from "../models";
import { validateProjectTitle } from "../utils";

export const createEpisodeController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, episodeName, transcript, projectId } = req.body;

        if(!episodeName || !transcript || !projectId){
            return res.status(422).json({
                message:"Missing Parameters"
            })
        }

        if (!validateProjectTitle(episodeName)) {
            return res.status(400).json({ message: "Invalid Episode Name" });
        }

        const duplicateEpisode = await Episode.findOne({
            user: user._id,
            title: episodeName,
            project: projectId
        });

        if (duplicateEpisode) {
            return res.status(400).json({ message: "Duplicate Episode" });
        }


        const newEpi = new Episode({
            user: user._id,
            project:projectId,
            title: episodeName,
            transcript,
            status:"Done"
        });

        const savedDoc = await newEpi.save();
        return res.status(200).json({
            message: "Episode created successfully",
            data: {
                hasEpisode:true,
                episode: savedDoc,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const updateEpisodeController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, episode, projectId } = req.body;

        if (!episode || !projectId) {
            return res.status(422).json({
                message: "Missing Parameters",
            });
        }

        if (!validateProjectTitle(episode.title)) {
            return res.status(400).json({ message: "Invalid Episode Name" });
        }

        await Episode.findByIdAndUpdate({_id:episode._id, project:projectId},{
            title:episode.title,
            transcript:episode.transcript,
            status:episode.status
        })
        return res.status(200).json({
            message: "Episode updated successfully",
        });
    } catch (err) {
        next(err);
    }
};


export const getAllEpisodesController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user,projectId } = req.body;
        const episodes = await Episode.find({ user: user._id, project:projectId});
        return res.status(200).json({
            data: {
                episodes,
                message: `Fetched ${episodes.length} episodes`,
            },
        });
    } catch (err) {
        next(err);
    }
};



export const getEpisodesByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, projectId, episodeId } = req.body;
        const episode = await Episode.findOne({
            _id:episodeId,
            user: user._id,
            project: projectId,
        });
        return res.status(200).json({
            data: {
                episode,
                message: `Episode fetch successful`,
            },
        });
    } catch (err) {
        next(err);
    }
};
