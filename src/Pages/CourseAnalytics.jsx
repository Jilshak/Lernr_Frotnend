import React, { useEffect } from 'react'
import Footer from '../Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { courseAnalyticsProfit, courseAnalyticsRating, courseAnalyticsReviews, courseAnalyticsStudents } from '../features/ChartSlice'
import { useParams } from 'react-router-dom'
import Barchart from '../Components/ChartComponents/Barchart'
import LineChart from '../Components/ChartComponents/LineChart'
import InstructorProfitChart from '../Components/ChartComponents/InstructorProfitChart'
import star from '../icons/star.png'

function CourseAnalytics() {

  const { id } = useParams()

  const dispatch = useDispatch()
  const analytics = useSelector((state) => state.chart)

  useEffect(() => {
    dispatch(courseAnalyticsStudents(id))
    dispatch(courseAnalyticsReviews(id))
    dispatch(courseAnalyticsProfit(id))
    dispatch(courseAnalyticsRating(id))
  }, [])

  return (
    <>
      <div className='min-h-screen mx-[50px]'>
        <div className='mt-10'>
          <h1 className='font-bold text-2xl text-[#4D4848] mx-5'>COURSE ANALYTICS</h1>
        </div>
        <div className='grid lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-1 xs:grid-cols-1 mt-10 xs:gap-5'>
          {
            !analytics.isLoading && analytics.ca_students ?
              <>
                <div className='lg:col-span-4 md:col-span-4  sm:col-span-1 xs:col-span-1 mx-5 bg-white h-[320px] shadow-2xl'>
                  <h1 className='font-semibold text-xl mx-4 my-2'>Students</h1>
                  <Barchart title={'Total No Of Students'} count={analytics.ca_students} />

                </div>
              </> : null
          }
          {
            !analytics.isLoading && analytics.ca_students ?
              <>
                <div className='lg:col-span-4 md:col-span-4  sm:col-span-1 xs:col-span-1 mx-5 bg-white h-[320px] shadow-2xl'>
                  <h1 className='font-semibold text-xl mx-4 my-2'>Reviews</h1>
                  <LineChart title={'Reviews'} count={analytics.ca_review} />
                </div>
              </> : null
          }

          <div className='lg:col-span-2 md:col-span-2 sm:col-span-1 xs:col-span-1 mx-5 grid gap-y-5 h-[320px] '>
            <div className='w-full bg-white shadow-2xl'>
              <h1 className='font-semibold text-lg mx-4 my-4'>Total Watch Time</h1>
            </div>
            {
              !analytics.isLoading ?
                <>
                  <div className='w-full bg-white shadow-2xl'>
                    <h1 className='font-semibold text-lg mx-4 my-4'>Rating</h1>
                    <div className='flex items-center justify-start relative mx-3'>
                      <img className='h-14 mx-4' src={star} alt="" />
                      <h1 className='font-bold text-2xl'>{analytics.rating}</h1>
                    </div>
                  </div>
                </> : null
            }
          </div>
        </div>
        <div className='mt-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 '>
          <div className='mx-4 bg-white col-span-1 shadow-2xl '>
            <h1 className='font-bold text-[#4D4848] text-xl mx-4 my-2'>Profit</h1>
            <InstructorProfitChart title={'Profit'} count={analytics.ca_profit} />
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
