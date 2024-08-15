import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { Auth } from "../models";
import moment from "moment";

export async function authenticate(req:Request, res:Response, next:NextFunction){
    if(!req.headers.authorization){
        return res.status(403).json({message:"Missing authentication credentials"});
    }
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(403).json({ message: "Missing authentication credentials" });
    }

    try{
        const payload:any = jwt.verify(token,process.env.JWT_SECRET as string);
        const auth = await Auth.findOne({user:payload.userId},{expires:1});
        if(!auth){
            return res.status(404).json({
                message:"User not found"
            })
        }
        const expiresAt = auth?.expires;

        if(moment(expiresAt).isBefore(moment(Date.now()))){
            return res.status(403).json({message:"Token expired"});
        }

        req.body.user = {
            _id: payload.userId,
            email: payload.email
        } 
        next();
    }catch(err){
        res.status(403).json({message:"Invalid Token"});
        next(err);
    }
}