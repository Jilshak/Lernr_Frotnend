import React from 'react'
import noprofile from '../icons/noprofile.png'


function Reviews(props) {
    const {item} = props

    const stars = Array.from({ length: item.stars }, (_, index) => (
        <input
            key={index}
            type="radio"
            name={`rating-${item.id}`} // You can use a unique identifier for each rating
            className="mask mask-star-2 btn-disabled bg-orange-400"
            checked
        />
    ));

    return (
        <div className='h-[270px] bg-[#D9D9D9] rounded-lg my-5 ms-4'>
            <div className='flex'>
                <img className='h-[50px] w-[50px] my-5 mx-5 rounded-full object-cover' src={item.user.profile_image ? item.user.profile_image : noprofile} alt="" />
                <div className='mt-5'>
                    <h1>{item.user.username ? item.user.username : item.user.email}</h1>
                    <div className="rating rating-xs">
                       {stars}
                    </div>
                </div>
            </div>
            <div className="h-[140px] overflow-hidden">
                <p className='text-sm object-contain mx-5 '>
                    {
                        item.review
                    }
                </p>
            </div>
        </div>

    )
}

export default Reviews
