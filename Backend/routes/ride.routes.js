import express from "express";
import { createRide } from "../controllers/ride.controller.js";
import { body } from "express-validator";
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/create",
    protect,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("invalid destination"),
    body("vehicleType").isString().isIn(['auto', 'car', 'bike']).withMessage("Invalid vehicle type")
   , createRide);

export default router