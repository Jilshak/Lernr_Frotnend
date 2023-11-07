import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartProduct from '../Components/CartProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, removeCartItem, removefromCartCount } from '../features/CourseSlice'
import jwtDecode from 'jwt-decode'
import Rating from '../Components/Rating'
import api from '../services/Axios'
import nothing from '../Images/nothing1.png'
import Footer from '../Components/Footer'



function CartPage() {



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.courses)

    const [items, setItems] = useState([])

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            const token = localStorage.getItem('authToken')
            const access = jwtDecode(token)
            dispatch(getCartItems(access.user_id))
        }
    }, [])

    useEffect(() => {
        if (cartItems.cart.length >= 1) {
            setItems(cartItems.cart)
        }
    }, [cartItems.cart])

    const handleRemoveCartItem = async (id) => {
        const access = jwtDecode(localStorage.getItem('authToken'))
        const credentials = {
            user: access.user_id,
            on_course: id
        }
        await dispatch(removeCartItem(credentials))
        await dispatch(removefromCartCount())
        await setItems(items.filter((item) => item.id != id))
    }

    const handleCheckout = async (data) => {
        try {
            console.log("This is being called here!!", data)
            const access = await jwtDecode(localStorage.getItem('authToken'))
            const request = await api.post(`payments/stripe_cart/`, { course_id: data, user: access.user_id })
            const response = request.data
            if (request.status == 200) {
                console.log(response)
                await navigate(`/stripe/${response.pi}`)
            } else {
                console.log("Something went wrong while doing the request")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <>
            <div className='min-h-screen'>
                {
                    items && !cartItems.isLoading && cartItems.cart.length >= 1 && items.length >= 1 ?
                        <>
                            <div>
                                <h1 class="mb-10 text-center text-2xl font-bold relative top-10">Cart Items</h1>
                                <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 relative top-10">
                                    <div class="rounded-lg md:w-2/3">

                                        {
                                            items?.map((item) => {
                                                return (
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
                                                                <button onClick={() => {
                                                                    handleRemoveCartItem(item.id)
                                                                }} className="btn btn-xs absolute right-0 lg:top-[-12px] md:top-[-12px] sm:top-[-12px] btn-circle btn-outline ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                </button>
                                                                <p class="text-md relative lg:top-12 md:top-12 sm:top-12 xs:top-0 w-14 font-bold">$ {item.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                    <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                        <div class="mb-1 flex justify-center">
                                            <h1 className='font-bold text-2xl mb-3'>Total</h1>
                                        </div>
                                        <div className="grid justify-center w-full">
                                            {items.map((item) => {
                                                return (
                                                    <div className='bg-[#D9D9D9] w-[300px] mt-3' key={item.id}>
                                                        <div className='flex justify-start items-start'>
                                                            <img
                                                                className='h-10 w-10 object-cover m-2'
                                                                src={item.thumbnail}
                                                                alt=""
                                                            />
                                                            <div>
                                                                <p className='text-xs font-bold mt-1'>{item.title}</p>
                                                                <div className='flex w-[230px] justify-between items-center'>
                                                                    <Rating />
                                                                    <p className='text-sm font-bold'>$ {item.price}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <hr class="my-4" />
                                        <div class="flex justify-center">
                                            <div class="">
                                                <p class="mb-1 text-lg font-bold">$ {items.map((item) => {
                                                    return Number(item.price);
                                                }).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</p>
                                            </div>

                                        </div>
                                        <button onClick={(e) => {
                                            const data = items.map((item) => item.id)
                                            handleCheckout(data)
                                        }} className="mt-6 w-full btn text-white font-bold bg-[#A435F0] hover:bg-[#5f2c82]">CHECKOUT</button>
                                    </div>
                                </div>
                            </div>
                        </> :
                        <div className='h-full w-full flex items-center justify-center'>
                            <img src={nothing} alt="" />
                        </div>
                }
            </div>
            <>
                <Footer />
            </>
        </>
    )
}

export default CartPage
