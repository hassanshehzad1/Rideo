import React from 'react'

const CaptainsDetails = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className='flex items-center justify-start gap-3'>
                    <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4UlS1Ehv87B7_HRdQWlKz8Jw13A0zxuiuQ&s" alt="random" />
                    <h4 className="text-lg font-medium">Harsh Patel</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>$295.0</h4>
                    <p className='text-sm text-gray-700'>Earned</p>
                </div>
            </div>
            <div className="flex p-3 bg-gray-50 rounded-xl justify-center gap-5 items-start">
                <div className="text-center">
                    <i className=' text-3xl mb-2  font-thin ri-timer-2-line'></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-700'>Hours onLine</p>
                </div>
                <div className="text-center">
                    <i className='  text-2xl font-thin  ri-speed-up-line'></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-700'>Hours onLine</p>
                </div>
                <div className="text-center">
                    <i className='   text-2xl font-thin ri-booklet-line'></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-700'>Hours onLine</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainsDetails