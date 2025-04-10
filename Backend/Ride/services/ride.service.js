import axios from "axios";
import crypto from "crypto";
import RideModel from "../models/ride.model.js";

export const createRideService = async ({ user, pickup, destination, vehicleType, token }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }
    console.log(token);

    const fare = await getFare(pickup, destination, token);
    const ride = await RideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: getOtp(6)
    });
    return ride;
};

export async function getFare(pickup, destination, token) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }
    console.log("Sending token:", token);
    try {
        const response = await axios.get(`${process.env.MAP_SERVICE}/get-distance-time`, {
            params: { origin: pickup, destination },
            headers: { Authorization: `Bearer ${token}` }
        });
        const distanceTime = response.data;
        console.log("Distance Time:", distanceTime);

        // Distance aur duration extract karo
        const distance = distanceTime.data.distance.value; // meters mein
        const duration = distanceTime.data.duration.value; // seconds mein

        const baseFare = { auto: 30, car: 50, bike: 20 };
        const perKmRate = { auto: 10, car: 15, bike: 8 };
        const perMinuteRate = { auto: 2, car: 3, bike: 1.5 };

        const fare = {
            auto: Math.round(baseFare.auto + (distance / 1000) * perKmRate.auto + (duration / 60) * perMinuteRate.auto),
            car: Math.round(baseFare.car + (distance / 1000) * perKmRate.car + (duration / 60) * perMinuteRate.car),
            bike: Math.round(baseFare.bike + (distance / 1000) * perKmRate.bike + (duration / 60) * perMinuteRate.bike)
        };
        return fare;
    } catch (err) {
        console.error("Error in getFare:", err.response?.status, err.response?.data);
        throw err;
    }
}

function getOtp(num) {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}
export const confirmRideService = async (rideId, captainId) => {
    console.log("Confirm ride service called", rideId, captainId);
    if (!rideId || !captainId) {
        throw new Error("All fields are required");
    }
    const ride = await RideModel.findById(rideId).select("+otp");
    if (!ride) {
        throw new Error("Ride not found");
    }
    if (ride.status !== "pending") {
        throw new Error("Ride already confirmed or completed");
    }
    ride.captain = captainId;
    ride.status = "accepted";
    await ride.save();
    return ride;
};



// !Start Ride
export const startRideService = async (rideId, otp) => {

    if (!rideId || !otp) {
        throw new Error("Input is required")
    }


    const ride = await RideModel.findOne({ _id: rideId }).select("+otp");
    if (!ride) {
        throw new Error("Ride not found")
    }
    if (ride.status !== "accepted") {
        throw new Error("Ride not accepted yet")
    }
    if (ride.otp !== otp) {
        throw new Error("Invalid OTP")
    }

    await RideModel.findOneAndUpdate({ _id: rideId }, {
        status: "ongoing"
    })

    return ride;

}

// !End Ride
export const endRideService = async (rideId) => {
    if (!rideId) {
        throw new Error("Ride ID is required")
    }
    const ride = await RideModel.findById(rideId).select("+otp");
    if (!ride) {
        throw new Error("Ride not found")
    }
    if (ride.status !== "ongoing") {
        throw new Error("Ride not ongoing yet")
    }

    await RideModel.findOneAndUpdate({ _id: rideId }, {
        status: "completed"
    })

    return ride;
}


// ! Get ride services
export const getRideService = async (rideId) => {

    console.log("Get ride servuce called", rideId)
    if (!rideId) throw new Error("Ride ID is required");
    const ride = await RideModel.findById(rideId).select("+otp");
    console.log(ride);
    if (!ride) throw new Error("Ride not found");
    return ride;
};