import React, { useEffect } from 'react'
import PDFGenerator from '../Components/PDFGenerator'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { individualCourse } from '../features/CourseSlice'
import { getMyProfile } from '../features/UserSlice'

function CertificatePage() {
    const { id, user } = useParams()

    const dispatch = useDispatch()
    const course_details = useSelector((state) => state.courses)
    const user_details = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(individualCourse(id))
        dispatch(getMyProfile(user))
    }, [])

    return (
        <div className='min-h-[91vh] flex items-center justify-center'>
            <div className='relative top-10'>
                {
                    course_details.mycourses && user_details.profile ?
                        <PDFGenerator details={course_details.mycourses} user={user_details.profile} /> :
                        <h1>loading....</h1>
                }
            </div>
        </div>
    )
}


export default CertificatePage
