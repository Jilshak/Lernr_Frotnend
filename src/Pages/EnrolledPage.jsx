import React, { useEffect, useState } from 'react'
import EnrolledCourses from '../Components/EnrolledCourses'
import { useDispatch, useSelector } from 'react-redux'
import { getBoughtCourses } from '../features/CourseSlice'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'

function EnrolledPage() {

    const dispatch = useDispatch()
    const course = useSelector((state) => state.courses)

    const [courses, setCourses] = useState([])

    useEffect(() => {
        if (course.bought.length >= 1) {
            setCourses(course.bought)
        }
    }, [course.bought])

    useEffect(() => {
        const access = jwtDecode(localStorage.getItem('authToken'))
        dispatch(getBoughtCourses(access.user_id))
    }, [])

    return (
        <div className='min-h-screen'>
            <div className='flex items-center justify-center text-2xl font-bold text-[#4D4848] my-10'>
                <h1>COURSES ENROLLED</h1>
            </div>
            <div className='grid justify-center'>
                <div className='mx-[90px]'>
                    {
                        !course.isLoading && course.bought.length >= 1 ?
                            <>
                                {
                                    [...courses].reverse().map((item) => {
                                        return (
                                            <div>
                                                <Link to={`/course_view/${item.id}`}>
                                                    <EnrolledCourses item={item} />
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default EnrolledPage
