import React from 'react'

const ConfirmPanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[95%] absolute top-0' onClick={() => {
                props.setConfirmPanel(false)
            }}>
                <i className='text-3xl text-gray-600 ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Confirm Ride</h3>
            <div className="flex gap-2 justify-between flex-col items-center ">
                <img src="https://www.svgrepo.com/download/408292/car-white.svg" className='h-30' alt="im" />
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
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya, talab, Bhopal</p>
                        </div>

                    </div>
                    <button className='w-full  mt-2 cursor-pointer bg-red-900 text-white font-semibold p-2 rounded-full' onClick={() => {
                        props.setVehicleFound(true)
                        props.setConfirmPanel(false)
                    }}>Confirm</button>

                </div>
            </div>

        </div>
    )
}

export default ConfirmPanel