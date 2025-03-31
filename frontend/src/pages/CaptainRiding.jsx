import React, { useRef, useState } from 'react'

import logo from "../assets/Images/logo.png"
import { useGSAP } from '@gsap/react';
import gsap from "gsap"
import FinishPanel from './FinishPanel';
import { Link } from "react-router-dom"
const CaptainRiding = () => {

    const [finishPanel, setFinishPanel] = useState(false);
    const finishPanelRef = useRef(null);

    useGSAP(() => {

        if (finishPanel) {
            gsap.to(finishPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishPanel])
    return (
        <div className='h-screen relative'>
            <div className="fixed p-6 top-0 items-center justify-between w-screen">
                <img src={logo} alt="logo" className="w-14 " />
                <Link to="/captains/home" className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg  font-medium ri-logout-5-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" />
            </div>
            <div className='h-1/5 p-6 bg-yellow-400 justify-between relative flex items-center '
                onClick={() => {

                    setFinishPanel(true);
                }}>
                <h5 className='p-1 text-center w-[95%] absolute top-0'>
                    <i className="text-3xl text-gray-200 ri-arrow-up-wide-line"></i>
                </h5>
                <h4>4 Km away</h4>
                <button className="bg-gray-400 text-white font-semibold p-3 px-10 rounded-lg">Complete ride</button>
            </div>
            <div ref={finishPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
                <FinishPanel setFinishPanel={setFinishPanel} />
            </div>


        </div>
    )
}

export default CaptainRiding