import React from 'react'

function Rating() {
    return (
        <div className="rating rating-xs">
            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked />
            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
        </div>
    )
}

export default Rating
