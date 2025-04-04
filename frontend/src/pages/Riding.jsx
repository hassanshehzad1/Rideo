import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import  {SocketContext} from "../context/SocketContext";
import { useContext } from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
const Riding = () => {
    const location = useLocation();
    const {ride} = location.state
    const navigate =  useNavigate();
    const  {socket} = useContext(SocketContext);
    socket.on("rideEnd", (data) => {
        console.log("Ride ended", data);
        navigate("/home")
    })

    return (
        <div className='h-screen '>
            <Link to="/home" className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg  font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' />
            </div>
            <div className='h-1/2 p-4'>
                <div className="flex items-center justify-between">
                    <img src="https://www.svgrepo.com/download/408292/car-white.svg" className='h-12' />
                    <div className='text-right'>
                        <h2 className='text-xl font-medium'>Driver</h2>
                        <h4 className='text-2xl font-semibold -mt-1'>{ride?.captain?.fullName?.firstName+ " " + ride?.captain?.fullName?.lastName}</h4>
                        <p className='text-lg text-gray-600'>{ride?.captain?.vehicle?.licensePlate}</p>

                    </div>
                </div>
                <div className="flex gap-2 justify-between flex-col items-center ">
                    <div className='w-full'>

                        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                            <i className='ri-map-pin-user-fill'></i>
                            <div>
                                <h3 className='text-xl font-medium'>Terminal</h3>
                                <p className='text-lg -mt-1 text-gray-600'>{ride?.pickup}</p>
                            </div>

                        </div>
                        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                            <i className='ri-map-pin-user-fill'></i>
                            <div>
                                <h3 className='text-xl font-medium'>Destination</h3>
                                <p className='text-lg -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>

                        </div>
                        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                            <i className='ri-map-pin-user-fill'></i>
                            <div>
                                <h3 className='text-xl font-medium'>Fare</h3>
                                <p className='text-lg -mt-1 text-gray-600'>{ride?.fare}</p>
                            </div>

                        </div>

                    </div>
                </div>
                <button className='w-full  mt-2 cursor-pointer bg-red-900 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding