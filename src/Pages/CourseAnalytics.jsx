import React from 'react'
import Footer from '../Components/Footer'

function CourseAnalytics() {
  return (
    <>
      <div className='min-h-screen mx-[50px]'>
        <div className='mt-10'>
          <h1 className='font-bold text-2xl text-[#4D4848] mx-5'>COURSE ANALYTICS</h1>
        </div>
        <div className='grid lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-1 xs:grid-cols-1 mt-10 xs:gap-5'>
          <div className='lg:col-span-4 md:col-span-4  sm:col-span-1 xs:col-span-1 mx-5 bg-white h-[320px] shadow-2xl'>
            <h1 className='font-semibold text-xl mx-4 my-4'>Students</h1>
            
          </div>
          <div className='lg:col-span-4 md:col-span-4  sm:col-span-1 xs:col-span-1 mx-5 bg-white h-[320px] shadow-2xl'>
            <h1 className='font-semibold text-xl mx-4 my-4'>Reviews</h1>
          </div>

          <div className='lg:col-span-2 md:col-span-2 sm:col-span-1 xs:col-span-1 mx-5 grid gap-y-5 h-[320px] '>
            <div className='w-full bg-white shadow-2xl'>
              <h1 className='font-semibold text-lg mx-4 my-4'>Total Watch Time</h1>
            </div>
            <div className='w-full bg-white shadow-2xl'>
              <h1 className='font-semibold text-lg mx-4 my-4'>Rating</h1>
            </div>
          </div>
        </div>
        <div className='mt-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1'>
          <div className='mx-4 bg-white h-[320px] shadow-2xl'>
            <h1 className='font-bold text-[#4D4848] text-xl mx-4 my-4'>Annual Profit</h1>
          </div>
          <div className='mx-4 lg:mt-0 xs:mt-10 bg-white h-[320px] shadow-2xl'>
            <h1 className='font-bold text-[#4D4848] text-xl mx-4 my-4'>Monthly Profit</h1>
          </div>
        </div>
      </div>
      <div className='mt-14'>
        <Footer />
      </div>
    </>
  )
}

export default CourseAnalytics
