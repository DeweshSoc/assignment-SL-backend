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

        if(!password){
            return res.status(422).json({
                message: "Invalid Password",
            });
        }

        const user = await User.findOne({
            email
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

        const duplicate = await Auth.findOne({user:user._id});
        if (duplicate && moment(duplicate.expires).isAfter(moment(Date.now()))) {
            return res.status(200).json({
                message:"Already logged in"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "2 days",
            }
        );

        const newAuth = new Auth({
            user: user._id,
            token,
            expires: new Date(moment().add(2,'days').toString())
        });

        await newAuth.save();

        res.status(200).json({
            data:{
                token
            },
            message: "Login Successful",
        });
    } catch (err) {
        next(err);
    }
};
