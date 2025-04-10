import { subscribe } from "./rabbit.js";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    transports: ["websocket"],
});

socket.on("connect", () => {
    console.log("Captain Service connected to socket server on port 3000");
});

socket.on("disconnect", (reason) => {
    console.log("Captain Service disconnected from socket server. Reason:", reason);
});

socket.on("reconnect_attempt", (attempt) => {
    console.log("Attempting to reconnect: attempt", attempt);
});

socket.on("reconnect", (attempt) => {
    console.log("Reconnected to socket server after", attempt, "attempts");
});

socket.on("reconnect_error", (error) => {
    console.error("Reconnection error:", error.message);
});

socket.on("error", (error) => {
    console.error("Socket error:", error.message);
});

subscribe("newRideRequest", async (message) => {
    const { rideId, pickup,  token } = JSON.parse(message);
    console.log("New ride request received:", message);
    try {
        const pickupCoordinates = await axios.get("http://localhost:3004/get-coordinate", {
            params: { address: pickup },
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data);
        console.log("Pickup coordinates:", pickupCoordinates);
        const { lat, lng } = pickupCoordinates.data;
        const captains = await axios.get("http://localhost:3002/in-radius", {
            params: { lat, lng, radius: 5 },
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data);
        console.log("Captains in radius:", captains);

        // User Service se user data lo
        const userResponse = await axios.get(`http://localhost:3001/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const user = userResponse.data.user;
        console.log("User data:", user);
        const rideResponse = await axios.get(`http://localhost:3003/get-ride/${rideId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const ride = rideResponse.data;
        console.log("Ride data:", ride);
        captains.forEach((captain) => {
            console.log("Notifying captain:", captain._id, "Socket ID:", captain.socketId);
            socket.emit("sendMessage", {
                socketId: captain.socketId,
                messageObj: {
                    event: "newRideRequest",
                    ride: { ...ride, user },
                }
            });
            console.log("Notification sent to captain:", captain._id);
        });
    } catch (err) {
        console.error("Error processing newRideRequest:", err.message);
    }
});