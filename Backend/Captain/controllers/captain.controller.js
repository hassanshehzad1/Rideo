import { ExpressValidator, validationResult } from "express-validator";
import CaptainModel from "../models/caption.model.js";
import { createCaptain, getCaptainInRadiusService, loginCaptain, updateCaptainSocketService } from "../services/captain.service.js";
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
        console.log("Captain registered is called")
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
        return res.status(200).json({ success: true, message: "Captain registered in successfully", captain, token });


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
        // console.log("Cpatain ", req.captain, "User", req.user);
        const captain = await CaptainModel.findById(req.captain._id).select("-password");
        if (!captain) return res.status(404).json({ success: false, message: "Captain not found" });
        return res.status(200).json({ success: true, message: "Captain profile", captain });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: err.message });
    }
}

export const captainInRadius = async (req, res) => {

    console.log("Method called captain in radius")
    const { lat, lng, radius } = req.query;

    try {
        const captains = await getCaptainInRadiusService(lat, lng, radius);
        res.json(captains);
    } catch (err) {
        res.status(500).json({
            message: err?.message || "Internal server error",
        })
    }
}


// !Update captain socket
export const updateCaptainSocket = async (req, res) => {
    console.log("Update Captain socket")
    const errors = validationResult(req);

    if (!errors) {
        return res.status(400).json({
            message: "Error",
            error: errors.array()
        })
    }
    try {

        const { socketId, userId } = req.body;
        const result = await updateCaptainSocketService(userId, socketId);
        return res.status(200).json(result)
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err || "Invalid "
        })
    }
}


// Update captain location
export const updateLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: "Validation error", errors: errors.array() });
    }
    try {
        const { captainId } = req.params;
        const { location } = req.body;
        const captain = await CaptainModel.findById(captainId);
        if (!captain) {
            return res.status(404).json({ success: false, message: "Captain not found" });
        }
        await CaptainModel.updateOne({ _id: captainId }, { $set: { location } });
        return res.status(200).json({ success: true, message: `Location updated for captain ${captainId}` });
    } catch (err) {
        console.error("Error updating location:", err.message);
        return res.status(500).json({ success: false, message: "Failed to update location" });
    }
};