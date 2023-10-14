import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Login, requestResetPassword } from '../features/UserSlice'
import jwtDecode from 'jwt-decode'


function LoginPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //user details
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        const credentials = {
            email: email,
            password: password
        }
        await dispatch(Login(credentials))
        if (localStorage.getItem('authToken')) {
            let token = await localStorage.getItem('authToken')
            let access = await jwtDecode(token)
            if (access.is_superuser) {
                await navigate('/admin/')
            } else {
                await navigate('/')
            }
        }
    }

    useEffect(() => {
        const refresh = async () => {
            let token = await localStorage.getItem('authToken')
            let access = await jwtDecode(token)
            if (access.is_superuser) {
                await navigate('/admin/')
            } else {
                await navigate('/')
            }
        }
        refresh()
    }, [])

    const handleGuestMode = async () => {
        await localStorage.setItem('guestToken', true)
        await navigate('/')
    }

    const [toggleForgotPassword, setToggleForgotPassword] = useState(false)

    const handleForgotPassword = async () => {
        await dispatch(requestResetPassword(email))
        await setToggleForgotPassword(false)
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse min-w-[450px]">
                {
                    toggleForgotPassword ?
                        <>
                            <div className='absolute h-[320px] w-[400px] bg-white hover:shadow-2xl hover:shadow-red-300 shadow-2xl z-50'>
                                <div className='w-full  flex flex-col items-center justify-center'>
                                    <h1 className='my-5 text-xl font-bold text-[#535050]'>Forgot Your Password ?</h1>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your accounts email here" className="input input-bordered w-full max-w-xs mt-5" />
                                    <button onClick={handleForgotPassword} className="btn btn-wide btn-outline btn-sm  my-5">SEND RESET TOKEN</button>
                                    <button onClick={(e) => setToggleForgotPassword(false)} className="btn btn-wide btn-outline btn-sm">CANCEL</button>
                                </div>
                            </div>
                        </> : null
                }
                <div className="card flex-shrink-0 w-full max-w-sm  hover:shadow-lg hover:shadow-[#555454] shadow-[#e5e4e4] bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control my-5">

                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered" />

                        </div>
                        <div className="form-control">
                            <button onClick={handleLogin} className="btn btn-outline">Login</button>
                        </div>
                        <div className="form-control mt-2">
                            <button onClick={handleGuestMode} className="btn btn-neutral">GuestMode</button>
                        </div>
                        <div className='flex items-center justify-center'>
                            <label className="label">
                                <span onClick={(e) => setToggleForgotPassword(true)} className="label-text-alt link link-hover link-accent text-sm">Forgot password?</span>
                            </label>
                        </div>
                        <span className='flex justify-center '>
                            <label className="label ">
                                <span className="label-text-alt flex text-sm">Don't have an Account? <Link to='/signup'> <p className='ms-2 link link-hover link-accent'>Register</p> </Link> </span>
                            </label>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
