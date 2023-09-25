import React from 'react'

function AdminDashboard() {
    return (
        <div className='min-h-screen'>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-5 xs:gap-y-5 mx-[30px] gap-x-14 mt-10 min-h-[370px]'>
                <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Users Chart</h1>
                </div>
                <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Instructors Chart</h1>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1  gap-x-14 mt-10 xs:gap-y-5'>
                <div>
                    <div className='grid items-center  justify-center'>
                        <h1 className='mx-auto my-5 font-bold text-xl text-[#4D4848]'>Users Gained In last Month</h1>
                        <div className='rounded-full bg-white h-[280px] w-[280px]'>

                        </div>
                    </div>
                </div>
                <div>
                    <div className='grid items-center  justify-center'>
                        <h1 className='mx-auto my-5 font-bold text-xl text-[#4D4848]'>Users Lost In last Month</h1>
                        <div className='rounded-full bg-white h-[280px] w-[280px]'>

                        </div>
                    </div>
                </div>
                <div>
                    <div className='grid items-center  justify-center'>
                        <h1 className='mx-auto my-5 font-bold text-xl text-[#4D4848]'>Inactive Users In last Month</h1>
                        <div className='rounded-full bg-white h-[280px] w-[280px]'>

                        </div>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1  gap-x-14 mt-10 xs:gap-y-5'>
                <div>
                    <div className='grid items-center  justify-center'>
                        <h1 className='mx-auto my-5 font-bold text-xl text-[#4D4848]'>Instructors Gained In last Month</h1>
                        <div className='rounded-full bg-white h-[280px] w-[280px]'>

                        </div>
                    </div>
                </div>
                <div>
                    <div className='grid items-center  justify-center'>
                        <h1 className='mx-auto my-5 font-bold text-xl text-[#4D4848]'>Instructors Lost In last Month</h1>
                        <div className='rounded-full bg-white h-[280px] w-[280px]'>

                        </div>
                    </div>
                </div>
                <div>
                    <div className='grid items-center  justify-center'>
                        <h1 className='mx-auto my-5 font-bold text-xl text-[#4D4848]'>Inactive Instructors last Month</h1>
                        <div className='rounded-full bg-white h-[280px] w-[280px]'>

                        </div>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-5 xs:gap-y-5 mx-[30px] gap-x-14 mt-10 min-h-[370px]'>
                <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Courses</h1>
                </div>
                <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Courses Uploaded last Month</h1>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
