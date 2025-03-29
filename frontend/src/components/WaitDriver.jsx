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
                    <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                        <i className='ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya, talab, Bhopal</p>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default WaitDriver