import { validationResult } from "express-validator";
import CaptainModel from "../models/caption.model.js";
import { createCaptain, loginCaptain } from "../services/captain.service.js";
import blackList from "../models/blacklist.model.js";


export const register = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Registration failed", errors: errors.array() })
    }



    try {

        const { email, password, fullName, vehicle } = req.body;
        const { firstName, lastName } = fullName;
        const { type, licensePlate, model, color } = vehicle;
        const captain = await createCaptain({ email, password, firstName, lastName, type, licensePlate, model, color });

        // Authenticate captain
        const token = await captain.generateToken();

        // Setting cookies
        res.cookie("token", token, {
            httpOnly: false,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "development",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        return res.status(200).json({ success: true, message: "Captain logged in successfully", captain, token });


    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(400).json({ success: false, message: err.message });
    }

}


// !Login controller
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Login failed", errors: errors.array() })
    }


    try {
        const captain = await loginCaptain(req.body);

        const token = await captain.generateToken();
        res.cookie("token", token, {
            httpOnly: false,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "development",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        return res.status(200).json({ success: true, message: "Captain logged in successfully", captain, token });

    } catch (err) {
        console.error(err.message);
        return res.status(404).json({ success: false, message: err.message });
    }
}


//! Logout controller

export const logout = async (req, res) => {
    const token = req?.cookies?.token || req.headers?.authorization?.split(" ")[1];
    await blackList.create({ token });
    res.clearCookie("token");
    return res.status(200).json({
        success: true,
        message: "Logout successfully"
    })
}

// ! Profile controller
export const profile = async (req, res) => {
    try {
        const captain = await CaptainModel.findById(req.user._id).select("-password");
        if (!captain) return res.status(404).json({ success: false, message: "Captain not found" });
        return res.status(200).json({ success: true, message: "Captain profile", captain });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: err.message });
    }
}