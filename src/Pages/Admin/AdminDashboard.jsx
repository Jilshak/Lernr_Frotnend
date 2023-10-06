import React from 'react'
import Barchart from '../../Components/ChartComponents/Barchart'
import DoughnutChart from '../../Components/ChartComponents/DoughnutChart'
import LineChart from '../../Components/ChartComponents/LineChart'
import SalesChart from '../../Components/ChartComponents/SalesChart'
import ProfitChart from '../../Components/ChartComponents/ProfitChart'

function AdminDashboard() {
    return (
        <div className='min-h-screen'>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-5 xs:gap-y-5 mx-[30px] gap-x-14 mt-10 min-h-[370px]'>
                <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Users Chart</h1>
                    <Barchart title={'Users'} />
                </div>
                <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Instructors Chart</h1>
                    <Barchart title={'Instructors'} />
                </div>
            </div>

            {/* <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1  gap-x-14 mt-10 xs:gap-y-5'>
                <div>
                    <div className='grid items-center  justify-center'>
                        <h1 className='mx-auto my-5 font-bold text-xl text-[#4D4848]'>Sales Chart</h1>
                        <div className='rounded-full bg-white h-[280px] w-[280px]'>

                        </div>
                    </div>
                </div>
                <div>
                    <div className='grid items-center  justify-center'>
                        <h1 className='mx-auto my-5 font-bold text-xl text-[#4D4848]'>Profit Chart</h1>
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
            </div> */}
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-5 xs:gap-y-5 mx-[30px] gap-x-14 mt-10 min-h-[370px]'>
                <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Courses</h1>
                    <LineChart title={'Courses Created'} />
                </div>
                <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Sales Chart</h1>
                    <SalesChart title={'Sales'} />
                </div>
            </div>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-5 xs:gap-y-5 mx-[30px] gap-x-14 mt-10 min-h-[370px]'>
                <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Profit</h1>
                    <ProfitChart title={'Profit'}/>
                </div>
                {/* <div className='bg-white rounded-lg'>
                    <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Sales Chart</h1>
                    <SalesChart title={'Sales'} />
                </div> */}
            </div>
            <div className='lg:h-[200px] md:h-[150px] sm:h-[100px] xs:h-[100px]'>

            </div>
        </div>
    )
}

export default AdminDashboard
