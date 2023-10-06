import React from 'react'

function Rating(props) {

    const { rating, bottom, top, left, right } = props

    return (
        <>
            {
                rating && rating !== '0.00' ?
                    <div className='z-0  flex'>
                        {
                            Array(Math.round(rating)).fill().map((_, index) => (
                                <div className={`rating bottom-2 mt-${top} left-0 relative rating-half`}>
                                    <input key={index} type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                </div>
                            ))
                        }
                    </div> :
                    <div className={`rating rating-xs relative right-2 bottom-${bottom} rating-half`}>
                        <input type="radio" name="rating-10" className="rating-hidden" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" checked/>
                    </div>
            }
        </>
    )
}

export default Rating
