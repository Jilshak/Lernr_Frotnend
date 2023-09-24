import React from 'react'

function Reviews() {
    return (
        <div className='h-[270px] bg-[#D9D9D9] rounded-lg my-5 ms-4'>
            <div className='flex'>
                <div className='h-[40px] w-[40px] my-5 mx-5 rounded-full bg-white'></div>
                <div className='mt-5'>
                    <h1>Hadi mk</h1>
                    <div className="rating rating-xs">
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                    </div>
                </div>
            </div>
            <div className="h-[140px] overflow-hidden">
                <p className='text-sm object-contain mx-5 '>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio provident deleniti ullam amet placeat
                    cum quos dolor temporibus dolore inventore nobis, praesentium animi officia harum consequatur delectus quaerat sapiente nemo.
                    Adipisci aperiam molestias, odit perspiciatis, numquam cupiditate sapiente voluptates, voluptatem facere possimus ullam. Aliquam
                </p>
            </div>
        </div>

    )
}

export default Reviews
