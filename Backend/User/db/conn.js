import mongoose from "mongoose";

const connect = async () => {
    try {
        console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);
        // In conn.js (for all services)
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/Rideo", {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 60000,
            connectTimeoutMS: 60000,
            maxPoolSize: 20, // Reduce to 20 per service (total 100 connections for 5 services)
            minPoolSize: 5, // Keep a minimum of 5 connections
            maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
            bufferTimeoutMS: 30000,
        });
        console.log("User Service DB connected");
    } catch (err) {
        console.error("User Service DB connection failed:", err.message);
        console.log("Retrying User Service DB connection in 5 seconds...");
        setTimeout(connect, 5000);
    }
};

export default connect;