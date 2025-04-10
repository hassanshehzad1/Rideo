import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import expressProxy from "express-http-proxy";

// import connect from "./db/conn.js";
// connect();

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// import userRoute from "./routes/user.routes.js";        
// import rideRoute from "./routes/ride.routes.js";
// import mapRoute from "./routes/map.routes.js";
// import captainRoute from "./routes/captain.routes.js";
app.use("/api/v1/maps", expressProxy("http://localhost:3004"));
app.use("/api/v1/rides", expressProxy("http://localhost:3003"));
app.use("/api/v1/users", expressProxy("http://localhost:3001"));
app.use("/api/v1/captains", expressProxy("http://localhost:3002"));

// app.use("/api/v1/maps", mapRoute);
// app.use("/api/v1/rides", rideRoute);
// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/captains", captainRoute);
// app.use("/api/v1/rides", expressProxy("http://localhost:3003"));
// app.use("/api/v1/users", expressProxy("http://localhost:3001"));
// app.use("/api/v1/captains", expressProxy("http://localhost:3002"));

export default app;