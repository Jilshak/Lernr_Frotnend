import React, { useEffect } from 'react'
import CommunityCard from '../Components/CommunityCard'
import { useDispatch, useSelector } from 'react-redux'
import { getBoughtCourses } from '../features/CourseSlice'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'


function CommunityPage() {

  const dispatch = useDispatch()
  const chats = useSelector((state) => state.courses)

  useEffect(() => {
    const access = jwtDecode(localStorage.getItem('authToken'))
    dispatch(getBoughtCourses(access.user_id))
  }, [])

  return (
    <div className='min-h-screen mx-[60px] '>
      <h1 className='relative top-8 my-5 font-bold text-2xl text-[#3D3D3D]'>COMMUNITIES</h1>
      <div className='flex items-center justify-center relative top-10'>
        <div className='bg-white rounded-lg min-h-[500px] shadow-2xl w-full'>
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 mx-[40px]'>
            {
              !chats.isLoading && chats?.bought.length >= 1 ?
                <>
                  {
                    chats?.bought.map((item) => {
                      return (
                        <Link to={`/chat/${item.id}`}>
                          <CommunityCard item={item} />
                        </Link>
                      )
                    })
                  }
                </> : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPage
