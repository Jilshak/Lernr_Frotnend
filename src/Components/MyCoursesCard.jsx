import React from 'react'
import Rating from './Rating'
function MyCoursesCard(props) {
    const { item } = props
    return (
        <div class="justify-between mb-6 rounded-lg  p-6 shadow-md hover:shadow-2xl cursor-pointer  sm:flex sm:justify-start bg-white">
            {
                item ?
                    <>
                        <img src={item?.thumbnail ? item?.thumbnail : `https://source.unsplash.com/vpOeXr5wmR4/`} alt="product-image" class="w-full max-h-[110px] min-h-[120px] rounded-lg sm:w-40" />
                        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div class="mt-5 sm:mt-0">
                                <h2 class="text-md font-bold ">{item?.title}</h2>
                                <p class="mt-1 text-xs ">{item?.username}</p>
                                <div className='flex z-0'>
                                    <Rating />
                                    <p className='text-xs relative bottom-0.5 ms-2'>({item.reviews ? item.reviews : 0})</p>
                                </div>
                                <p className='text-xs flex'>Course length: <p className='font-semibold ms-1'>{item.course_length}hr</p></p>
                            </div>
                            <div>
                                <p class="text-md relative lg:top-12 md:top-12 sm:top-12 xs:top-0 w-14 font-bold">$ {item?.price}</p>
                            </div>
                        </div>
                    </> : null
            }
        </div>
    )
}

export default MyCoursesCard
