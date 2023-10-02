import React from 'react'

function Rating(props) {

    const { rating, bottom } = props

    return (
        <>
            {
                console.log("This is the rating: ", bottom)
            }
            {
                rating && rating !== '0.00' ?
                    <div className='z-0 mx-2 flex'>
                        {
                            Array(Math.round(rating)).fill().map((_, index) => (
                                <div className={bottom ? `rating bottom-2 relative rating-half` : `rating bottom-0 right-2 relative rating-half`}>
                                    <input key={index} type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                </div>
                            ))
                        }
                    </div> :
                    <div className="rating rating-xs relative right-2 rating-half">
                        <input type="radio" name="rating-10" className="rating-hidden" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" checked />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-1" />
                        <input type="radio" name="rating-10" className="bg-[#FEE9D8] mask mask-star-2 mask-half-2" />
                    </div>
            }
        </>
    )
}

export default Rating
