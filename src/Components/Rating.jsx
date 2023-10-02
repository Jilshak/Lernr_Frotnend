import React from 'react'

function Rating(props) {

    const { rating } = props

    return (
        <>
            {
                rating ?
                    <div className='z-0'>
                        {
                            rating.map((item) => {
                                return (
                                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                )
                            })
                        }
                    </div> :
                    <div className="rating rating-xs relative right-2 rating-half">
                    <input type="radio" name="rating-10" className="rating-hidden" />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-1" />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-2" />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-1" checked />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-2" />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-1" />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-2" />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-1" />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-2" />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-1" />
                    <input type="radio" name="rating-10" className="bg-orange-400 mask mask-star-2 mask-half-2" />
                  </div>
            }
        </>
    )
}

export default Rating
