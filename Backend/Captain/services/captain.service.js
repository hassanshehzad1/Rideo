import CaptainModel from "../models/caption.model.js"

export const createCaptain = async ({ email, password, firstName, lastName, type, licensePlate, model, color }) => {

    if (!email, !password, !firstName, !lastName, !type, !licensePlate, !model, !color) {
        throw new Error("Please provide all the required fields")
    }

    // Check captain exits
    const captainExists = await CaptainModel.findOne({ email });
    if (captainExists) {
        throw new Error("Captain already registered with this email")
    }

    // Create new captain
    const captain = await CaptainModel.create({
        email, password, fullName: { firstName, lastName }, vehicle: { type, licensePlate, model, color }
    })


    return captain;


}



// !Login service
export const loginCaptain = async ({ email, password }) => {

    if (!email, !password) {
        throw new Error("Please provide all the required fields")
    }

    // Check captain exits
    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
        throw new Error("Invalid credentials, email and password is incorrect")
    }

    // Check password
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials, email and password is incorrect")

    }

    return captain;
}


export const getCaptainInRadiusService = async (lat, lng, radius) => {
    console.log("Captain service called radius", lat, lng, radius)
    const captains = await CaptainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371]
            }
        }
    });
    console.log("Captains", captains)
    return captains;
};

// !Update captain socket
export const updateCaptainSocketService = async (userId, socketId) => {
    if (!userId || !socketId) {
        throw new Error("User ID and socket ID are required");
    }

    const captain = await CaptainModel.findById(userId);
    if (!captain) {
        throw new Error("Invalid User ID");
    }

    // Captain ke document mein socketId update karo jiska _id userId hai
    await CaptainModel.updateOne({ _id: userId }, { $set: { socketId } });

    // Updated document return karna optional hai
    const updatedCaptain = await CaptainModel.findById(userId);
    console.log("Socket id",updatedCaptain)
    return updatedCaptain;
};