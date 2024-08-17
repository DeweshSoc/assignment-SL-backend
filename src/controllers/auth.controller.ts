import { Request, Response, NextFunction } from "express";
import isEmail from "validator/lib/isEmail";
import jwt from "jsonwebtoken";

import { User, Auth } from "../models";
import moment from "moment";

export const authSignupController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        if (!isEmail(email)) {
            return res.json(422).json({
                message: "Invalid Email",
            });
        }

        const newUser = new User({
            email,
            password,
            projects: [],
        });
        await newUser.save();
        res.status(200).json({
            message: "User created successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const authLoginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;
        //console.log(email,password);

        if (!email || !isEmail(email)) {
            return res.status(422).json({
                message: "Invalid Email",
            });
        }

        if (!password) {
            return res.status(422).json({
                message: "Invalid Password",
            });
        }

        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isMatch = await user.comparePasswords(password);
        //console.log(isMatch);
        if (!isMatch) {
            return res.status(403).json({
                message: "Invalid Password",
            });
        }

        const duplicate = await Auth.findOne({ user: user._id });
        if (duplicate) {
            if (moment(duplicate.expireAt).isAfter(moment(Date.now()))) {
                return res.status(200).json({
                    data: {
                        token: duplicate.token,
                        username: user.username,
                        email: user.email,
                        hasProject: user.projects.length > 0,
                    },
                    message: "Already logged in",
                });
            } else {
                return res.status(400).json({
                    message: "Duplicate seesion, Please try after some time.",
                });
            }
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "2 days",
            }
        );

        const newAuth = new Auth({
            user: user._id,
            token,
            expireAt: new Date(moment().add(2, "days").toString()),
        });

        await newAuth.save();

        res.status(200).json({
            data: {
                token,
                username: user.username,
                email: user.email,
                hasProject: user.projects.length > 0,
            },
            message: "Login Successful",
        });
    } catch (err) {
        next(err);
    }
};

export const logoutController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.headers.authorization) {
        return res
            .status(422)
            .json({ message: "Missing authentication credentials" });
    }
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(422).json({ message: "Missing Token" });
    }

    try {
        const payload: any = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        const auth = await Auth.findOne(
            { user: payload.userId },
            { expires: 1 }
        );
        if (!auth) {
            return res.status(200).json({
                message: "Logged Out",
            });
        }

        auth.expireAt = new Date();

        await auth.save();

        return res.status(200).json({
            message: "Logged Out",
        });
    } catch (err) {
        next(err);
    }
};
