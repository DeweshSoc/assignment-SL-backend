import { Request, Response, NextFunction } from "express";
import { validateProjectTitle } from "../utils";
import { User } from "../models/user.model";

export const updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, username } = req.body;

        if (!username) {
            return res.status(422).json({
                message: "Missing Parameters",
            });
        }

        if (!validateProjectTitle(username)) {
            return res.status(400).json({ message: "Invalid User Name" });
        }

        await User.findByIdAndUpdate(
            { _id: user._id },
            {
                username,
            }
        );
        return res.status(200).json({
            data: {
                username,
            },
            message: "Username updated successfully",
        });
    } catch (err) {
        next(err);
    }
};
