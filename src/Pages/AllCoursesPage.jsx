import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../features/CourseSlice'
import MyCoursesCard from '../Components/MyCoursesCard'

function AllCoursesPage() {

  const dispatch = useDispatch()
  const all = useSelector((state) => state.courses)

  useEffect(() => {
    dispatch(getCourses())
  }, [])

  return (
    <div className='min-h-screen'>
      <div className=' h-[40px] grid items-center justify-end mt-10 me-10'>
        <div className="drawer z-50 relative">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-sm btn-outline btn-neutral drawer-button">Filter</label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <div className='flex justify-center my-3'>
                <h1 className='font-bold text-[#3D3D3D] text-xl'>Filter Item By: </h1>
              </div>
              <li>
                <select className="select w-full max-w-xs bg-[#F2F2F2]">
                  <option disabled selected>Price</option>
                  <option>Low to high</option>
                  <option>High to low</option>
                </select>
              </li>
              <li>
                <select className="select w-full max-w-xs bg-[#F2F2F2]">
                  <option disabled selected>Category</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </li>
              <li>
                <select className="select w-full max-w-xs bg-[#F2F2F2]">
                  <option disabled selected>Course Length</option>
                  <option>1hr</option>
                  <option>2hr</option>
                  <option>3hr</option>
                </select>
              </li>
            </ul>
          </div>
        </div>

      </div>
      {
        all && all.data.length >= 1 ?
          <div className='mx-[50px] mt-10 grid grid-cols-3 gap-x-4'>
            {
              all.data.map((item) => {
                return (
                  <MyCoursesCard key={item.id} item={item} />
                )
              })
            }
          </div> : null
      }
    </div>
  )
}

export default AllCoursesPage
