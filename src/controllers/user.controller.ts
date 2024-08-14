import { Request, Response, NextFunction } from "express";
import isEmail from "validator/lib/isEmail";
import User from "../models/user.model";

export const createUserController = async (req: Request,res: Response,next: NextFunction) => {
    try{
        const {email, password} = req.body;

        if(!isEmail(email)){
            return res.send(422).send({
                message:"Invalid Email"
            })
        }

        const newUser = new User({
            email,
            password,
            projects:[]
        })
        await newUser.save();
        res.status(200).send({
            message:"User created successfully"
        })
    }catch(err){
        next(err);
    }
};
