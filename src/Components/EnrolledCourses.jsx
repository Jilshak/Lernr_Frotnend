import React from 'react'
import Rating from './Rating'

function EnrolledCourses() {
    return (
        <div class="justify-between mb-6 rounded-lg  p-6 shadow-md hover:shadow-2xl cursor-pointer  sm:flex sm:justify-start bg-white">
            <img src={`https://source.unsplash.com/vpOeXr5wmR4/`} alt="product-image" class="w-full max-h-[110px] rounded-lg sm:w-40" />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                    <h2 class="text-md font-bold ">The complete Python Bootcamp From Zero to Hero in Python</h2>
                    <p class="mt-1 text-xs ">Created by</p>
                    <div className='flex'>
                        <Rating />
                        <p className='text-xs relative bottom-0.5 ms-2'>(42384)</p>
                    </div>
                    <p className='text-xs flex'>Course length: <p className='font-semibold'>8hr</p></p>
                    <div className='relative lg:hidden md:hidden sm:hidden  lg:top-6 md:top-6 bottom-10 left-36 xs:block'>
                        <div className="radial-progress text-success" style={{ "--value": "50", fontSize: "12px", "--size": "2.5rem", "--thickness": "4px" }}>50%</div>
                    </div>
                </div>
                <div className='relative lg:block md:block sm:block  lg:top-6 md:top-6 sm:top-6 lg:left-2 xs:hidden'>
                    <div className="radial-progress text-success" style={{ "--value": "50", fontSize: "12px", "--size": "2.5rem", "--thickness": "4px" }}>50%</div>
                </div>
            </div>
        </div>
    )
}

export default EnrolledCourses
