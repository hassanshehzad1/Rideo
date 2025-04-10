// rideo-ride-service/app.js
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

dotenv.config();

import connect from "./db/conn.js"; // Monolith se copy ya alag DB connection
connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

import rideRoute from "./routes/ride.routes.js"; // Monolith se copy
import {connectToRabbit} from "./services/rabbit.js"; // Monolith se copy
connectToRabbit(); // RabbitMQ se connect karne ke liye
app.use("/", rideRoute); // Root pe lagao, proxy ke baad /rides hata jata hai

export default app;