// rideo-user-service/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import CaptainModel from "../models/caption.model.js";
import blackList from "../models/blacklist.model.js"; // Monolith se copy

// User protect middleware
//! Captain protect middleware
export const captainProtect = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

    } else if (req.cookies.token && req.cookies) {
        token = req.cookies.token;
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token founded" })
    }

    console.log("Token",token);
    // Check blacklist token
    const isBlackList = await blackList.findOne({ token });
    if (isBlackList) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        // Fetch user
        req.captain = await CaptainModel.findById(decoded._id).select("-password");
        if (!req.captain) return res.status(401).json({ message: "Not authorized, token not found" })
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message: "Not authorized, Token validation failed" })
    }






}


import axios from "axios";

export const protect = async (req, res, next) => {

    let token;

    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    console.log("Token in map",token);
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    console.log("User", process.env.USER_SERVICE)
    try {
        const resp = await axios.get(`${process.env.USER_SERVICE}/profile`, {

            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        req.user = resp.data.user;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
            err
        })
    }

}
