import React from 'react'
import Footer from '../Components/Footer'

function AddCoursePage() {
  return (
    <div className='min-h-screen '>
      <div className='mx-[50px]'>
        <h1 className='mt-[50px] text-[#3D3D3D] text-2xl font-bold'>ADD COURSE</h1>
        <div className='bg-white rounded-xl min-h-[340px] mt-[50px] grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1'>
          <div className='my-5 mx-10'>
            <div className='bg-[#D9D9D9]  h-[210px] rounded-lg'>

            </div>
            <div className='bg-[#D9D9D9] h-[50px] my-5 rounded-lg'>

            </div>
          </div>
          <div className='my-5 mx-10'>
            <div className='bg-[#D9D9D9] h-[50px] mb-5 rounded-lg'>

            </div>
            <div className='bg-[#D9D9D9] h-[210px] rounded-lg'>
              <p className='mx-5 relative top-3'>Description....</p>
            </div>
          </div>
          <div className='my-5 mx-10'>
            <div className='bg-[#D9D9D9] h-[50px] mb-5 rounded-lg flex'>
              <div className='bg-white rounded-xl w-full h-[30px] my-auto mx-2'>
                <h1></h1>
              </div>
              <div className='bg-white rounded-xl w-full h-[30px] my-auto mx-2'>
                <h1></h1>
              </div>
            </div>
            <div className='bg-[#D9D9D9] h-[90px] rounded-lg mb-4'>
              <p className='mx-5 relative top-3'>What you'll learn....</p>
            </div>
            <div className='bg-[#D9D9D9] h-[100px] rounded-lg'>
              <p className='mx-5 relative top-3'>Prior Requirements....</p>
            </div>
          </div>
        </div>

        <div className='bg-[#403F3F] mt-10 w-full h-[350px]'>

        </div>

        <div className='my-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:gap-x-10 xs:gap-y-10 h-[270px]'>
          <div className='bg-white h-full'>
            <h1></h1>
          </div>
          <div className='bg-white h-full'>
            <h1></h1>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default AddCoursePage
