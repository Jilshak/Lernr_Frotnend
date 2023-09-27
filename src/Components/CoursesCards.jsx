import React from 'react'
import image1 from '../Images/image1.avif'
import { Link } from 'react-router-dom'

function CoursesCards(props) {
    const {item} = props
    return (
        <Link to={`/coursepage/${item?.id}`}>
            <div className='relative my-6 mx-7 group cursor-pointer carousal-item '>
                <div className='relative h-[180px] transition-transform transform scale-100 group-hover:scale-105'>
                    <img className='h-full w-full object-cover min-w-[230px]' src={item?.thumbnail ? item?.thumbnail : image1} alt="" />
                </div>
                <h1 className='font-bold text-md'>{item?.title}</h1>
                <div className='relative bottom-2'>
                    <small className='text-xs'>{item?.course_by?.username}</small><br />
                    <div className="rating rating-xs relative bottom-2">
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                    </div>
                    <small className='text-xs relative bottom-2.5 ms-1'>
                        ({item?.no_of_reviews ? item?.no_of_reviews : 0})
                    </small>
                    <br />
                    <div className='flex'>
                        <p className='font-semibold relative bottom-3'>₹ {item?.price}</p>
                        <p className='font-semibold text-sm relative bottom-2.5 ms-3 line-through'>(₹ 543)</p>
                    </div>
                </div>
            </div>
        </Link>


    )
}

export default CoursesCards
