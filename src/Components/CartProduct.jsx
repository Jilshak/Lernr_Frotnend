import React from 'react'
import Rating from '../Components/Rating'
import { useDispatch } from 'react-redux'
import { removeCartItem } from '../features/CourseSlice'

function CartProduct(props) {

    const { item } = props

    const dispatch = useDispatch()

    const handleRemoveCartItem =  async () => {
        dispatch(removeCartItem(item.id))
    }

    return (
        <div>
            <div class="justify-between mb-6 rounded-lg  p-6 hover:shadow-xl  sm:flex sm:justify-start bg-white">
                <div className='flex justify-between relative'>
                    <img src={item?.thumbnail} alt="product-image" class="w-full max-h-[110px] rounded-lg sm:w-40" />
                </div>
                <div class="sm:ml-4 sm:flex sm:w-full relative sm:justify-between">
                    <div class="mt-5 sm:mt-0">
                        <h2 class="text-md font-bold ">{item?.title}</h2>
                        <p class="mt-1 text-xs ">{item?.course_by?.username}</p>
                        <div className='flex'>
                            <Rating />
                            <p className='text-xs relative bottom-0.5 ms-2'>({item.students ? item.students : 0})</p>
                        </div>
                        <p className='text-xs flex'>Course length: <p className='font-semibold ms-2'>{item.course_length}hr</p></p>
                    </div>
                    <div>
                        <button onClick={handleRemoveCartItem} className="btn btn-xs absolute right-0 lg:top-[-12px] md:top-[-12px] sm:top-[-12px] btn-circle btn-outline ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <p class="text-md relative lg:top-12 md:top-12 sm:top-12 xs:top-0 w-14 font-bold">$ {item.price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
