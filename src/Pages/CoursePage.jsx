import React from 'react'
import Navbar from '../Components/Navbar'
import Reviews from '../Components/Reviews'
import Footer from '../Components/Footer'

function CoursePage() {
    return (
        <>
            <div className='lg:mx-[70px] md:mx-[70px] sm:mx-[70px] xs:mx-[30px] my-[50px] h-full'>
                <div className='grid grid-cols-7 gap-0 h-full w-full'>
                    {/* first row */}
                    <div className='lg:col-span-2 xs:col-span-7 lg:mx-3 xs:mx-[70px] mx-3 my-3 bg-white shadow-xl h-[250px]'>
                        <h1>Image</h1>
                    </div>
                    <div className='lg:col-span-5 xs:col-span-7 lg:mx-3 my-3 bg-white shadow-xl h-[250px] w-full'>
                        <h1>Description</h1>
                    </div>
                    {/* second row */}
                    <div className='lg:col-span-4 xs:col-span-7 lg:mx-3 my-3 bg-white shadow-xl h-[270px] xs:w-full lg:w-auto'>
                        <h1>What you'll learn</h1>
                    </div>
                    <div className='lg:col-span-3 xs:col-span-7 lg:mx-3 my-3 bg-white shadow-xl h-[270px] w-full'>
                        <h1>Prior requirements</h1>
                    </div>
                    {/* third row */}
                    <div className='col-span-7 lg:mx-3 my-3 bg-white shadow-xl lg:h-[300px] sm:h-[680px] xs:h-[680px] w-full '>
                        <div className='grid grid-cols-8 gap-x-10 lg:mt-0 xs:mt-5 mx-10'>
                            <div className='lg:col-span-2 sm:col-span-8 xs:col-span-8 h-[250px] my-5 lg:mx-0 sm:mx-[50px] xs:mx-[50px] rounded-lg bg-[#D9D9D9]'>
                                <div className='flex flex-col items-center justify-center my-5'>
                                    <div className='rounded-full h-[70px] w-[70px] bg-white'></div>
                                    <h1 className='mt-1 font-semibold'>Jilshak</h1>
                                    <h1>4.9 Instructor rating</h1>
                                    <h1>73462 reviewes</h1>
                                </div>
                            </div>
                            <div className='lg:col-span-6 sm:col-span-8 xs:col-span-8 h-[250px] my-5 bg-[#D9D9D9]'>
                                <div className='mx-5 my-3'>
                                    <h1 className='text-xl font-semibold'>Description</h1>
                                    <div className='mt-2 overflow-auto max-h-[200px] object-contain'>
                                        <p className='object-contain'>
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                                            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                                            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
                                            Aldus PageMaker including versions of Lorem Ipsum.
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
        </>

    )
}

export default CoursePage
