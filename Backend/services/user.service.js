import UserModel from "../models/user.model.js"
export const createUser = async ({ firstName, lastName, email, password }) => {

    const userExists = await UserModel.findOne({ email });
    if (userExists) throw new Error("User with this email is already registered");

    const user = await UserModel.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password
    })

    const token = await user.authenticateToken();
    return { user, token }


}

