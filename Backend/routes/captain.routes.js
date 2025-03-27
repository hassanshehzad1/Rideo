import express from "express";
import { body } from "express-validator";
import { login, logout, profile, register } from "../controllers/captain.controller.js";
import { captainProtect } from "../middleware/auth.middleware.js";
const router = express.Router();

// !Register
router.post("/register", [body('email').isEmail().withMessage("Please enter a valid email address"), body('password').isLength({ min: 8 }).withMessage("Password should be at least 8 characters long"), body('fullName.firstName').isLength({ min: 3 }).withMessage("First name should be at least 3 characters long"), body('fullName.lastName').isLength({ min: 3 }).withMessage("Last name should be at least 3 characters long"), body('vehicle.type').isIn(['car', 'bike', 'auto']).withMessage("Please enter a valid vehicle type"), body('vehicle.licensePlate').notEmpty().withMessage("Vehicle license number is required"), body('vehicle.model').notEmpty().withMessage("vehicle model is required"), body('vehicle.color').notEmpty().withMessage("Vehicle color is required"), body('vehicle.capacity').isLength({ min: 1 }).withMessage("Capacity should be at least 1 ")], register);


// !login route
router.post("/login", [body('email').isEmail().withMessage("Please enter a valid email address"), body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")], login);


// ! Logout  route 
router.get("/logout", captainProtect, logout);
router.get("/profile", captainProtect, profile);

export default router;