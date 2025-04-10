// rideo-ride-service/server.js
import http from "http";
import app from "./app.js"; // Ride service ka app.js

const PORT = process.env.PORT || 3003; // Alag port, jaise 3002

const server = http.createServer(app);

// Socket.io optional hai - agar chahiye toh rakho
//  import { initializeSocket } from "../socket.js";
//  initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Ride services ${process.env.NODE_ENV} mode mein chal raha hai at http://localhost:${PORT}`);
});