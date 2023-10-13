import React from 'react'

function CommunityCard(props) {
    const {item} = props
    return (
        <div className='bg-[#e6e6e6] cursor-pointer mx-2 h-[80px]  max-w-[300px] mt-10 rounded-lg  shadow-lg hover:shadow-2xl flex items-center '>
            <img className='h-full rounded-l-md min-w-[90px] max-w-[100px] ' src={item?.thumbnail} alt="" />
            <p className='font-semibold mx-2'>{item?.title}</p>
        </div>
    )
}

export default CommunityCard
