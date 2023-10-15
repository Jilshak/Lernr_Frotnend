import React, { useEffect, useState } from 'react'
import Reviews from '../Components/Reviews'
import Footer from '../Components/Footer'
import image1 from '../Images/image1.avif'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addToCart, addtoCartCount, alreadyBoughtCourse, individualCourse, toggleButton } from '../features/CourseSlice'
import Rating from '../Components/Rating'
import jwtDecode from 'jwt-decode'
import ReviewRating from '../Components/ReviewRating'
import api from '../services/Axios'
import { getReview } from '../features/ReviewSlice'
import Swal from 'sweetalert2'

function CoursePage() {

    const { id } = useParams()

    const navigate = useNavigate()


    const dispatch = useDispatch()
    const courseDetails = useSelector((state) => state.courses)
    const review = useSelector((state) => state.reviews)

    const [reviews, setReviews] = useState()

    useEffect(() => {
        console.log("First console log")
        const fetchData = async () => {
            console.log("Its entering the fetchData function")
            await dispatch(individualCourse(id));
            await dispatch(getReview(id));
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log("seond console log")
        const handleReviews = () => {
            console.log("Its entering the handleReview function")
            if (review.data.length >= 1) {
                setReviews(review.data);
            }
        };
        handleReviews();
    }, [review.data]);

    useEffect(() => {
        console.log("third console log")
        const handleToken = async () => {
            console.log("Its entering the handleToken function")
            if (localStorage.getItem('authToken')) {
                const access = await jwtDecode(localStorage.getItem('authToken'));
                const credentials = {
                    user: parseInt(access.user_id),
                    course_id: parseInt(id),
                };
                await dispatch(alreadyBoughtCourse(credentials));
            }
        };
        handleToken();
    }, [id]);

    const [toCart, setToCart] = useState(false)

    const handleAddToCart = async () => {
        try {
            if (localStorage.getItem('authToken')) {
                const access = await jwtDecode(localStorage.getItem('authToken'));
                const credential = {
                    user: access.user_id,
                    on_course: id
                }
                if (!toCart) {
                    await dispatch(addToCart(credential))
                    await dispatch(addtoCartCount())
                    setToCart(true)
                } else {
                    await Swal.fire(
                        {
                            background: '#fff',
                            icon: 'error',
                            title: 'Already have this item!',
                            text: "It seems you alredy added this item to your cart before!!",
                        }
                    )
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const handleBuyCourse = async () => {
        try {
            const access = jwtDecode(localStorage.getItem('authToken'))
            if (access.user_id) {
                const request = await api.post(`payments/stripe/`, { course_id: id })
                const response = request.data
                if (request.status == 200) {
                    console.log(response)
                    await navigate(`/stripe/${response.pi}/${id}`)
                } else {
                    console.log("Something went wrong while doing the request")
                }
            } else {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'warning',
                        title: 'Logged Out!',
                        text: "It seems you are logged out please login to continue!!",
                    }
                )
                await navigate('/login')
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }


    return (
        <>
            {
                !courseDetails?.isLoading ?
                    <>
                        <div className='lg:mx-[70px] md:mx-[70px] sm:mx-[70px] xs:mx-[30px] my-[50px] h-full'>
                            {
                                courseDetails?.toggle ?
                                    <div className='absolute h-1/2 lg:left-80 md:left-40 sm:left-40 xs:left-32 top-52 flex items-center justify-center w-1/2 z-30 '>
                                        <ReviewRating id={id} />
                                    </div> : null
                            }
                            <div className='grid grid-cols-7 gap-0 h-full w-full'>
                                {/* first row */}
                                <div className='lg:col-span-2 xs:col-span-7 lg:mx-3 xs:mx-[70px] mx-3 my-3 bg-white shadow-xl h-[250px]'>
                                    <div
                                        className='h-[250px] bg-center bg-cover'
                                        style={{
                                            backgroundImage: `url('${courseDetails?.mycourses?.course?.thumbnail ? courseDetails?.mycourses?.course?.thumbnail : image1}')`
                                        }}
                                    ></div>
                                </div>



                                <div className='lg:col-span-5 xs:col-span-7 lg:mx-3 my-3 bg-white shadow-xl h-[250px] w-full'>
                                    <h1 className='my-3 text-lg font-semibold text-[#3D3D3D] mx-3'>{courseDetails?.mycourses?.course?.title}</h1>
                                    <div className='mb-3 mx-3 text-sm text-[#3D3D3D] max-h-[40px] overflow-hidden'>{courseDetails?.mycourses.course?.description}</div>
                                    <div className='mx-3 flex items-center'>
                                        <p className='relative bottom-1.5 mx-1 text-[#3D3D3D]'>{courseDetails?.mycourses?.course?.rating}</p>
                                        <Rating rating={courseDetails?.mycourses?.course?.rating} bottom={1} />
                                        <p className='relative bottom-1.5 mx-2 text-[#3D3D3D]'>({courseDetails?.mycourses?.course?.no_of_reviews})</p>
                                        <p className='relative bottom-1.5 mx-2 text-[#3D3D3D]'>{courseDetails?.mycourses?.course?.students}</p>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-[#3D3D3D] mb-3 mx-3 text-xs'>Created By</p>
                                        <p className='mb-3 mx-3 text-xs relative text-blue-600 right-5'>{courseDetails?.mycourses?.username}</p>
                                    </div>
                                    <div className='flex relative bottom-2'>
                                        <p className='text-[#3D3D3D] mb-3 mx-3 text-xs'>Course Length:</p>
                                        <p className='mb-3 mx-3 text-xs relative text-blue-600 right-5'>{courseDetails?.mycourses?.course?.course_length} hr</p>
                                    </div>
                                    <div className='flex relative '>
                                        {
                                            !courseDetails?.isLoading && courseDetails?.alreadybought == false || localStorage.getItem('guestToken') ?
                                                <>
                                                    <button onClick={handleBuyCourse} className="min-h-[40px] mx-3 w-[260px] font-semibold rounded-lg bg-[#A435F0] text-white">BUY THIS COURSE</button>
                                                    <button onClick={handleAddToCart} className="min-h-[40px] mx-3 w-[190px] font-semibold rounded-lg bg-[#D6BF45] text-white">ADD TO CART</button>
                                                </>
                                                :
                                                <div>
                                                    <button onClick={(e) => dispatch(toggleButton())} className="min-h-[40px] mx-3 w-[260px] font-semibold rounded-lg bg-[#A435F0] text-white">LEAVE A REVIEW</button>
                                                    <Link to={`/enrolled/`}>
                                                        <button className="min-h-[40px] mx-3 w-[260px] font-semibold rounded-lg bg-[#ebbe37] text-white">Go To Enrolled</button>
                                                    </Link>
                                                </div>
                                        }
                                    </div>

                                </div>
                                {/* second row */}
                                <div className='lg:col-span-4 xs:col-span-7 lg:mx-3 my-3 bg-white shadow-xl h-[270px] xs:w-full lg:w-auto'>
                                    <div className='grid items-center justify-start'>
                                        <h1 className='text-xl font-semibold text-[#3D3D3D] my-3 mx-3'>What you'll learn</h1>
                                        <div className='mt-2 overflow-auto mx-3 max-h-[200px] object-contain'>
                                            <p className='object-contain'>
                                                {courseDetails?.mycourses?.course?.what_you_learn}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='lg:col-span-3 xs:col-span-7 lg:mx-3 my-3 bg-white shadow-xl h-[270px] w-full'>
                                    <div className='flex items-center justify-start mx-3'>
                                        <h1 className='text-xl font-semibold my-3 text-[#3D3D3D]'>Prior Requirements</h1>
                                    </div>
                                    {
                                        courseDetails?.mycourses?.course?.requirements !== '' ?
                                            <>
                                                <h1 className='mx-3'>{courseDetails?.mycourses?.course?.requirements}</h1>
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
                                            <div className='flex items-center justify-center relative top-7'>
                                                <h1 className='absolute text-lg font-bold mx-5 my-2 underline'>COURSE BY </h1>
                                            </div>
                                            <div className='flex flex-col h-full items-center justify-center'>
                                                <img className='rounded-full h-[100px] w-[100px]' src={courseDetails?.mycourses?.image} alt="" />
                                                <h1 className='mt-1 text-lg font-semibold'>{courseDetails?.mycourses?.username}</h1>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-6 sm:col-span-8 xs:col-span-8 h-[250px] my-5 bg-[#D9D9D9]'>
                                            <div className='mx-5 my-3'>
                                                <h1 className='text-xl font-semibold'>Description</h1>
                                                <div className='mt-2 overflow-auto max-h-[200px] object-contain'>
                                                    <p className='object-contain'>
                                                        {courseDetails?.mycourses?.course?.description}
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
                                        <div className='flex  carousel carousel-center rounded-box overflow-y-auto'>
                                            {
                                                !review?.isLoading && review?.data?.length >= 1 ?
                                                    <>
                                                        {
                                                            reviews?.map((item) => {
                                                                return (
                                                                    <div key={item.id} className='min-w-[300px]'>
                                                                        <Reviews item={item} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </> : null
                                            }
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
