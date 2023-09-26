import React from 'react'
import MyCoursesCard from '../Components/MyCoursesCard'
import Navbar from '../Components/Navbar'


function MyCourses() {
    return (
        <div className='min-h-screen'>
            <div className='flex text-2xl items-center justify-center font-bold text-[#4D4848] mt-5'>
                <h1>MY COURSES</h1>
            </div>
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 mx-[100px] relative top-10'>
                <MyCoursesCard />
                <MyCoursesCard />
                <MyCoursesCard />
            </div>
        </div>
    )
}

export default MyCourses
