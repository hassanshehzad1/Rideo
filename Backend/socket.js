import { Server } from "socket.io";
import axios from "axios";

let io;
const captainSockets = {};
const userSockets = {}; // User socket IDs store karne ke liye
const chatRooms = {}; // Chat rooms store karne ke liye

const retryOperation = async (operation, retries = 3, delay = 5000) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await operation();
            return;
        } catch (err) {
            console.error(`Retry attempt ${attempt} failed:`, err.message);
            if (attempt === retries) {
                console.error("Max retries reached. Operation failed.");
                throw err;
            }
            await new Promise((resolve) => setTimeout(resolve, delay * attempt));
        }
    }
};

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "*", methods: ["GET", "POST"] },
        pingTimeout: 60000,
        pingInterval: 25000,
        transports: ["websocket"],
    });

    io.on("connection", (socket) => {
        console.log("Client Connect " + socket.id);

        socket.on("join", async (data) => {
            if (!socket.connected) {
                console.log("Socket disconnected, skipping join operation");
                return;
            }
            const { userId, userType, token } = data;
            console.log(`UserId: ${userId} and Type: ${userType}, Socket ID: ${socket.id} token: ${token}`);
            try {
                if (userType === "user") {
                    await retryOperation(async () => {
                        const response = await axios.put(
                            `http://localhost:3001/update-socket-id`,
                            { socketId: socket.id, userId },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        if (!response.data.success) throw new Error(response.data.message);
                    });
                    userSockets[userId] = socket.id;
                    console.log(`Socket ID updated for user ${userId} to ${socket.id}`);
                } else if (userType === "captain") {
                    await retryOperation(async () => {
                        const response = await axios.put(
                            `http://localhost:3002/update-socket-id`,
                            { socketId: socket.id, userId },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        if (!response.data.success) throw new Error(response.data.message);
                    });
                    captainSockets[userId] = socket.id;
                    console.log(`Socket ID updated for captain ${userId} to ${socket.id}`);
                }
            } catch (err) {
                console.error("Error in join event:", err.message);
                socket.emit("error", { message: "Failed to join" });
            }
        });

        socket.on("joinChat", ({ rideId, userId, userType }) => {
            if (!chatRooms[rideId]) {
                chatRooms[rideId] = [];
            }
            // console.log("Cahta room before", chatRooms[rideId])
            // console.log("Cahta room before", chatRooms)
            chatRooms[rideId].push({ userId, userType, socketId: socket.id });
            // console.log("Cahta room after", chatRooms[rideId])
            // console.log("Cahta room after", chatRooms)
            console.log(`User ${userId} (${userType}) joined chat room for ride ${rideId}`);
        });

        socket.on("sendChatMessage", (messageData) => {
            const { rideId, senderId, senderType, message, timestamp } = messageData;
            const room = chatRooms[rideId] || [];
            room.forEach((participant) => {
                if (participant.userId !== senderId) {
                    io.to(participant.socketId).emit("chatMessage", {
                        senderId,
                        senderType,
                        message,
                        timestamp,
                    });
                }
            });
            console.log(`Chat message sent in room ${rideId}:`, messageData);
        });

        socket.on("updateLocation", async (data) => {
            const { userId, location, token } = data;
            if (!location || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
                return socket.emit("error", { message: "Invalid location format" });
            }
            try {
                await retryOperation(async () => {
                    const response = await axios.put(
                        `http://localhost:3002/update-location/${userId}`,
                        { location },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (!response.data.success) throw new Error(response.data.message);
                });
                console.log(`Location updated for captain ${userId}`);
            } catch (err) {
                console.error("Error in updateLocation event:", err.message);
                socket.emit("error", { message: "Failed to update location" });
            }
        });

        socket.on("sendMessage", ({ socketId, messageObj }) => {
            console.log("Received sendMessage event:", socketId, messageObj);
            io.to(socketId).emit(messageObj.event, messageObj.ride);
            console.log("Notification sent to socketId:", socketId);
        });

        socket.on("disconnect", (reason) => {
            console.log(`Client disconnected ${socket.id}. Reason: ${reason}`);
            for (const userId in captainSockets) {
                if (captainSockets[userId] === socket.id) {
                    delete captainSockets[userId];
                }
            }
            for (const userId in userSockets) {
                if (userSockets[userId] === socket.id) {
                    delete userSockets[userId];
                }
            }
            for (const rideId in chatRooms) {
                chatRooms[rideId] = chatRooms[rideId].filter((participant) => participant.socketId !== socket.id);
                if (chatRooms[rideId].length === 0) {
                    delete chatRooms[rideId];
                }
            }
        });

        socket.on("error", (error) => {
            console.error("Socket error on server:", error.message);
        });
    });
};

export const sendMessageToClient = (userId, messageObj) => {
    const socketId = captainSockets[userId] || userSockets[userId];
    if (socketId && io.sockets.sockets.get(socketId)) {
        io.to(socketId).emit(messageObj.event, messageObj.ride);
        console.log(`Notification sent to ${userId} via socket ID: ${socketId}`);
    } else {
        console.log(`${userId} not found in memory, relying on service to handle`);
    }
};