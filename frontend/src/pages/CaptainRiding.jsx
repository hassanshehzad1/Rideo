import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/Images/logo.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishPanel from "./FinishPanel";
import { Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    transports: ["websocket"],
});

const CaptainRiding = () => {
    const [finishPanel, setFinishPanel] = useState(false);
    const finishPanelRef = useRef(null);
    const location = useLocation();
    console.log(location);
    const rideData = location.state?.ride;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(true);

    useEffect(() => {
        socket.emit("joinChat", { rideId: rideData._id, userId: rideData.captain._id, userType: "captain" });

        socket.on("chatMessage", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off("chatMessage");
        };
    }, [rideData._id, rideData.captain._id]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageData = {
            rideId: rideData._id,
            senderId: rideData.captain._id,
            senderType: "captain",
            message: newMessage,
            timestamp: new Date().toISOString(),
        };

        socket.emit("sendChatMessage", messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage("");
    };

    useGSAP(() => {
        if (finishPanel) {
            setIsChatOpen(false);
            gsap.to(finishPanelRef.current, {
                transform: "translateY(0)",
            });
        } else {
            gsap.to(finishPanelRef.current, {
                transform: "translateY(100%)",
            });
        }
    }, [finishPanel]);

    return (
        <div className="h-screen relative">
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
                                    textAlign: msg.senderId === rideData.captain._id ? "right" : "left",
                                    margin: "5px 0",
                                }}
                            >
                                <span
                                    style={{
                                        background: msg.senderId === rideData.captain._id ? "#007bff" : "#e9ecef",
                                        color: msg.senderId === rideData.captain._id ? "white" : "black",
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
                        <button type="submit" style={{ padding: "5px 10px", background: "orange", color: "black", borderRadius: "5px", border:"1px solid black"}}>
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
            <div className="fixed p-6 top-0 items-center justify-between w-screen">
                <img src={logo} alt="logo" className="w-14 " />
                <Link to="/captains/home" className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <i className="text-lg font-medium ri-logout-5-line"></i>
                </Link>
            </div>
            <div className="h-4/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg"
                />
            </div>
            <div
                className="h-1/5 p-6 bg-yellow-400 justify-between relative flex items-center"
                onClick={() => {
                    setFinishPanel(true);
                }}
            >
                <h5 className="p-1 text-center w-[95%] absolute top-0">
                    <i className="text-3xl text-gray-200 ri-arrow-up-wide-line"></i>
                </h5>
                <h4>4 Km away</h4>
                <button className="bg-gray-400 text-white font-semibold p-3 px-10 rounded-lg">Complete ride</button>
            </div>
            <div ref={finishPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
                <FinishPanel ride={rideData} setFinishPanel={setFinishPanel} />
            </div>
        </div>
    );
};

export default CaptainRiding;