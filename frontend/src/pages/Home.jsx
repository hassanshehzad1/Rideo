import React from 'react'
import logo from "../assets/Images/logo.png"
import backImage from "../assets/Images/backImage.png"
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div>
            <div className=" bg-cover bg-center h-screen flex pt-8 bg-center flex-col justify-between w-full bg-[#1248c7]" style={{
                backgroundImage: `url(${backImage})`,
                backgroundSize: '50%', // Image size 50% of div
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // No repeat
            }}>
                <img src={logo} alt="logo" className="w-14 ml-9" />
                <div className='bg-white py-4 pb-7 px-4'>
                    <h2 className='text-2xl md:text-3xl font-bold'>Ride Easy, Ride Smart with Rideo</h2>
                    <Link to="/users/login" className="flex items-center justify-center w-full bg-[#f13a28] text-white py-3 rounded cursor-pointer">Start your journey</Link>
                </div>

            </div>
        </div >
    )
}

export default Home