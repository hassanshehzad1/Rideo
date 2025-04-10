import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Images/logo.png";
import CaptainsDetails from './CaptainsDetails';
import RidePopup from '../components/RidePopup';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import ConfirmPopup from '../components/ConfirmPopup';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext';
import axios from "axios";

const CaptainsHome = () => {
    const [popupPanel, setPopupPanel] = useState(false);
    const popupPanelRef = useRef(null);
    const [confirmPopupPanel, setConfirmPopupPanel] = useState(false);
    const confirmPopupRef = useRef(null);

    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);
    const [ride, setRide] = useState(null);

    useEffect(() => {
        if (!captain) {
            console.log("Captain not found, skipping...");
            return;
        }

        // Socket connect and join
        socket.on("connect", () => {
            const token = localStorage.getItem("token");
            console.log("Captain token", token);
            if (!token) {
                console.error("Token not found, skipping join operation");
                return;
            }
            console.log("Captain connected to socket server:", socket.id);
            socket.emit("join", { userId: captain._id, userType: "captain", token });
        });

        // Listen for new ride requests
        socket.on("newRideRequest", (data) => {
            console.log("New ride request received:", data);
            setRide(data);
            setPopupPanel(true);
        });

        // Handle errors
        socket.on("error", (error) => {
            console.error("Socket error in CaptainHome:", error);
        });
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found, skipping location update operation");
        }
        // Update location
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        socket.emit("updateLocation", {
                            userId: captain._id,
                            location: {
                                type: "Point",
                                coordinates: [position.coords.longitude, position.coords.latitude]
                            },
                            token
                        });
                    },
                    (error) => {
                        console.error("Geolocation error:", error.message);
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            } else {
                console.error("Geolocation not supported.");
            }
        };

        // Initial location update
        updateLocation();
        const locationInterval = setInterval(updateLocation, 10000);

        // Cleanup
        return () => {
            socket.off("connect");
            socket.off("newRideRequest");
            socket.off("error");
            clearInterval(locationInterval);
        };
    }, [captain, socket]);

    useGSAP(() => {
        if (popupPanel) {
            gsap.to(popupPanelRef.current, { transform: 'translateY(0)' });
        } else {
            gsap.to(popupPanelRef.current, { transform: 'translateY(100%)' });
        }
    }, [popupPanel]);

    useGSAP(() => {
        if (confirmPopupPanel) {
            gsap.to(confirmPopupRef.current, { transform: 'translateY(0)' });
        } else {
            gsap.to(confirmPopupRef.current, { transform: 'translateY(100%)' });
        }
    }, [confirmPopupPanel]);

    const confirmRide = async () => {

        console.log("ID", ride._id);
        console.log(`TOken ${localStorage.getItem("token")}`);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/rides/confirm-ride`, {
                rideId: ride._id,
                user:ride.user
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            console.log("Ride confirmed:", res);
            setConfirmPopupPanel(true);
            setPopupPanel(false);
            setRide(res.data);
        } catch (err) {
            console.error("Error confirming ride:", err);
        }
    };

    return (
        <div className='h-screen'>
            <div className="fixed p-6 top-0 items-center justify-between w-screen">
                <img src={logo} alt="logo" className="w-14" />
                <Link to="/captains/home" className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-5-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainsDetails />
            </div>
            <div ref={popupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
                <RidePopup ride={ride} setPopupPanel={setPopupPanel} confirmRide={confirmRide} />
            </div>
            <div ref={confirmPopupRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-4 pt-6">
                <ConfirmPopup ride={ride} setConfirmPopupPanel={setConfirmPopupPanel} />
            </div>
        </div>
    );
};

export default CaptainsHome;