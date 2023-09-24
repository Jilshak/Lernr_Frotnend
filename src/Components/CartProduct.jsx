import React from 'react'
import Rating from '../Components/Rating'

function CartProduct() {
    return (
        <div class="justify-between mb-6 rounded-lg  p-6 shadow-md  sm:flex sm:justify-start bg-white">
            <img src={`https://source.unsplash.com/vpOeXr5wmR4/`} alt="product-image" class="w-full max-h-[110px] rounded-lg sm:w-40" />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                    <h2 class="text-md font-bold ">The complete Python Bootcamp From Zero to Hero in Python</h2>
                    <p class="mt-1 text-xs ">Created by</p>
                    <div className='flex'>
                        <Rating />
                        <p className='text-xs relative bottom-0.5 ms-2'>(42384)</p>
                    </div>
                    <p className='text-xs flex'>Course length: <p className='font-semibold'>8hr</p></p>
                </div>
                <div>
                    <p class="text-md relative lg:top-12 md:top-12 sm:top-12 xs:top-0 w-14 font-bold">$ 9999</p>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
