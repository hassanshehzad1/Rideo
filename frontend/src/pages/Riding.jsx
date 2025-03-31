import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
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
                        <h2 className='text-lg font-medium'>Driver</h2>
                        <h4 className='text-xl font-semibold -mt-1'>MP 04004</h4>
                        <p className='text-sm text-gray-600'>Mehran Aulto</p>

                    </div>
                </div>
                <div className="flex gap-2 justify-between flex-col items-center ">
                    <div className='w-full'>

                        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                            <i className='ri-map-pin-user-fill'></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Kankariya, talab, Bhopal</p>
                            </div>

                        </div>
                        <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                            <i className='ri-map-pin-user-fill'></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Kankariya, talab, Bhopal</p>
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