import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse, getCourses, relistCourse, unlistCourse } from '../../features/CourseSlice'
import nothing from '../../Images/nothing1.png'

function AdminCourses() {

    const dispatch = useDispatch()
    const course = useSelector((state) => state.courses)

    const [courses, setCourses] = useState()


    useEffect(() => {
        dispatch(getCourses())
    }, [])

    useEffect(() => {
        if (course.data.length >= 1) {
            setCourses(course.data)
        }
    }, [course.data])

    const [toggle, setToggle] = useState(false)

    const [courseDetails, setCourseDetails] = useState()

    const handleCourseDetails = async (details) => {
        await setCourseDetails(details)
        await setToggle(true)
    }


    const [find, setFind] = useState();
    const searchItem = async (e) => {
        if (!find) {
            setFind(courses);
        }
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm === '') {
            setCourses(find);
        } else {
            setCourses(await courses.filter((item) => {
                return item.title.toLowerCase().startsWith(searchTerm);
            }));
        }
    }

    //deleting the course
    const handleDelete = async (id) => {
        await dispatch(deleteCourse(id))
        await dispatch(getCourses())
        await setToggle(false)
        await setCourseDetails(null)
    }

    const handleUnlist = async (id) => {
        await dispatch(unlistCourse(id))
        await dispatch(getCourses())
        setToggle(false)
        setCourseDetails(null)
    }
    const handleRelist = async (id) => {
        await dispatch(relistCourse(id))
        await dispatch(getCourses())
        setToggle(false)
        setCourseDetails(null)
    }

    return (
        <div className='min-h-screen mx-[50px] '>
            <div className='grid lg:grid-cols-9 w-full gap-10 mt-10'>
                <div className='lg:col-span-3 xs:col-span-1 rounded-xl bg-white min-h-[450px]'>
                    <div className='mx-12 relative min-h-[500px]'>
                        <div className='relative mx-5 mt-5'>
                            <input onChange={(e) => searchItem(e)} type="text" placeholder="Search..." className="input input-sm input-bordered w-full relative" />
                        </div>
                        <div>
                            {
                                !course.isLoading && course.data.length >= 1 ?
                                    <>
                                        <ul className='mx-5 mt-3 max-h-[430px] overflow-y-auto scrollbar-none'>
                                            {
                                                courses?.map((item) => {
                                                    return (
                                                        <li key={item.id} onClick={(e) => handleCourseDetails(item)} className='flex cursor-pointer items-center p-2 w-full my-5 rounded-lg bg-[#e8e8e8] hover:bg-[#bec0c2]'>
                                                            <h1>{item.title}</h1>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </> :
                                    <div class="flex justify-center relative top-44  h-screen">
                                        <div class="rounded-full h-12 w-12 bg-blue-400 animate-ping"></div>
                                    </div>
                            }
                        </div>

                    </div>
                </div>

                {
                    !toggle ?
                        <>
                            <div className='lg:col-span-6  xs:col-span-1 bg-white w-full rounded-xl relative  h-[500px] grid items-center justify-center my-auto'>
                                <img className='h-[380px] opacity-60 mx-auto' src={nothing} alt="" />
                                <h1 className='font-bold text-2xl relative bottom-32 mt-8 mx-auto text-[#B2B2B2] opacity-60'>SELECT A COURSE</h1>
                            </div>
                        </> :
                        <div className='lg:col-span-6 md:col-span-6 sm:col-span-1  xs:col-span-1 bg-white w-full rounded-xl lg:h-[520px] md:h-[520px] sm:h-[520px]  xs:h-[800px] lg:min-h-[520px]  relative '>
                            <div className='w-full flex justify-end relative right-3 top-2'>
                                <button onClick={() => setToggle(false)} className="btn btn-sm btn-circle btn-outline">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div className='relative lg:h-[200px]'>
                                <h1 className='font-semibold text-xl mx-5 relative left-5 '>COURSE DETAILS</h1>
                                <div className='grid lg:grid-cols-6 md:grid-cols-6 relative top-10 sm:grid-cols-1 xs:grid-cols-1 gap-x-32 gap-y-10 h-full mx-[50px]'>
                                    <div className='lg:col-span-2 w-full lg:min-h-[200px]'>
                                        <img className='object-cover rounded-xl h-[200px]' src={courseDetails?.thumbnail} alt="" />
                                    </div>
                                    <div className='lg:col-span-4  lg:w-[600px]  rounded-xl relative lg:right-20 bg-[#ececec]'>
                                        <div className='mx-[20px] mt-3 '>
                                            <h1 className='text-lg font-semibold'>{courseDetails?.title}</h1>
                                            <span className='flex gap-x-2'>
                                                <p className='text-xs text-blue-300'>{courseDetails?.username}</p>
                                            </span>
                                            <p className='line-clamp-5'>
                                                {courseDetails?.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='mx-[50px] mt-14'>
                                    <div className='grid lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-1 xs:grid-cols-1 gap-x-3 lg:gap-y-0 xs:gap-y-5 '>
                                        <div className='bg-[#ececec] lg:col-span-4 flex items-center justify-center hover:shadow-md rounded-lg h-[50px]'>
                                            <h1 className='ms-3 font-semibold flex gap-x-3 '>Students Enrolled In Course: <p className='text-blue-400 text-lg'>{courseDetails.students}</p> </h1>
                                        </div>
                                        <div className='bg-[#ececec] lg:col-span-4 flex items-center justify-center hover:shadow-md rounded-lg h-[50px]'>
                                            <h1 className='ms-3 font-semibold flex gap-x-3 '>Overall Rating of Course: <p className='text-blue-400 text-lg'>{courseDetails.rating}</p> </h1>
                                        </div>
                                        <div className='bg-[#ececec] lg:col-span-2  flex items-center justify-center hover:shadow-md rounded-lg h-[50px]'>
                                            <h1 className='ms-3 font-semibold  items-center flex gap-x-3 '>Reviews: <p className='text-blue-400 relative text-lg'>{courseDetails.no_of_reviews}</p> </h1>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='grid w-full absolute bottom-0'>
                                {
                                    courseDetails.students > 1 ?
                                        <>
                                            {
                                                !courseDetails.unlist_course ?
                                                    <>
                                                        <button onClick={(e) => handleUnlist(courseDetails.id)} className="btn rounded-none hover:bg-orange-300 w-full">UNLIST</button>
                                                    </>
                                                    :
                                                    <>
                                                         <button onClick={(e) => handleRelist(courseDetails.id)} className="btn rounded-none hover:bg-green-300 w-full">RELIST</button>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            <button onClick={(e) => handleDelete(courseDetails.id)} className="btn rounded-none w-full hover:bg-red-300">DELETE</button>
                                        </>
                                }
                            </div>
                        </div>
                }
            </div>

            <div className='mt-10 h-[80px]'>

            </div>
        </div>
    )
}

export default AdminCourses
