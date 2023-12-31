import React, { useEffect } from 'react'
import Carousal from '../Components/Carousal'
import CoursesCards from '../Components/CoursesCards'
import CategoriesCards from '../Components/CategoriesCards'
import Footer from '../Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getCourses } from '../features/CourseSlice'
import jwtDecode from 'jwt-decode'



function HomePage() {

    const dispatch = useDispatch()
    const course = useSelector((state) => state.courses)

    useEffect(() => {
        const handleToken = async () => {
            if (localStorage.getItem('authToken')) {
                const access = jwtDecode(localStorage.getItem('authToken'))
                if (access.user_id) {
                    await dispatch(getCourses(access.user_id))
                    await dispatch(getCategories())
                }
            } else {
                await dispatch(getCourses(''))
                await dispatch(getCategories())
            }
        }
        handleToken()
    }, [])


    return (
        <>
            {
                !course.isLoading ?
                    <>
                        <div className='h-full'>
                            <div className=' z-0 lg:block xs:hidden'>
                                <Carousal />
                            </div>
                            {
                                !course.isLoading && course?.data.length >= 1 ?
                                    <>
                                        <div className='mt-4 h-[400px] mx-[30px] relative z-10 lg:bottom-12'>
                                            <h1 className='text-2xl ms-2 font-bold text-[#3D3D3D] '>Popular Courses </h1>
                                            <div className='h-[300px] flex carousel carousel-center rounded-box bg-white relative top-5  overflow-x-auto overflow-y-hidden' style={{ maxWidth: '100%' }}>
                                                {
                                                    [...course.data].reverse()?.map((item) => {
                                                        if (!item.unlist_course) {
                                                            return (
                                                                <CoursesCards key={item.id} item={item} top={3} />
                                                            )
                                                        }
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </> : null
                            }

                            {
                                course && course.category.length >= 1 ?
                                    <>
                                        <div className='mx-[30px] lg:bottom-14 relative'>
                                            <h1 className='text-2xl font-bold text-[#3D3D3D] '>Top Categories</h1>
                                            <div className='grid lg:grid-cols-4 md:grid-cols-3 justify-center sm:grid-cols-2 gap-20 my-8'>
                                                {
                                                    course.category.map((item) => {
                                                        return (
                                                            <CategoriesCards key={item.id} item={item} />
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </> : null
                            }
                            <div>
                                <Footer />
                            </div>
                        </div>
                    </> : null
            }
        </>
    )
}

export default HomePage
