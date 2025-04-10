// rideo-user-service/app.js
import dotenv from "dotenv";
dotenv.config();

import connect from "./db/conn.js"; // Monolith se copy
connect();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import {connectToRabbit} from "./services/rabbit.js"; // Monolith se copy
connectToRabbit(); // RabbitMQ se connect karne ke liye

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

import userRoute from "./routes/user.routes.js"; // Monolith se copy
app.use("/", userRoute);

export default app;