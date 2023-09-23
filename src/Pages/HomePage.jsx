import React from 'react'
import Navbar from '../Components/Navbar'
import Carousal from '../Components/Carousal'
import image1 from '../Images/image1.avif'

function HomePage() {
    return (
        <div className='h-full object-contain'>
            <div className='z-50'>
                <Navbar />
            </div>
            <div className='mx-[30px] mt-3 z-0'>
                <Carousal />
            </div>
            <div className='mt-4 h-[400px] mx-[30px]'>
                <h1 className='text-2xl font-bold text-[#3D3D3D] '>Courses Available </h1>
                <div className='h-[300px] bg-white relative top-5 rounded-lg'>
                    <div className='relative top-6 mx-7'>
                        <img className='h-[180px]' src={image1} alt="" />
                        <h1 className='font-bold text-md'>Python for Begginers</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
