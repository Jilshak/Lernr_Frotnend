import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categoryCourse, getCategories } from '../features/CourseSlice'
import { Link, useParams } from 'react-router-dom'
import MyCoursesCard from '../Components/MyCoursesCard'

function CategoryPage() {

    const { id } = useParams()

    const dispatch = useDispatch()
    const data = useSelector((state) => state.courses)

    const [categoryTitle, setCategoryTitle] = useState()

    useEffect(() => {
        dispatch(categoryCourse(id))
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        if (data.category.length >= 1) {
            setCategoryTitle(data?.category.filter((item) => item.id == id))
        }
    }, [])

    return (
        <div className='min-h-screen'>
            {
                data && data.category.length >= 1 ?
                    <>
                        {
                            categoryTitle ?
                                <>
                                    <div className='flex items-center justify-start mx-[40px] mt-10'>
                                        <h1 className='text-2xl font-bold text-[#3D3D3D]'>{categoryTitle[0]?.title}</h1>
                                    </div>
                                </> : <h1>not yet loaded</h1>
                        }
                        <div className='mx-[40px] mt-10 gap-x-6  h-full grid grid-cols-2'>
                            {
                                data.category.map((item) => {
                                    return (
                                        <Link to={`/coursepage/${item.id}`}>
                                            <MyCoursesCard key={item.id} item={item} />
                                        </Link>
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
