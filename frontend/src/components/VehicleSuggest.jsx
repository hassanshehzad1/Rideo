import React from 'react'

const VehicleSuggest = (props) => {
    return (
        <>
        {console.log(props)}
            <h5 className='p-1 text-center w-[95%] absolute top-0' onClick={() => {
                props.setVehiclePanel(false)
            }}>
                <i className='text-3xl text-gray-600 ri-arrow-down-wide-line'></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
            <div className="flex border-2   border-gray-100 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between " onClick={() => {
                props.setConfirmPanel(true)
                props.setVehicleType("car")
            }}>
                <img src="https://www.svgrepo.com/download/408292/car-white.svg" className='h-12' alt="im" />
                <div className='w-1/2 ml-2'>
                    <h4 className='font-medium text-base'>UberGo<span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold '>{props?.fare?.car} Pkr</h2>
            </div>
            <div className="flex border-2 border-gray-100 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between" onClick={() => {
                props.setConfirmPanel(true)
                props.setVehicleType("bike")
            }}>
                <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png" className='h-10 -ml-2' alt="im" />
                <div className='w-1/2 -ml-4'>
                    <h4 className='font-medium text-base'>Moto<span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className="font-medium text-sm">3 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, motorcycles rides</p>
                </div>
                <h2 className='text-lg font-semibold '>{props?.fare?.bike} Pkr</h2>
            </div>
            <div className="flex border-2 border-gray-100 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between " onClick={() => {
                props.setCOnfirmPanel(true)
                props.setVehicleType("auto")
            }}>
                <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" className='h-10' alt="im" />
                <div className='w-1/2 -ml-10'>
                    <h4 className='font-medium text-base'>Auto<span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className="font-medium text-sm">7 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
                </div>
                <h2 className='text-lg font-semibold '>{props?.fare?.auto} Pkr</h2>
            </div>
        </>
    )
}

export default VehicleSuggest