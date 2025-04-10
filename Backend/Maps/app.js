import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

import mapRoute from "./routes/map.routes.js";
import { connectToRabbit } from "./services/rabbit.js";
connectToRabbit();

app.use("/", mapRoute);

export default app;