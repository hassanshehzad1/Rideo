import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmPopup = (props) => {

    const submitHandler = (e)=>{
        console.log(e);
    }
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-3">Confirm this ride to start</h3>
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
                    <div className='w-full pb-2'>
                        <form onSubmit={submitHandler}>
                        <input type="text" className='bg-gray-200 px-6 py-4 font-mono text-lg rounded-lg w-full '
                            placeholder='Enter  OTP'
                        />
                            <Link to="/captains/ride" className='flex text-center items-center justify-center mt-2 cursor-pointer bg-yellow-500 text-white font-semibold p-2 rounded-lg'>Confirm</Link>
                            
                            <button className='w-full  mt-2 cursor-pointer bg-gray-600 text-white font-semibold p-2 rounded-lg' onClick={() => {
                                props.setConfirmPopupPanel(false)
                            }}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div></div>
    )
}

export default ConfirmPopup