import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { Auth } from "../models";
import moment from "moment";

export async function authenticate(req:Request, res:Response, next:NextFunction){
    console.log(`INCOMING ===>  ${req.method} - ${req.path}`)
    if(!req.headers.authorization){
        console.log('No auth header')
        return res.status(403).json({message:"Missing authentication credentials"});
    }
    const token = req.headers.authorization.split(" ")[1];
    
    if(!token){
        console.log('No Token')
        return res.status(403).json({ message: "Missing authentication credentials" });
    }

    try{
        const payload:any = jwt.verify(token,process.env.JWT_SECRET as string);
        const auth = await Auth.findOne({user:payload.userId},{expireAt:1});
        if(!auth){
            console.log('No Auth record in db');
            return res.status(403).json({
                message:"Forbidden"
            })
        }
        const expireAt = auth?.expireAt;

        if(moment(expireAt).isBefore(moment(Date.now()))){
            console.log('token expired');
            return res.status(403).json({message:"Forbidden"});
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