import { getDistanceTimeService } from "./maps.service.js";
import crypto from "crypto";
import RideModel from "../models/ride.model.js";
export const createRideService = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required")
    }

    const fare = await getFare(pickup, destination);
   
    const ride = await RideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: getOtp(6)

    })
    return ride
}

// Function to calculate fare
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }


    const distanceTime = await getDistanceTimeService(pickup, destination);
  
    // Base fare   
    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    }
    //  Per km rate
    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8
    }
    // Per minute rate
    const perMinuteRate = {
        auto: 2,
        car: 3,
        bike: 1.5
    }

    // Fare rate
    const fare = {
        auto: baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + (distanceTime.duration.value / 60 * perMinuteRate.auto),
        car: baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + (distanceTime.duration.value / 60 * perMinuteRate.car),
        bike: baseFare.bike + ((distanceTime.distance.value / 1000) * perKmRate.bike) + (distanceTime.duration.value / 60 * perKmRate.bike)
    }
    return fare;

}


// Generating OTP
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp
    }
    return generateOtp(num)
}