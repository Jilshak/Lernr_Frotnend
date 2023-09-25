import React from 'react'
import EnrolledCourses from '../Components/EnrolledCourses'
import Navbar from '../Components/Navbar'

function EnrolledPage() {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center text-2xl font-bold text-[#4D4848] my-10'>
                <h1>COURSES ENROLLED</h1>
            </div>
            <div className='grid justify-center'>
                <div className='mx-[90px]'>
                    <EnrolledCourses />
                    <EnrolledCourses />
                </div>
            </div>
        </div>
    )
}

export default EnrolledPage
