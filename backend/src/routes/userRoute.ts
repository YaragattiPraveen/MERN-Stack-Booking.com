import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post('/signup', [
    check('firstName', "First name is required").isString(),
    check('lastName', "Last name is required").isString(),
    check('password', "Password is required and length of character should be 5.").isLength({ min: 5 }),
    check('email', "Email is required or not in correct format").isEmail()
], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: errors.array()
        })
    }
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({
                message: "User is already existing!"
            })
        }

        const newUser = new User(req.body)

        await newUser.save()

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '1d'
        })

        res.cookie('Auth_Token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000
        })

        res.status(201).json({
            message: "User account has been created!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Something went wrong!!"
        })
    }
});

export default router;
