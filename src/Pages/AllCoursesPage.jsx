import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getCourses } from '../features/CourseSlice'
import MyCoursesCard from '../Components/MyCoursesCard'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import nothing from '../Images/nothing1.png'
import Footer from '../Components/Footer'


function AllCoursesPage() {

  const dispatch = useDispatch()
  const all = useSelector((state) => state.courses)
  const access = jwtDecode(localStorage.getItem('authToken'))



  useEffect(() => {
    dispatch(getCourses(access.user_id))
    dispatch(getCategories())
  }, [])

  const [course, setCourse] = useState()

  useEffect(() => {
    if (all.data.length >= 1) {
      setCourse(all.data)
    }
  }, [all.data])

  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [courseLengthFilter, setCourseLengthFilter] = useState('');

  const handleFilters = () => {
    let filteredCourses = [...course];
    if (priceFilter === '1') {
      filteredCourses.sort((a, b) => a.price - b.price);
    } else if (priceFilter === '2') {
      filteredCourses.sort((a, b) => b.price - a.price);
    }
    if (categoryFilter) {
      filteredCourses = filteredCourses.filter((item) => item.category == categoryFilter);
    }

    if (courseLengthFilter) {
      console.log(courseLengthFilter)
      filteredCourses = filteredCourses.filter((item) => parseFloat(item.course_length) < parseFloat(courseLengthFilter))
    }
    console.log(filteredCourses)
    setCourse(filteredCourses);
  };

  const handleReset = () => {
    setCourse(all.data)
    setPriceFilter('')
    setCategoryFilter('')
    setCourseLengthFilter('')
  }

  const [find, setFind] = useState();
  const searchItem = async (e) => {
    if (!find) {
      setFind(course);
    }
    if (e.target.value === '') {
      setCourse(find);
    } else {
      setCourse(await course.filter((item) => {
        return item.title.toLowerCase().startsWith(e.target.value.toLowerCase());
      }));
    }
  }

  return (
    <div className='min-h-screen'>
      <div className='flex items-center '>
        <span className='font-bold text-2xl relative left-14 top-[68px]'>All Courses</span>
        <input onChange={(e) => searchItem(e)} type="text" placeholder="Search for a course" className="input input-bordered w-full lg:block md:block sm:hidden xs:hidden max-w-sm ms-5 relative left-24 top-[68px] z-10" />
      </div>
      <div className='sm:hidden md:hidden lg:hidden xs:block my-10'>
        <input onChange={(e) => searchItem(e)} type="text" placeholder="Search for a course" className="input input-bordered w-full max-w-xs ms-5 relative left-10 top-[68px] z-10" />
      </div>
      <div className=' h-[40px] grid items-center justify-end my-5 relative lg:top-3 md:top-3 sm:top-3 xs:bottom-24 me-14'>
        <div className="drawer relative z-10">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-sm btn-outline btn-neutral drawer-button z-0">Filter</label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <div className='flex justify-center my-3'>
                <h1 className='font-bold text-[#3D3D3D] text-xl'>Filter Item By: </h1>
              </div>
              <li>
                <select onChange={(e) => setPriceFilter(e.target.value)} className="select w-full max-w-xs bg-[#F2F2F2]">
                  <option disabled selected>Price</option>
                  <option value={'1'}>Low to high</option>
                  <option value={'2'}>High to low</option>
                </select>
              </li>
              <li>
                <select onChange={(e) => setCategoryFilter(e.target.value)} className="select w-full max-w-xs bg-[#F2F2F2]">
                  <option disabled selected>Category</option>
                  {
                    all?.category.map((item) => {
                      return (
                        <option value={item.id}>{item.title}</option>
                      )
                    })
                  }
                </select>
              </li>
              <li>
                <select onChange={(e) => setCourseLengthFilter(e.target.value)} className="select w-full max-w-xs bg-[#F2F2F2]">
                  <option disabled selected>Course Length</option>
                  <option value={1}>&lt;1hr</option>
                  <option value={2}>&lt;2hr</option>
                  <option value={3}>&lt;3hr</option>
                  <option value={5}>&lt;5hr</option>
                  <option value={7}>&lt;7hr</option>
                  <option value={15}>&lt;15hr</option>
                </select>
              </li>
              <li className='grid grid-cols-2 items-center gap-2 justify-center mt-5'>
                <button onClick={handleFilters} className="btn btn-sm btn-outline ">Filter</button>
                <button onClick={handleReset} className={priceFilter || categoryFilter || courseLengthFilter ? `btn btn-sm btn-outline` : `btn btn-sm btn-outline btn-disabled`}>Reset</button>
              </li>
            </ul>
          </div>
        </div>

      </div>
      {
        !all.isLoading && all?.data.length >= 1 ?
          <div className='mx-[50px] mt-10 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-x-4'>
            {
              course?.map((item) => {
                if (!item.unlist_course) {
                  return (
                    <Link to={`/coursepage/${item.id}`}>
                      <MyCoursesCard key={item.id} item={item} />
                    </Link>
                  )
                }
              })
            }
          </div> :
          <div className='h-full w-full flex items-center justify-center'>
            <img src={nothing} alt="" />
          </div>
      }
      <Footer />
    </div>
  )
}

export default AllCoursesPage
