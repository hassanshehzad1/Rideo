import { subscribe } from "./rabbit.js";
import axios from "axios";
import { io } from "socket.io-client";


const socket = io("http://localhost:3000", {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    transports: ["websocket"],
});

// Emit rideConfirmed event to clients
socket.on("connect", () => {
    console.log("Connected to WebSocket server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
});
// Subscribe to the "rideConfirmed" event
subscribe("rideConfirmed", async (message) => {
    try {
        const parsedMessage = JSON.parse(message);
        const queueData = parsedMessage;

        if (!queueData) {
            console.error("Ride data is missing in the message payload");
            return;
        }

        console.log("Ride data received:", queueData);
        // Emit the "rideConfirmed" event to all connected clients
        socket.emit("sendMessage", {
            socketId: queueData.user.socketId,
            messageObj: {
                event: "rideConfirmed",
                ride: queueData,
            }
        });
    } catch (error) {
        console.error("Error processing 'rideConfirmed' message:", error.message);
    }
});


//! Ride started
subscribe("rideStarted", async (message) => {

    try {
        const queueData = JSON.parse(message);;

        if (!queueData)
            return console.error("Ride data is missing in the message payload");
        socket.emit("sendMessage", {
            socketId: queueData.user.socketId,
            messageObj: {
                event: "rideStarted",
                ride: queueData,
            }
        })
    } catch (err) {
        return console.error("Error processing 'rideStarted' message:", err.message);
    }
})


// ! End ride
subscribe("rideEnd", async (message) => {

    try {

        const queueData = JSON.parse(message);
        if (!queueData) {
            return console.error("Ride data is missing in the message payload");

        }
        socket.emit("sendMessage", {
            socketId: queueData.user.socketId,
            messageObj: {
                event: "rideEnd",
                ride: queueData
            }
        })

    } catch (err) {

    }
})


