import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User";
import { ObjectId } from "mongoose";
import 'dotenv/config';

interface AuthenticatedRequest extends Request {
    userId?: ObjectId;
}

const VerifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token'] || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

    if (!token) {
        return res.status(401).json({
            message: "Token Not Found"
        });
    }

    try {
        const userToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as validToken;

        const user = await User.findById(userToken.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found!"
            });
        }

        // Assign the userId to the custom property on the Request object
        req.userId = userToken.userId;

        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token!"
        });
    }
}

interface validToken {
    userId: ObjectId;
}

export default VerifyToken;
