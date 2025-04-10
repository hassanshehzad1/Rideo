// rideo-user-service/routes/user.routes.js
import express from "express";
import { body } from "express-validator";
import { login, logout, profile, register, updateUserSocketId } from "../controllers/user.controller.js"; // Monolith se copy
import { protect } from "../middleware/auth.middleware.js"; // Monolith se copy

const router = express.Router();

// Register route
router.post("/register", [
  body('email').isEmail().withMessage("Please provide a valid email"),
  body('fullName.firstName').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
  body('fullName.lastName').isLength({ min: 3 }).withMessage("Last Name must be at least 3 characters long"),
  body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
], register);

// Login route
router.post("/login",
  body('email').isEmail().withMessage("Please provide a valid email"),
  body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  login
);

// Profile route
router.get("/profile", protect, profile);

// Logout route
router.get("/logout", protect, logout);


// !Update socket id
router.put("/update-socket-id", protect, [body("socketId").isString().withMessage("Socket id is required"), body("userId").isMongoId().withMessage("User id is required")], updateUserSocketId);
export default router;