import React, { useEffect } from 'react'
import Barchart from '../../Components/ChartComponents/Barchart'
import LineChart from '../../Components/ChartComponents/LineChart'
import SalesChart from '../../Components/ChartComponents/SalesChart'
import ProfitChart from '../../Components/ChartComponents/ProfitChart'
import { useDispatch, useSelector } from 'react-redux'
import { NoOfCourses, NoOfInstructors, NoOfSales, NoOfUsers, Profit } from '../../features/ChartSlice'


function AdminDashboard() {

    const dispatch = useDispatch()

    const chart = useSelector((state) => state.chart)

    useEffect(() => {
        dispatch(NoOfUsers())
        dispatch(NoOfInstructors())
        dispatch(NoOfCourses())
        dispatch(NoOfSales())
        dispatch(Profit())
    }, [])

    return (
        <div className='min-h-screen'>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-5 xs:gap-y-5 mx-[30px] gap-x-14 mt-10 min-h-[370px]'>
                {
                    !chart.isLoading && chart.data ?
                        <>
                            <div className='bg-white rounded-lg'>
                                <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Users Chart</h1>
                                <Barchart title={'Users'} count={chart.data} />
                            </div>
                        </> : null
                }
                {
                    !chart.isLoading && chart.instructors ?
                        <>
                            <div className='bg-white rounded-lg'>
                                <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Instructors Chart</h1>
                                <Barchart title={'Instructors'} count={chart.instructors} />
                            </div>
                        </> : null
                }
            </div>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-5 xs:gap-y-5 mx-[30px] gap-x-14 mt-10 min-h-[370px]'>
                {
                    !chart.isLoading && chart.course ?
                        <>
                            {
                                console.log("This is the chart course: ", chart.course)
                            }
                            <div className='bg-white rounded-lg'>
                                <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Courses</h1>
                                <LineChart title={'Courses Created'} count={chart.course} />
                            </div>
                        </> : null
                }
                {
                    !chart.isLoading && chart.sales ?
                        <>
                            <div className='bg-white rounded-lg'>
                                <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Sales Chart</h1>
                                <SalesChart title={'Sales'} count={chart.sales} />
                            </div>
                        </> : null
                }
            </div>
            <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 sm:gap-y-5 xs:gap-y-5 mx-[30px] gap-x-14 mt-10 min-h-[370px]'>
                {
                    !chart.isLoading && chart.profit ?
                        <>
                            <div className='bg-white rounded-lg'>
                                <h1 className='text-xl font-bold text-[#4D4848] ms-10 my-4'>Profit</h1>
                                <ProfitChart title={'Profit'} count={chart.profit}/>
                            </div>
                        </> : null
                }
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
