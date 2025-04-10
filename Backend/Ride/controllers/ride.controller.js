import { validationResult } from "express-validator";
import { confirmRideService, createRideService, endRideService, getFare, getRideService, startRideService } from "../services/ride.service.js";
import { publishToQueue } from "../services/rabbit.js";
import axios from "axios";
export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Input errors", errors: errors.array() });
    }
    try {

        const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.token;
        console.log(token);
        const { pickup, destination, vehicleType } = req.body;
        const ride = await createRideService({ user: req.user._id, pickup, destination, vehicleType, token });
        res.status(201).json(ride);
        console.log(ride);

        // Queue mein message daal do
        const queueData = JSON.stringify({
            rideId: ride._id,
            pickup,
            destination,
            vehicleType,
            userId: req.user._id,
            token
        });
        console.log("Queue", queueData)
        await publishToQueue("newRideRequest", queueData);
    } catch (err) {
        console.error("Error in createRide:", err.message);
        return res.status(400).json({ message: "Something went wrong", error: err.message || "Unknown error" });
    }
};


//! Get Fare
export const getFareCont = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            message: "Errors",
            errors: errors.array()
        })
    }
    console.log("Get fare called")
    try {

        const { pickup, destination } = req.query;
        if (!pickup || !destination) {
            return res?.status(404).json({
                message: "All fields are required"
            })
        }
        const token = req.headers?.authorization?.split(" ")[1] || req.cookies?.token;
        console.log(token)
        const result = await getFare(pickup, destination, token);
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
    console.log("Ride confirm called");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            message: "Errors",
            errors: errors.array()
        })
    }
    try {
        const { rideId, user } = req.body;
        console.log("Captain", req.captain)
        console.log("User", user);
        const result = await confirmRideService(rideId, req.captain);
        console.log("Result ", result)
        const ride = { ...result.toObject(), user, captain: req.captain };
        console.log("ride confirmed", ride);
        res.status(200).json(ride);
        // Send message to user

        // Add message in queue for user

        const queueData = JSON.stringify(ride);

        await publishToQueue("rideConfirmed", queueData);
        // sendMessageToClient(result.user.socketId, {
        //     event: "rideConfirmed",
        //     ride
        // })

    } catch (err) {
        console.error(err?.message);
        return res?.status(401).json({
            error: err?.message
        })
    }
}



// !Start Ride
export const startRide = async (req, res) => {
    console.log("startRide")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            message: "Errors",
            errors: errors.array()
        })
    }

    try {
 
        const { ride, otp } = req.body

        console.log("Ride data", ride, otp)
        const rideId = ride._id;
        const { captain, user } = ride;
        console.log("Ride details ", rideId, otp, captain, user)

        const result = await startRideService(rideId, otp);


        const queueData = { ...result.toObject(), user, captain };
        await publishToQueue("rideStarted", JSON.stringify(queueData));

        return res.status(200).json(queueData)
    } catch (err) {
        console.error(err?.message);
        return res?.status(401).json({
            error: err?.message
        })
    }

}


//! End Ride
export const endRide = async (req, res) => {
    try {
        console.log("Ride ended called");
        const { ride } = req.body;
        const rideId = ride._id;
        const {user, captain} = ride;
        const result = await endRideService(rideId);
            
        const queueData  =  {...result.toObject(), user, captain };
        await publishToQueue("rideEnd", JSON.stringify(queueData))
        return res.status(200).json(queueData)

    } catch (err) {
        console.error(err?.message);
        return res?.status(401).json({
            error: err?.message
        })
    }

}

// !Get ride
export const getRide = async (req, res) => {

    console.log("Get ride called")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Errors", errors: errors.array() });
    }
    // Catch block

    try {
        const { rideId } = req.params;
        const result = await getRideService(rideId);
        console.log(result)
        return res.status(200).json(result)

    } catch (err) {
        console.error(err?.message);
        return res.status(400).json({ error: err?.message });
    }

}