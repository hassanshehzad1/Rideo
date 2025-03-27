import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import blackList from "../models/blacklist.model.js";
import CaptainModel from "../models/caption.model.js";


// Protected route middleware
export const protect = async (req, res, next) => {

    let token;

    //   Check for token in authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token && req.cookies) {
        token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ message: "Not authorized, no token founded" })

    // Check the token is blacklist
    const isBlackedList = await blackList.findOne({ token });
    if (isBlackedList) return res.status(401).json({ message: "Not authorized, Token is blacklisted" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user
        req.user = await UserModel.findById(decoded._id).select("-password");
        if (!req.user) return res.status(401).json({
            message: "Not authorized, User not found"
        })

        next();
    } catch (err) {
        console.error(`Token validation failed, Not authorized`);
        return res.status(401).json({
            message: "Not authorized, Token validation failed"
        })

    }
}



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

    // Check blacklist token
    const isBlackList = await blackList.findOne({ token });
    if (isBlackList) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Fetch user
        req.user = await CaptainModel.findById(decoded._id).select("-password");
        if (!req.user) return res.status(401).json({ message: "Not authorized, token not found" })
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ message: "Not authorized, Token validation failed" })
    }






}