import React from 'react'
import image1 from '../Images/image1.avif'
import { Link } from 'react-router-dom'
import Rating from './Rating'

function CoursesCards(props) {
    const { item } = props
    return (
        <Link to={`/coursepage/${item?.id}`}>
            <div className={`relative my-6 mx-7 group cursor-pointer carousal-item `}>
                <div className='relative h-[180px] transition-transform transform scale-100 group-hover:scale-105'>
                    <img className='h-full w-full object-cover min-w-[240px] max-w-[250px]' src={item?.thumbnail ? item?.thumbnail : image1} alt="" />
                </div>
                <div className='truncate'>
                    <h1 className='font-bold text-md truncate'>{item?.title}</h1>
                </div>
                <div className='relative bottom-2'>
                    <small className='text-xs'>{item?.username}</small><br />
                    <div className='flex relative top-2 items-center'>
                        <small className='relative bottom-2'><Rating rating={item.rating} top={1} bottom={1} left={1} right={1} /></small>
                        <small className='text-xs relative mb-2 bottom-2.5 ms-1'>
                            ({item?.no_of_reviews ? item?.no_of_reviews : 0})
                        </small>
                    </div>
                    <div className='flex top-2 relative'>
                        <p className='font-semibold relative bottom-3'>₹ {item?.price}</p>
                        <p className='font-semibold text-sm relative bottom-2.5 ms-3 line-through'>(₹ {item?.offer_price})</p>
                    </div>
                </div>
            </div>
        </Link>


    )
}

export default CoursesCards
