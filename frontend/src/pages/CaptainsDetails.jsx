import React, { useContext } from 'react'

import { CaptainDataContext } from "../context/CaptainContext.jsx"
const CaptainsDetails = () => {

    const { captain } = useContext(CaptainDataContext);
    if(!captain){
        return <div className='text-center text-green-500'>Loading....</div>
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-10">
                <div className='flex items-center justify-start gap-3 '>
                    <img className="h-12 w-12 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s" alt="random" />
                    <h1 className="text-3xl font-medium">{captain?.fullName?.firstName + " " + captain?.fullName?.lastName}</h1>
                </div>
                <div>
                    <h4 className='text-2xl font-semibold'>$295.0</h4>
                    <p className='text-sm text-gray-700'>Earned</p>
                </div>
            </div>
            <div className="flex p-3 bg-gray-50  justify-evenly gap-5 items-start">
                <div className="text-center">
                    <i className=' text-3xl mb-2  font-thin ri-car-line'></i>
                    <h5 className='text-xl font-medium'>Vehicle</h5>
                    <p className='text-lg text-gray-700'>{captain?.vehicle?.type}</p>
                </div>
                <div className="text-center">
                    <i className='  text-2xl font-thin  ri-calendar-schedule-line'></i>
                    <h5 className='text-xl font-medium'>Status</h5>
                    <p className='text-lg text-gray-700'>{captain?.status}</p>
                </div>
                <div className="text-center">
                    <i className='   text-2xl font-thin ri-history-fill'></i>
                    <h5 className='text-xl font-medium'>Model</h5>
                    <p className='text-lg text-gray-700'>{captain?.vehicle?.model}</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainsDetails