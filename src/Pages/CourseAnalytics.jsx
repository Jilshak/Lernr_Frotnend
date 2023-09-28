import React from 'react'

function CourseAnalytics() {
  return (
    <div className='min-h-screen mx-[50px]'>
      <div className='mt-10'>
        <h1 className='font-bold text-2xl text-[#4D4848] mx-5'>COURSE ANALYTICS</h1>
      </div>
      <div className='grid lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-1 xs:grid-cols-1 mt-10 xs:gap-5'>
        <div className='lg:col-span-4 md:col-span-4  sm:col-span-1 xs:col-span-1 mx-5 bg-white h-[280px] shadow-2xl'>
          {/* Content for the first column */}
        </div>
        <div className='lg:col-span-4 md:col-span-4  sm:col-span-1 xs:col-span-1 mx-5 bg-white h-[280px] shadow-2xl'>
          {/* Content for the first column */}
        </div>
        
        <div className='lg:col-span-2 md:col-span-2 sm:col-span-1 xs:col-span-1 mx-5 grid gap-y-5 h-[280px] '>
          <div className='w-full bg-white shadow-2xl'></div>
          <div className='w-full bg-white shadow-2xl'></div>
        </div>
      </div>
      <div className='mt-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1'>
        <div className='mx-4 bg-white h-[280px] shadow-2xl'></div>
        <div className='mx-4 lg:mt-0 xs:mt-10 bg-white h-[280px] shadow-2xl'></div>
      </div>
    </div>
  )
}

export default CourseAnalytics
