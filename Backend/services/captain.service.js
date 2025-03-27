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