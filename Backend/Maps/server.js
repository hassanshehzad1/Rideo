
import http from "http";
import app from "./app.js";
// import { initializeSocket } from "../socket.js"
const PORT = process.env.PORT || 3004;

const server = http.createServer(app);
// initializeSocket(server);

server.listen(PORT, () => {
    console.log(`MAP services ${process.env.NODE_ENV} mode is at http://localhost:${PORT}`);
});