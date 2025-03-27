import express from "express";
import { body } from "express-validator"
import { register } from "../controllers/user.controller.js";

const router = express.Router();
router.post("/register", [body('email').isEmail().withMessage("Please provide a valid email"), body('fullName.firstName').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"), body('fullName.lastName').isLength({ min: 3 }).withMessage("Last Name must be at least 3 characters long"), body('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")], register)

export default router;
