import User from "../models/user.modal.js";
import bcryptjs from 'bcryptjs';//for encrypting password
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next) =>{
    const {username,email,password} =req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try{
        await newUser.save();
    res.status(201).json("user created sucessfully");
    } catch(error){
        next(error);
    }
    
}