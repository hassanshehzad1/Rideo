
import http from "http";
import app from "./app.js";
// import { initializeSocket } from "../socket.js"
import "./services/worker.service.js";
const PORT = process.env.PORT || 3002;

const server = http.createServer(app);
// initializeSocket(server);

server.listen(PORT, () => {
    console.log(`Captain services ${process.env.NODE_ENV} mode is at http://localhost:${PORT}`);
});