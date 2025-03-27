import express from "express";
import { body } from "express-validator"
import { login, logout, profile, register } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";



//! Register route
const router = express.Router();
router.post("/register", [body('email').isEmail().withMessage("Please provide a valid email"), body('fullName.firstName').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"), body('fullName.lastName').isLength({ min: 3 }).withMessage("Last Name must be at least 3 characters long"), body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")], register)


//! Login route
router.post("/login", body('email').isEmail().withMessage("Please provide a valid email"), 
     body('password').isLength({min:8}).withMessage("Password must be at least 8 characters long"), login);






//! Profile route
router.get("/profile", protect, profile);




//! Logout route
router.get("/logout", protect, logout);
export default router;
