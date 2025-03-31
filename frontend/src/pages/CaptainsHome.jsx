import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/Images/logo.png"
import CaptainsDetails from './CaptainsDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import ConfirmPopup from '../components/ConfirmPopup'
const CaptainsHome = () => {


  const [popupPanel, setPopupPanel] = useState(true);
  const popupPanelRef = useRef(null);

  const [confirmPopupPanel, setConfirmPopupPanel] = useState(false);
  const confirmPopupRef = useRef(null);


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
        <RidePopup setPopupPanel={setPopupPanel} setConfirmPopupPanel={setConfirmPopupPanel}/>
      </div>
      <div ref={confirmPopupRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-4 pt-6">
        <ConfirmPopup setConfirmPopupPanel={setConfirmPopupPanel} />
      </div>
    </div>
  )
}

export default CaptainsHome