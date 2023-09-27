import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Login } from '../features/UserSlice'
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


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse min-w-[450px]">
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
                                <span className="label-text-alt link link-hover link-accent text-sm">Forgot password?</span>
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
