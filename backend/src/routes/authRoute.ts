import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import VerifyToken from "../Middleware/VerifyToken";
import { ObjectId } from "mongoose";

const router = express.Router();

router.post(
    "/signin",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password with 6 or more characters required").isLength({
            min: 6,
        }),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: "1d",
                }
            );

            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000,
            });
            res.status(200).json({ userId: user._id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

router.get('/validate-token', VerifyToken,(req:Request & {userId?:ObjectId},res:Response) =>{
    res.status(200).json({
        message: "Valid User.",
        userId: req.userId
    })
})

router.get('/getusers', VerifyToken, async (req:Request,res:Response) =>{
    try{
        const users = await User.find({})
        if(!users || users.length === 0){
            return res.status(400).json({
                message: "Currently there are no records!"
            })
        }

        return res.status(200).json({
            message: "Find the all records!",
            data: users
        })
    }catch(error){
        return res.status(500).json({
            message: error
        })
    }
})

router.post('/signout', (req:Request,res:Response) => {
    res.cookie('auth_token',"",{
        expires: new Date(0)
    })
    res.status(200).json({
        message: "User is logged Out successfully!"
    })
}) 

export default router;