import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import CartProduct from '../Components/CartProduct'


function CartPage() {
    return (
        <div >
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>
            <div class="max-h-[90vh] overflow-y-auto">
                <h1 class="mb-10 text-center text-2xl font-bold relative top-10">Cart Items</h1>
                <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 relative top-10">
                    <div class="rounded-lg md:w-2/3">

                        <CartProduct />
                        <CartProduct />
                        <CartProduct />
                        <CartProduct />
                        <CartProduct />

                    </div>
                    <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div class="mb-2 flex justify-between">
                            <p class="text-[#A6ADBA]">Subtotal</p>
                            <p class="text-[#A6ADBA]">$9999</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-[#A6ADBA]">Shipping</p>
                            <p class="text-[#A6ADBA]">$ 9999+54</p>
                        </div>
                        <hr class="my-4" />
                        <div class="flex justify-between">
                            <p class="text-lg font-bold">Total</p>
                            <div class="">
                                <p class="mb-1 text-lg font-bold">874239</p>
                                <p class="text-sm text-[#A6ADBA]">including VAT</p>
                            </div>
                        </div>
                        <Link to='/checkout'>
                            <button className="mt-6 w-full btn text-white font-bold bg-[#A435F0] hover:bg-[#5f2c82]">CHECKOUT</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
