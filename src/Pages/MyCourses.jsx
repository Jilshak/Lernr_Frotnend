import React, { useEffect } from 'react'
import MyCoursesCard from '../Components/MyCoursesCard'
import { useDispatch, useSelector } from 'react-redux'
import { myCourses } from '../features/CourseSlice'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'

function MyCourses() {

    const token = localStorage.getItem('authToken')
    const access = jwtDecode(token)

    const dispatch = useDispatch()
    const course = useSelector((state) => state.courses)

    useEffect(() => {
        dispatch(myCourses(access.user_id))
    }, [])

    return (
        <div className='min-h-screen'>
            <div className='flex text-2xl items-center justify-center font-bold text-[#4D4848] mt-5'>
                <h1>MY COURSES</h1>
            </div>
            {
                course && course.mycourses.length >= 1 ?
                    <>
                        <div className='grid lg:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 mx-[100px] relative top-10'>
                            {
                                course.mycourses.map((item) => {
                                    return (
                                        <Link to={`/course_analytics/${item.id}`}>
                                            <MyCoursesCard item={item} />
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </> : null
            }
        </div>
    )
}

export default MyCourses
