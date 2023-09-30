import React from 'react'

function CommunityCard(props) {
    const {item} = props
    return (
        <div className='bg-[#D8D8D8] cursor-pointer mx-2 h-[80px]  max-w-[300px] mt-5 rounded-lg shadow-black hover:shadow-lg flex items-center '>
            <img className='h-12 rounded-md min-w-[90px] ms-3' src={item?.thumbnail} alt="" />
            <p className='font-semibold mx-2'>{item?.title}</p>
        </div>
    )
}

export default CommunityCard
