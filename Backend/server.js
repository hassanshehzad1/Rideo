// Creating server 

import http from "http";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`Your app is in ${process.env.MODE} is running on the local host http://localhost:${process.env.PORT}`);
})




