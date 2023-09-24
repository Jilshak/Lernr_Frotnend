import React from 'react'
import image1 from '../Images/image1.avif'
import { Link } from 'react-router-dom'

function CoursesCards() {
    return (
        <Link to='/coursepage'>
            <div className='relative my-6 mx-7 group cursor-pointer carousal-item '>
                <div className='relative h-[180px] transition-transform transform scale-100 group-hover:scale-105'>
                    <img className='h-full w-full object-cover min-w-[230px]' src={image1} alt="" />
                </div>
                <h1 className='font-bold text-md'>Python for Beginners</h1>
                <div className='relative bottom-2'>
                    <small className='text-sm'>creator</small><br />
                    <div className="rating rating-xs relative bottom-2">
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                    </div>
                    <small className='text-xs relative bottom-2.5 ms-1'>
                        (3213)
                    </small>
                    <br />
                    <div className='flex'>
                        <p className='font-semibold relative bottom-3'>₹ 543</p>
                        <p className='font-semibold text-sm relative bottom-2.5 ms-3 line-through'>(₹ 543)</p>
                    </div>
                </div>
            </div>
        </Link>


    )
}

export default CoursesCards
