import React from 'react'
import { Link } from 'react-router-dom'

const FinishPanel = (props) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-500 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s" className='h-12 rounded-full object-cover w-12' />
                    <h2 className='text-lg font-medium'>Harsh Patel</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>

            </div>
            <div className="flex gap-2 justify-between flex-col items-center ">
                \    <div className='w-full'>
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
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya, talab, Bhopal</p>
                        </div>

                    </div>
                    <div className='mt-6 w-full'>

                        <Link to="/captains/ride" className='w-[25%] ml-[70%] flex  mt-2 cursor-pointer bg-yellow-500 text-black font-semibold p-2  justify-center rounded-lg'>Finish</Link>

                    </div>
                </div>
            </div></div>
    )
}

export default FinishPanel