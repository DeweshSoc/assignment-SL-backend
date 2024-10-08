import type { NextFunction, Request, Response } from "express";
import { Project } from "../models";
import { validateProjectTitle } from "../utils";
import { randomColorGenerator } from "../utils";

export const getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user } = req.body;
        const projects = await Project.find({ user: user._id });
        return res.status(200).json({
            data: {
                projects,
                message: `Fetched ${projects.length} projects`,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const createProjectController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, projectTitle } = req.body;

        if (!validateProjectTitle(projectTitle)) {
            return res.status(400).json({ message: "Invalid project title" });
        }

        const duplicateProject = await Project.findOne({
            title: projectTitle,
            user: user._id,
        });
        if (duplicateProject) {
            return res.status(400).json({ message: "Duplicate Project" });
        }

        const newProj = new Project({
            user: user._id,
            title: projectTitle,
            episodes: [],
            colorHex: randomColorGenerator(),
        });

        const savedDoc = await newProj.save();
        return res.status(200).json({
            message: "Project created successfully",
            data: {
                hasProject: true,
                project: savedDoc,
            },
        });
    } catch (err) {
        next(err);
    }
};
