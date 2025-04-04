import { validationResult } from "express-validator";
import { confirmRideService, createRideService, endRideService, getFare, startRideService } from "../services/ride.service.js";
import { getAddressCoordinate, getCaptainInRadius } from "../services/maps.service.js";
import { sendMessageToClient } from "../socket.js";
// import CaptainModel from "../models/caption.model.js";
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

        res.status(201).json(ride);
        //  Update the pickup coordinates and get captain in radius
        const pickupCoordinates = await getAddressCoordinate(pickup);

        const captainInRadius = await getCaptainInRadius(pickupCoordinates.lat, pickupCoordinates.lng, 5);

        ride.otp = "";
        const userWithRide = await ride.populate("user", "-password -__v -createdAt -updatedAt -rides");
        captainInRadius.map((captain) => {
            // console.log("Catain,",captain);
            sendMessageToClient(captain.socketId, {
                event: "newRideRequest",
                ride: userWithRide,

            })
        })

    } catch (err) {
        console.error("Error in createRide:", err.message); // Add err.message
        return res.status(400).json({
            message: "Something went wrong",
            error: err.message || "Unknown error" // Show error message
        });
    }
}


//! Get Fare
export const getFareCont = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            message: "Errors",
            errors: errors.array()
        })
    }

    try {

        const { pickup, destination } = req.query;
        if (!pickup || !destination) {
            return res?.status(404).json({
                message: "All fields are required"
            })
        }
        const result = await getFare(pickup, destination);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err?.message);
        return res?.status(401).json({
            error: err?.message
        })
    }
}


// !Confirm ride
export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            message: "Errors",
            errors: errors.array()
        })
    }
    try {
        const { rideId } = req.body;
        const result = await confirmRideService(rideId, req.captain);
        res.status(200).json(result);
        console.log("Result", result);
        // Send message to user
        sendMessageToClient(result.user.socketId, {
            event: "rideConfirmed",
            ride: result
        })

    } catch (err) {
        console.error(err?.message);
        return res?.status(401).json({
            error: err?.message
        })
    }
}



// !Start Ride
export const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            message: "Errors",
            errors: errors.array()
        })
    }

    try {
        const { rideId, otp } = req.body;
        const result = await startRideService(rideId, otp);

        sendMessageToClient(result.user.socketId, {
            event: "rideStarted",
            ride: result
        })
        return res.status(200).json(result)

    } catch (err) {
        console.error(err?.message);
        return res?.status(401).json({
            error: err?.message
        })
    }

}


//~ End Ride
export const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            message: "Errors",
            errors: errors.array()
        })
    }

    try {
        const { rideId } = req.body;
        const result = await endRideService(rideId, req.captain);

        sendMessageToClient(result.user.socketId, {
            event: "rideEnd",
            ride: result
        })
        return res.status(200).json(result)

    } catch (err) {
        console.error(err?.message);
        return res?.status(401).json({
            error: err?.message
        })
    }

}