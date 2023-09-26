import React, { useEffect } from 'react'
import Carousal from '../Components/Carousal'
import CoursesCards from '../Components/CoursesCards'
import CategoriesCards from '../Components/CategoriesCards'
import Footer from '../Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../features/CourseSlice'
import { Link } from 'react-router-dom'

function HomePage() {

    const dispatch = useDispatch()
    const course = useSelector((state) => state.courses)

    useEffect(() => {
        dispatch(getCourses())
    }, [])

    return (
        <div className='h-full'>
            <div className='mx-[30px] mt-3 z-0'>
                <Carousal />
            </div>
            {
                course && course.data.length >= 1 ?
                    <>
                        <div className='mt-4 h-[400px] mx-[30px]'>
                            <h1 className='text-2xl font-bold text-[#3D3D3D] '>Courses Available </h1>
                            <div className='h-[300px] grid grid-flow-col lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 carousel carousel-center rounded-box bg-white relative top-5  overflow-x-auto overflow-y-hidden' style={{ maxWidth: '100%' }}>
                                {
                                    course.data.map((item) => {
                                        return (
                                            <CoursesCards key={item.id} item={item} />
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </> : null
            }

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
