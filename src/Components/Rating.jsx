import React from 'react'

function Rating(props) {

    const { rating } = props

    return (
        <>
            {
                rating ?
                    <>
                        {
                            rating.map((item) => {
                                return (
                                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                )
                            })
                        }
                    </> :
                    <div className="rating rating-xs">
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-[#FEE9D8]" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-[#FEE9D8]" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-[#FEE9D8]" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-[#FEE9D8]" />
                        <input type="radio" name="rating-5" className="mask mask-star-2 bg-[#FEE9D8]" />
                    </div>
            }
        </>
    )
}

export default Rating
