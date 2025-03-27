// Import packages
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
dotenv.config();

// Importing file
import connect from "./db/conn.js";
connect();

const app = express();

// Setting middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Importing routes
import userRoute from "./routes/user.routes.js";
// Routes
app.use("/api/v1/users", userRoute);


export default app;



