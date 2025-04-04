// !Initialize socket
import { Server } from "socket.io"; // Named import
import CaptainModel from "./models/caption.model.js";
import UserModel from "./models/user.model.js"
let io;
export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["Get", "Post"]
        }
    }
    )


    io.on("connection", (socket) => {
        console.log("Client Connect " + socket.id)

        // Join to update the socketIds
        socket.on("join", async (data) => {
            const { userId, userType } = data;
            console.log(`UserId: ${userId} and Type:${userType}`)
            if (userType === "user") {
                await UserModel.findByIdAndUpdate(userId, { socketId: socket.id })
            } else if (userType === "captain") {
                await CaptainModel.findByIdAndUpdate(userId, { socketId: socket.id })

            }
        })

        // Update the ltd and lgt
        socket.on("updateLocation", async (data) => {
            const { userId, location } = data;
            if (!location || !location.coordinates) {
                return socket.emit("error", { message: "Invalid location" })
            }

            await CaptainModel.findByIdAndUpdate(userId, {
                location
            })
        })

        socket.on("disconnect", () => {
            console.log(`Client disconnected ${socket.id}`)
        })
    })



}


//! Send message to client
export const sendMessageToClient = (socketId, messageObj) => {
    if (io) {
        console.log("Message", socketId, messageObj)
        console.log("Emitted to", socketId);
        io.to(socketId).emit(messageObj.event, messageObj.ride)
    } else {
        console.log(`Socket.io is not initialize`)
    }

}