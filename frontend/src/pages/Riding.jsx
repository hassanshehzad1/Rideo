import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

const Riding = () => {
    const location = useLocation();
    const { ride } = location.state;
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(true);

    useEffect(() => {
        socket.on("rideEnd", (data) => {
            console.log("Ride ended", data);
            navigate("/home");
        });

        socket.emit("joinChat", { rideId: ride._id, userId: ride.user._id, userType: "user" });

        socket.on("chatMessage", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off("chatMessage");
            socket.off("rideEnd");
        };
    }, [ride._id, ride.user._id, socket, navigate]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageData = {
            rideId: ride._id,
            senderId: ride.user._id,
            senderType: "user",
            message: newMessage,
            timestamp: new Date().toISOString(),
        };

        socket.emit("sendChatMessage", messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage("");
    };

    return (
        <div className="h-screen">
            {/* Chatbox at the top */}
            {isChatOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        background: "#fff",
                        borderBottom: "1px solid #ccc",
                        padding: "10px",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            height: "100px",
                            overflowY: "scroll",
                            border: "1px solid #ddd",
                            padding: "5px",
                            marginBottom: "10px",
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                style={{
                                    textAlign: msg.senderId === ride.user._id ? "right" : "left",
                                    margin: "5px 0",
                                }}
                            >
                                <span
                                    style={{
                                        background: msg.senderId === ride.user._id ? "#007bff" : "#e9ecef",
                                        color: msg.senderId === ride.user._id ? "white" : "black",
                                        padding: "5px 10px",
                                        borderRadius: "10px",
                                        display: "inline-block",
                                    }}
                                >
                                    {msg.message}
                                </span>
                                <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            style={{ flex: 1, padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
                        />
                        <button type="submit" style={{ padding: "5px 10px", background: "orange", color: "black", borderRadius: "5px" , border:"1px solid black"}}>
                            Send
                        </button>
                    </form>
                    <button
                        onClick={() => setIsChatOpen(false)}
                        style={{ marginTop: "5px", padding: "5px 10px", background: "#ccc", borderRadius: "5px" }}
                    >
                        Close Chat
                    </button>
                </div>
            )}

            {/* Existing UI */}
            <Link to="/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className="h-1/2">
                <img className="h-full w-full object-cover" />
            </div>
            <div className="h-1/2 p-4">
                <div className="flex items-center justify-between">
                    <img src="https://www.svgrepo.com/download/408292/car-white.svg" className="h-12" />
                    <div className="text-right">
                        <h2 className="text-xl font-medium">Driver</h2>
                        <h4 className="text-2xl font-semibold -mt-1">
                            {ride?.captain?.fullName?.firstName + " " + ride?.captain?.fullName?.lastName}
                        </h4>
                        <p className="text-lg text-gray-600">{ride?.captain?.vehicle?.licensePlate}</p>
                    </div>
                </div>
                <div className="flex gap-2 justify-between flex-col items-center">
                    <div className="w-full">
                        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                            <i className="ri-map-pin-user-fill"></i>
                            <div>
                                <h3 className="text-xl font-medium">Terminal</h3>
                                <p className="text-lg -mt-1 text-gray-600">{ride?.pickup}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                            <i className="ri-map-pin-user-fill"></i>
                            <div>
                                <h3 className="text-xl font-medium">Destination</h3>
                                <p className="text-lg -mt-1 text-gray-600">{ride?.destination}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                            <i className="ri-map-pin-user-fill"></i>
                            <div>
                                <h3 className="text-xl font-medium">Fare</h3>
                                <p className="text-lg -mt-1 text-gray-600">{ride?.fare}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="w-full mt-2 cursor-pointer bg-red-900 text-white font-semibold p-2 rounded-lg">
                    Make a Payment
                </button>
            </div>
        </div>
    );
};

export default Riding;