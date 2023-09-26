import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categoryCourse } from '../features/CourseSlice'
import { useParams } from 'react-router-dom'
import MyCoursesCard from '../Components/MyCoursesCard'

function CategoryPage() {

    const { id } = useParams()

    const dispatch = useDispatch()
    const data = useSelector((state) => state.courses)

    useEffect(() => {
        dispatch(categoryCourse(id))
    }, [])

    return (
        <div className='min-h-screen'>
            {
                data && data.category.length >= 1 ?
                    <>
                        <div className='mx-[40px] mt-10 gap-x-6  h-full grid grid-cols-2'>
                            {
                                data.category.map((item) => {
                                    return (
                                        <MyCoursesCard key={item.id} item={item} />
                                    )
                                })
                            }
                        </div>
                    </> :
                    <div className='flex items-center h-screen justify-center text-black font-semibold text-2xl'>
                        <span className='bg-[#979494] p-3 rounded-2xl'>
                            <h1>No Courses Available at the time</h1>
                        </span>
                    </div>
            }
        </div>
    )
}

export default CategoryPage
