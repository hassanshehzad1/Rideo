import { validationResult } from "express-validator";
import { createRideService } from "../services/ride.service.js";
export const createRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Input errors",
            errors: errors.array()
        })

    }
    try {
        const { pickup, destination, vehicleType } = req.body;
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType });
        return res.status(201).json(ride);
    } catch (err) {
        console.error("Error in createRide:", err.message); // Add err.message
        return res.status(400).json({
            message: "Something went wrong",
            error: err.message || "Unknown error" // Show error message
        });
    }
}