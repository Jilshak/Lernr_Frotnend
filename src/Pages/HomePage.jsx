import React from 'react'
import Navbar from '../Components/Navbar'
import Carousal from '../Components/Carousal'

import CoursesCards from '../Components/CoursesCards'
import CategoriesCards from '../Components/CategoriesCards'
import Footer from '../Components/Footer'

function HomePage() {
    return (
        <div className='h-full'>
            <div className='z-50 sticky top-0'>
                <Navbar />
            </div>
            <div className='mx-[30px] mt-3 z-0'>
                <Carousal />
            </div>
            <div className='mt-4 h-[400px] mx-[30px]'>
                <h1 className='text-2xl font-bold text-[#3D3D3D] '>Courses Available </h1>
                <div className='h-[300px] grid grid-flow-col lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 carousel carousel-center rounded-box bg-white relative top-5  overflow-x-auto overflow-y-hidden' style={{ maxWidth: '100%' }}>
                    <CoursesCards />
                    <CoursesCards />
                    <CoursesCards />
                    <CoursesCards />
                    <CoursesCards />
                </div>
            </div>

            <div className='mx-[30px]'>
                <h1 className='text-2xl font-bold text-[#3D3D3D] '>Top Categories</h1>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 justify-center sm:grid-cols-2 gap-20 my-8'>
                    <CategoriesCards />
                    <CategoriesCards />
                    <CategoriesCards />
                    <CategoriesCards />
                    <CategoriesCards />
                    <CategoriesCards />
                    <CategoriesCards />
                    <CategoriesCards />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default HomePage
