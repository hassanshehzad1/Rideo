import { validationResult } from "express-validator";
import { createUser, loginUser } from "../services/user.service.js";

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