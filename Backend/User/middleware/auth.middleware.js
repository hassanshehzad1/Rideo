// rideo-user-service/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js"; // Monolith se copy
import blackList from "../models/blacklist.model.js"; // Monolith se copy

// User protect middleware
export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token && req.cookies) {
        token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ message: "Not authorized, no token found" });

    const isBlacklisted = await blackList.findOne({ token });
    if (isBlacklisted) return res.status(401).json({ message: "Not authorized, token is blacklisted" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded._id).select("-password");
        if (!req.user) return res.status(401).json({ message: "Not authorized, user not found" });
        next();
    } catch (err) {
        console.error(`Token validation failed: ${err.message}`);
        return res.status(401).json({ message: "Not authorized, token validation failed" });
    }
};