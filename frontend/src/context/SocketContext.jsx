import React, { createContext, useEffect } from 'react'
import io from "socket.io-client";
export const SocketContext = createContext();
const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

const SocketProvider = ({ children }) => {

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to server")
        })

        socket.on("disconnect", () => {
            console.log("Disconnected")
        })


        // Cleanup on unmount
        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, [])


    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider