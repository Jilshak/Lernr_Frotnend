import React from 'react'
import Rating from './Rating'

function EnrolledCourses(props) {

    const {item} = props

    return (
        <div class="justify-between mb-6 rounded-lg w-[600px]  p-6 shadow-md hover:shadow-2xl cursor-pointer  sm:flex sm:justify-start bg-white">
            <img src={item.thumbnail ? item.thumbnail : `https://source.unsplash.com/vpOeXr5wmR4/`} alt="product-image" class="w-full max-h-[110px] rounded-lg sm:w-40" />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                    <h2 class="text-md font-bold ">{item.title}</h2>
                    
                    <div className='flex mt-1'>
                        <Rating />
                        <p className='text-xs relative bottom-0.5 ms-2'>(42384)</p>
                    </div>
                    <p className='text-xs mt-1 flex'>Course length: <p className='font-semibold mx-1'>{item.course_length}hr</p></p>
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
