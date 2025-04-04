import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/Images/logo.png"
import CaptainsDetails from './CaptainsDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import ConfirmPopup from '../components/ConfirmPopup'
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from '../context/SocketContext'
import axios from "axios"
const CaptainsHome = () => {


  const [popupPanel, setPopupPanel] = useState(false);
  const popupPanelRef = useRef(null);

  const [confirmPopupPanel, setConfirmPopupPanel] = useState(false);
  const confirmPopupRef = useRef(null);


  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);
  useEffect(() => {
    // Agar captain nahi hai, toh return karo
    if (!captain) {
      console.log("Captain not found, skipping...");
      return;
    }

    // Join event bhejo
    socket.emit("join", { userId: captain._id, userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log("Location fetched:", position.coords);
            socket.emit("updateLocation", {
              userId: captain._id,
              location: {
                type: "Point",
                coordinates: [position.coords.longitude, position.coords.latitude] // [lng, lat] order mein
              }
            });
          },
          (error) => {
            // Error handling
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              default:
                console.error("An unknown error occurred:", error.message);
                break;
            }
          },
          {
            enableHighAccuracy: true, // High accuracy ke liye
            timeout: 10000, // 10 seconds ka timeout
            maximumAge: 0 // Fresh location fetch karo
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // Initial call
    updateLocation();

    // Har 10 seconds mein call karo
    const locationInterval = setInterval(updateLocation, 10000);

    // Cleanup on unmount ya dependencies change hone pe
    return () => {
      // console.log("Cleaning up interval");
      clearInterval(locationInterval);
    };
  }, [captain, socket]);


  // New ride event
  socket.on("newRideRequest", (data) => {
    setRide(data);
    setPopupPanel(true);
  })

  useGSAP(() => {
    if (popupPanel) {
      gsap.to(popupPanelRef.current, {
        transform: 'translateY(0)'
      });

    } else {
      gsap.to(popupPanelRef.current, {
        transform: 'translateY(100%)'
      });

    }
  }, [popupPanel]);
  useGSAP(() => {
    if (confirmPopupPanel) {
      gsap.to(confirmPopupRef.current, {
        transform: 'translateY(0)'
      });

    } else {
      gsap.to(confirmPopupRef.current, {
        transform: 'translateY(100%)'
      });

    }
  }, [confirmPopupPanel]);



  //! Ride confirm
  const confirmRide = async () => {

    try{

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/rides/confirm-ride`, {

      rideId: ride._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    )
    console.log("Ride confirmed " + res)
    setConfirmPopupPanel(true);
    setPopupPanel(false);
    setRide(res.data);
  }catch(err){
    console.error(err);
    
  }
}
  return (
    <div className='h-screen'>
      <div className="fixed p-6 top-0 items-center justify-between w-screen">
        <img src={logo} alt="logo" className="w-14 " />
        <Link to="/captains/home" className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg  font-medium ri-logout-5-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainsDetails />
      </div>

      {/* Popup */}
      <div ref={popupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <RidePopup ride={ride} setPopupPanel={setPopupPanel} confirmRide={confirmRide} />
      </div>
      <div ref={confirmPopupRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-4 pt-6">
        <ConfirmPopup ride={ride} setConfirmPopupPanel={setConfirmPopupPanel} />
      </div>
    </div>
  )
}

export default CaptainsHome