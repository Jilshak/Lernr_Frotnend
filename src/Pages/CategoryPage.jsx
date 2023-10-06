import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryCourse, getCategories, getCategoryName } from '../features/CourseSlice';
import { Link, useParams } from 'react-router-dom';
import MyCoursesCard from '../Components/MyCoursesCard';
import nothing from '../Images/nothing1.png'

function CategoryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.courses);

  const [categories, setCategories] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState([]);

  useEffect(() => {
    Promise.resolve(dispatch(getCategories()))
    Promise.resolve(dispatch(categoryCourse(id)))
    dispatch(getCategoryName(id))
  }, [dispatch, id]);

  useEffect(() => {
    if (data.categoryCourse.length >= 1) {
      Promise.resolve(setCategories(data.categoryCourse))
      Promise.resolve(setCategoryTitle(categories?.filter((item) => item.id == id)))
    }
  }, [data.categoryCourse, id]);

  return (
    <div className='min-h-[90vh] relative'>
      {
        !data.isLoading && data.categoryCourse.length >= 1 && categoryTitle ?
          <>
            <div className='flex items-center justify-start mx-[40px] mt-10'>
              <h1 className='text-2xl font-bold text-[#3D3D3D]'>{data.categoryTitle}</h1>
            </div>
            <div className='mx-[40px] mt-10 gap-x-6  h-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1'>
              {data?.categoryCourse?.map((item) => (
                <Link to={`/coursepage/${item.id}`} key={item.id}>
                  <MyCoursesCard item={item} />
                </Link>
              ))}
            </div>
          </> :
          <div className='h-full w-full flex items-center justify-center'>
            <img src={nothing} alt="" />
          </div>
      }
    </div>
  );
}

export default CategoryPage;
