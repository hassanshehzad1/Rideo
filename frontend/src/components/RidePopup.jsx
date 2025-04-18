import React from 'react'
import { Link } from 'react-router-dom'

const RidePopup = (props) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-5">New Ride</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-500 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s" className='h-12 rounded-full object-cover w-12' />
                    <h2 className='text-lg font-medium'>{props?.ride?.user?.fullName?.firstName + " " + props?.ride?.user?.fullName?.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold capitalize'>{props?.ride?.status}</h5>

            </div>
            <div className="flex gap-2 justify-between flex-col items-center ">
                \    <div className='w-full'>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-range-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-md -mt-1 text-gray-600'>{props?.ride?.pickup}</p>
                        </div>

                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props?.ride?.destination}</p>
                        </div>

                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-currency-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Amount</h3>
                            <p className='text-md -mt-1 text-gray-600'>{props?.ride?.fare} Pkr</p>
                        </div>

                    </div>
                    <div className="flex mt-2 w-full items-center justify-between">
                        <button className=' px-3  mt-2 cursor-pointer bg-yellow-500 text-black font-semibold py-2 rounded-lg' onClick={() => {
                            props.confirmRide()
                        }}>Accept</button>
                        <button className='  mt-1 cursor-pointer bg-gray-600 text-white font-semibold px-3 py-2 rounded-lg' onClick={() => {
                            props.setPopupPanel(false)
                        }}>Decline</button>
                    </div>
                </div>
            </div></div>
    )
}

export default RidePopup