import React from 'react'

const WaitDriver = (props) => {
    return (
        <div>
            <h5
                onClick={
                    () => {
                        props.setWaitDriver(false)
                    }
                }
                className='p-1 text-center w-[95%] absolute top-0' >
               
                <i className='text-3xl text-gray-600 ri-arrow-down-wide-line'></i>
            </h5>
            <div className="flex items-center justify-between">
                <img src="https://www.svgrepo.com/download/408292/car-white.svg" className='h-24' />
                <div className='text-right'>
                    <h2 className='text-lg font-medium'>Driver Info</h2>
                    <h4 className='text-2xl font-semibold -mt-1'>{props?.ride?.captain?.fullName?.firstName + " " + props?.ride?.captain?.fullName?.lastName}</h4>
                    <p className='text-xl text-gray-600'>{props?.ride?.captain?.vehicle?.licensePlate}</p>
                    <h4 className='text-xl font-semibold -mt-1'>{props?.ride?.otp}</h4>

                </div>
            </div>
            <div className="flex gap-2 justify-between flex-col items-center ">
                <div className='w-full'>
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
                            <p className='text-ls -mt-1 text-gray-600'>{props?.ride?.destination}</p>
                        </div>

                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-xl font-medium'>Amount </h3>
                            <p className='text-lg -mt-1 text-gray-600'>{props?.ride?.fare}</p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default WaitDriver