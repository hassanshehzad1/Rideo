import React from 'react'

const DriverLook = (props) => {
    return (
        <div>
            <h5
                onClick={() => {
                    props.setVehicleFound(false)
                }}
                className='p-1 text-center w-[95%] absolute top-0' >
                <i className='text-3xl text-gray-600 ri-arrow-down-wide-line'></i>



            </h5>

            
            <h3 className="text-2xl font-semibold mb-5">Driver Look</h3>
            <div className="flex gap-2 justify-between flex-col items-center ">
                <img src="https://www.svgrepo.com/download/408292/car-white.svg" className='h-30' alt="im" />
                <div className='w-full'>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Date</h3>
                            <p className='text-md -mt-1 text-gray-600'>{props?.ride?.createdAt ? props?.ride.createdAt.split("T")[0] : "N/A"}</p>
                        </div>

                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Fare</h3>
                            <p className="text-md -mt-1 text-gray-600">{props?.ride?.fare || 0} Pkr</p>
                        </div>

                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>Status</h3>
                            <p className="text-md -mt-1 text-gray-600">{props?.ride?.status || "N/A"} </p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default DriverLook