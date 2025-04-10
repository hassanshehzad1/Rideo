import { validationResult } from "express-validator";
import { createUser, loginUser, updateSocketIdService } from "../services/user.service.js";
import blackListToken from "../models/blacklist.model.js";
export const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array()
    })

    try {
        const { fullName, email, password } = req.body;

        const { user, token } = await createUser({
            firstName: fullName.firstName, lastName: fullName.lastName, email, password
        })


        // Setting cookies
        res.cookie = ("token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "development",
            sameSize: "Strict",
            maxAge: 24 * 60 * 60 * 1000, // 20 hours
            path: "/"
        })
        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user,
            token
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })

    }
}


// !Login user
export const login = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: errors.array()
    })

    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser({ email, password });





        // Setting cookies
        res.cookie("token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "development",
            sameSize: "Strict",
            maxAge: 24 * 60 * 60 * 1000, // 20 hours
            path: "/"
        })
        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            user,
            token,
        })
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }
}


//! Profile controller

export const profile = async (req, res, next) => {
    return res.status(200).json({
        success: true,
        message: "User profile",
        user: req.user
    })
}


//! Logout controller
export const logout = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    await blackListToken.create({ token });
    return res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
}


// ! Update user socket id
export const updateUserSocketId = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({
            message: "Error in input",
            error: errors.array()
        })


    try {
        const { socketId, userId } = req.body;

        const result = await updateSocketIdService(userId, socketId);
        return res.status(200).json(result)
    } catch (err) {
        return res.status(404).json({
            message: "Something went wrong",
            err

        })
    }

}