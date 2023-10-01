import React, { useEffect } from 'react'
import Reviews from '../Components/Reviews'
import Footer from '../Components/Footer'
import image1 from '../Images/image1.avif'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart, alreadyBoughtCourse, buyCourse, individualCourse } from '../features/CourseSlice'
import Rating from '../Components/Rating'
import jwtDecode from 'jwt-decode'

function CoursePage() {

    const { id } = useParams()

    //to get the user id
    const token = localStorage.getItem('authToken')
    const access = jwtDecode(token)

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const courseDetails = useSelector((state) => state.courses)

    useEffect(() => {
        dispatch(individualCourse(id))
    }, [])

    useEffect(() => {
        const credentials = {
            user: parseInt(access.user_id),
            course_id: parseInt(id)
        }
        dispatch(alreadyBoughtCourse(credentials))
    }, [])

    const handleAddToCart = async () => {
        const credential = {
            user: access.user_id,
            on_course: id
        }
        await dispatch(addToCart(credential))
    }

    const handleBuyCourse = async () => {
        const credentials = {
            user: access.user_id,
            course_id: id
        }
        await dispatch(buyCourse(credentials))
        await navigate(`/enrolled`)
    }

    return (
        <>
            {
                !courseDetails.isLoading && courseDetails.mycourses.length >= 1 ?
                    <>
                        <div className='lg:mx-[70px] md:mx-[70px] sm:mx-[70px] xs:mx-[30px] my-[50px] h-full'>
                            <div className='grid grid-cols-7 gap-0 h-full w-full'>
                                {/* first row */}
                                <div className='lg:col-span-2 xs:col-span-7 lg:mx-3 xs:mx-[70px] mx-3 my-3 bg-white shadow-xl h-[250px]'>
                                    <div
                                        className='h-[250px] bg-center bg-cover'
                                        style={{
                                            backgroundImage: `url('${courseDetails?.mycourses[0]?.thumbnail ? courseDetails?.mycourses[0]?.thumbnail : image1}')`
                                        }}
                                    ></div>
                                </div>

                                <div className='lg:col-span-5 xs:col-span-7 lg:mx-3 my-3 bg-white shadow-xl h-[250px] w-full'>
                                    <h1 className='my-3 text-lg font-semibold text-[#3D3D3D] mx-3'>{courseDetails?.mycourses[0]?.title}</h1>
                                    <div className='mb-3 mx-3 text-sm text-[#3D3D3D] max-h-[40px] overflow-hidden'>{courseDetails?.mycourses[0]?.description}</div>
                                    <div className='mx-3 flex'>
                                        <p className='relative bottom-1.5 mx-1 text-[#3D3D3D]'>{courseDetails?.mycourses[0]?.rating}.0</p>
                                        <Rating />
                                        <p className='relative bottom-1.5 mx-2 text-[#3D3D3D]'>({courseDetails?.mycourses[0]?.no_of_reviews})</p>
                                        <p className='relative bottom-1.5 mx-2 text-[#3D3D3D]'>{courseDetails?.mycourses[0]?.students}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-[#3D3D3D] mb-3 mx-3 text-xs'>Created By</p>
                                        <p className='mb-3 mx-3 text-xs relative text-blue-600 right-5'>{courseDetails?.mycourses[0]?.course_by.username}</p>
                                    </div>
                                    <div className='flex relative bottom-2'>
                                        <p className='text-[#3D3D3D] mb-3 mx-3 text-xs'>Course Length:</p>
                                        <p className='mb-3 mx-3 text-xs relative text-blue-600 right-5'>{courseDetails.mycourses[0]?.course_length} hr</p>
                                    </div>
                                    <div className='flex relative '>
                                        {
                                            !courseDetails?.isLoading && courseDetails?.alreadybought == false ?
                                                <>
                                                    <button onClick={handleBuyCourse} className="min-h-[40px] mx-3 w-[260px] font-semibold rounded-lg bg-[#A435F0] text-white">BUY THIS COURSE</button>
                                                    <button onClick={handleAddToCart} className="min-h-[40px] mx-3 w-[190px] font-semibold rounded-lg bg-[#D6BF45] text-white">ADD TO CART</button>
                                                </>
                                                :
                                                <button className="min-h-[40px] mx-3 w-[260px] font-semibold rounded-lg bg-[#A435F0] text-white">LEAVE A REVIEW</button>
                                        }
                                    </div>

                                </div>
                                {/* second row */}
                                <div className='lg:col-span-4 xs:col-span-7 lg:mx-3 my-3 bg-white shadow-xl h-[270px] xs:w-full lg:w-auto'>
                                    <div className='flex items-center justify-start'>
                                        <h1 className='text-xl font-semibold text-[#3D3D3D] my-3 mx-3'>What you'll learn</h1>
                                    </div>
                                </div>
                                <div className='lg:col-span-3 xs:col-span-7 lg:mx-3 my-3 bg-white shadow-xl h-[270px] w-full'>
                                    <div className='flex items-center justify-start mx-3'>
                                        <h1 className='text-xl font-semibold my-3 text-[#3D3D3D]'>Prior Requirements</h1>
                                    </div>
                                    {
                                        courseDetails?.mycourses[0]?.requirements !== '' ?
                                            <>
                                                <h1>Prior requirements</h1>
                                            </> :
                                            <div className='w-full flex items-center justify-center h-full'>
                                                <span className='p-3 relative bottom-10 right-5 bg-[#b5b1b1] rounded-full text-[#fff] font-bold'>No Requirements</span>
                                            </div>
                                    }
                                </div>
                                {/* third row */}
                                <div className='col-span-7 lg:mx-3 my-3 bg-white shadow-xl lg:h-[300px] sm:h-[680px] xs:h-[680px] w-full '>
                                    <div className='grid grid-cols-8 gap-x-10 lg:mt-0 xs:mt-5 mx-10'>
                                        <div className='lg:col-span-2 sm:col-span-8 xs:col-span-8 h-[250px] my-5 lg:mx-0 sm:mx-[50px] xs:mx-[50px] rounded-lg bg-[#D9D9D9]'>
                                            <div className='flex flex-col items-center justify-center my-5'>
                                                <div className='rounded-full h-[70px] w-[70px] bg-white'></div>
                                                <h1 className='mt-1 font-semibold'>{courseDetails.mycourses[0]?.course_by?.username}</h1>
                                                <h1>4.9 Instructor rating</h1>
                                                <h1>73462 reviewes</h1>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-6 sm:col-span-8 xs:col-span-8 h-[250px] my-5 bg-[#D9D9D9]'>
                                            <div className='mx-5 my-3'>
                                                <h1 className='text-xl font-semibold'>Description</h1>
                                                <div className='mt-2 overflow-auto max-h-[200px] object-contain'>
                                                    <p className='object-contain'>
                                                        {courseDetails?.mycourses[0]?.description}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {/* fourth row */}
                                <div className='col-span-7 lg:mx-3 my-3 bg-white shadow-xl mt-5 h-[350px] w-full '>
                                    <div className='mx-3 my-3'>
                                        <h1 className='text-2xl font-semibold ms-5 text-[#3D3D3D]'>Ratings</h1>
                                        <div className='grid grid-flow-col lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 carousel carousel-center rounded-box'>
                                            <Reviews />
                                            <Reviews className="hidden xs:hidden" /> {/* Show one review on sm screens */}
                                            <Reviews className="hidden xs:hidden" /> {/* Show one review on sm screens */}
                                            <Reviews className="hidden xs:hidden" /> {/* Show one review on sm screens */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                            <Footer />
                        </div>
                    </> : null
            }
        </>

    )
}

export default CoursePage
