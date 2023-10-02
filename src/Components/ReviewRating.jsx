import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeButton } from '../features/CourseSlice';
import jwtDecode from 'jwt-decode';
import { addReview } from '../features/ReviewSlice';

function ReviewRating(props) {

    const {id} = props
    const access = jwtDecode(localStorage.getItem('authToken'))

    const [rating, setRating] = useState(0);
    const [review, setReveiw] = useState('')

    const getStarClass = (value) => {
        if (value <= rating) {
            return 'bg-orange-500 mask mask-star-2';
        } else {
            return 'mask mask-star-2 bg-[#FEE3D0]';
        }
    };

    const dispatch = useDispatch()

    const handleSendReview = async () => {
        const credential = {
            review_by: await access.user_id,
            review: review,
            course: id,
            no_of_stars: rating
        }
        await dispatch(addReview(credential))
        await dispatch(closeButton())
    }


    return (
        <div className=' h-[420px] rounded-2xl justify-center shadow-2xl items-center absolute w-[450px] bg-white'>
            <div className='absolute flex items-center justify-end w-full right-5 top-4'>
                <button onClick={(e) => dispatch(closeButton())} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            <h1 className='text-xl font-semibold ms-10 mt-10'>Leave a Rating</h1>
            <div className='mx-[40px]'>
                <div className='mt-5 flex items-center justify-center'>
                    <div className="rating rating-lg">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <div key={value}>
                                <input
                                    onClick={(e) => {
                                        setRating(value);
                                        setToggle(true);
                                    }}
                                    type="radio"
                                    name="rating-10"
                                    className="rating-hidden"
                                    value={value}
                                    checked={rating === value}
                                />
                                <input
                                    onClick={(e) => {
                                        setRating(value);
                                        setToggle(true);
                                    }}
                                    value={value}
                                    type="radio"
                                    name="rating-10"
                                    className={getStarClass(value)}
                                />
                            </div>
                        ))}
                    </div>
                    <p className='mx-5 text-lg font-semibold'>{rating}</p>
                </div>
                <div className='mt-5'>
                    <textarea onChange={(e) => setReveiw(e.target.value)} className="textarea textarea-bordered w-full h-[150px]" placeholder="Leave a review here"></textarea>
                </div>
                <div className='flex items-center justify-center mt-10'>
                    <button onClick={(e) => handleSendReview()} className="btn btn-sm btn-wide btn-outline">ADD</button>
                </div>
            </div>
        </div>
    );
}

export default ReviewRating;
