import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
const ConfirmPopup = (props) => {
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState("");


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(otp);

        try {

            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/rides/start-ride`, {
                rideId: props?.ride?._id,
                otp: otp
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(res)
            navigate("/captains/ride", { state: { ride: res.data } })

        } catch (err) {
            console.error(err);

        }

    }
    return (
        <div>
            <h3 className="text-2xl font-semibold mb-3">Confirm this ride to start</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-500 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s" className='h-12 rounded-full object-cover w-12' />
                    <h2 className='text-lg font-medium'>{props?.ride?.user?.fullName?.firstName + " " + props?.ride?.user?.fullName?.lastName}</h2>
                </div>
                <h5 className='text-lg font-semibold'></h5>

            </div>
            <div className="flex gap-2 justify-between flex-col items-center ">
                \    <div className='w-full'>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-xl font-medium'>Terminal</h3>
                            <p className='text-lg -mt-1 text-gray-600'>{props?.ride?.pickup}</p>
                        </div>

                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-xl font-medium'>Destination</h3>
                            <p className='text-lg -mt-1 text-gray-600'>{props?.ride?.destination}</p>
                        </div>

                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Amount </h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props?.ride?.fare}</p>
                        </div>

                    </div>
                    <div className='w-full pb-2'>
                        <form onSubmit={submitHandler}>
                            <input type="text" value={otp} onChange={(e) => {
                                setOtp(e.target.value)
                            }} className='bg-gray-200 px-6 py-4 font-mono text-lg rounded-lg w-full '
                                placeholder='Enter  OTP'
                            />
                            <button type="submit" className='flex text-center items-center justify-center mt-2 cursor-pointer bg-yellow-500 w-full text-white font-semibold p-2 rounded-lg'>Confirm</button>

                        </form>
                        <button className='w-full  mt-2 cursor-pointer bg-gray-600 text-white font-semibold p-2 rounded-lg' onClick={() => {
                            props.setConfirmPopupPanel(false)
                        }}>Cancel</button>
                    </div>
                </div>
            </div></div>
    )
}

export default ConfirmPopup