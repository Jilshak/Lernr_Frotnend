import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryCourse, getCategories } from '../features/CourseSlice';
import { Link, useParams } from 'react-router-dom';
import MyCoursesCard from '../Components/MyCoursesCard';

function CategoryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.courses);

  const [categories, setCategories] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(categoryCourse(id));
    dispatch(getCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (data.category.length >= 1) {
      setCategories(data.category);
      setCategoryTitle(categories?.filter((item) => item.id == id));
      setIsLoading(false);
    }
  }, [data.category, id]);

  return (
    <div className='min-h-[85vh] relative'>
      {data.isLoading &&  isLoading ? (
        <div className='flex items-center h-screen justify-center text-black font-semibold text-2xl'>
          <span className='bg-[#979494] p-3 rounded-2xl'>
            <h1>Loading...</h1>
          </span>
        </div>
      ) : data && data.category.length >= 1 && categories && categoryTitle && !data.isLoading ? (
        <>
          <div className='flex items-center justify-start mx-[40px] mt-10'>
            <h1 className='text-2xl font-bold text-[#3D3D3D]'>{categoryTitle[0]?.title}</h1>
          </div>
          <div className='mx-[40px] mt-10 gap-x-6  h-full grid grid-cols-2'>
            {categories.map((item) => (
              <Link to={`/coursepage/${item.id}`} key={item.id}>
                <MyCoursesCard item={item} />
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className='flex items-center h-screen justify-center text-black font-semibold text-2xl'>
          <span className='bg-[#979494] p-3 rounded-2xl'>
            <h1>No Courses Available at the time</h1>
          </span>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
