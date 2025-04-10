import express from "express";
import { confirmRide, createRide, endRide, getFareCont, getRide, startRide } from "../controllers/ride.controller.js";
import { body, query, param } from "express-validator";
import { captainProtect, protect } from "../middleware/auth.middleware.js";


const router = express.Router();

// ! Create
router.post("/create",
    protect,
    body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
    body("destination").isString().isLength({ min: 3 }).withMessage("invalid destination"),
    body("vehicleType").isString().isIn(['auto', 'car', 'bike']).withMessage("Invalid vehicle type")
    , createRide);



//! Get fare
router.get("/get-fare",
    protect,
    query("pickup").isString().isLength({ min: 3 }).withMessage("Pickup location is required"),
    query("destination").isString().isLength({ min: 3 }).withMessage("destination location is required"),
    getFareCont
)


// ! Confirm
router.post("/confirm-ride", 
    captainProtect,
    body("rideId").isMongoId().withMessage("Ride ID is required"),
    confirmRide

)

// !Start Ride
router.put("/start-ride",  
    captainProtect,
    body("otp").isString().isLength({ min: 6, max:6 }).withMessage("OTP is required"),
    startRide
)


// !End ride
router.put("/end-ride",
    captainProtect,
    endRide
)



// !Get ride
router.get("/get-ride/:rideId", protect, param("rideId").isMongoId().withMessage("Ride ID is required"), getRide);
export default router