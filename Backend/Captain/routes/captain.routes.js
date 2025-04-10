import express from "express";
import { body } from "express-validator";
import { captainInRadius, login, logout, profile, register, updateCaptainSocket, updateLocation } from "../controllers/captain.controller.js";
import { captainProtect, protect } from "../middleware/auth.middleware.js";
const router = express.Router();

// !Register
router.post("/register", [body('email').isEmail().withMessage("Please enter a valid email address"), body('password').isLength({ min: 8 }).withMessage("Password should be at least 8 characters long"), body('fullName.firstName').isLength({ min: 3 }).withMessage("First name should be at least 3 characters long"), body('fullName.lastName').isLength({ min: 3 }).withMessage("Last name should be at least 3 characters long"), body('vehicle.type').isIn(['car', 'bike', 'auto']).withMessage("Please enter a valid vehicle type"), body('vehicle.licensePlate').notEmpty().withMessage("Vehicle license number is required"), body('vehicle.model').notEmpty().withMessage("vehicle model is required"), body('vehicle.color').notEmpty().withMessage("Vehicle color is required"), body('vehicle.capacity').isLength({ min: 1 }).withMessage("Capacity should be at least 1 ")], register);


// !login route
router.post("/login", [body('email').isEmail().withMessage("Please enter a valid email address"), body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")], login);


// ! Logout  route 
router.get("/logout", captainProtect, logout);
router.get("/profile", captainProtect, profile);


// Get captain in radius
router.get("/in-radius", protect, captainInRadius);


// Update captain socketId
router.put("/update-socket-id", captainProtect, [body('socketId').isString().withMessage("Socket id is required"), body('userId').isMongoId().withMessage("User id is required")], updateCaptainSocket);


// Update captain location (New Route)
router.put(
    "/update-location/:captainId",
    captainProtect,
    [
        body("location.coordinates").isArray({ min: 2, max: 2 }).withMessage("Coordinates must be an array of 2 numbers"),
        body("location.coordinates.*").isFloat().withMessage("Coordinates must be valid numbers"),
    ],
    updateLocation
);
export default router;