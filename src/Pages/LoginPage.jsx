import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse min-w-[450px]">
                <div className="card flex-shrink-0 w-full max-w-sm  hover:shadow-md hover:shadow-[#e5e4e4] shadow-[#e5e4e4] bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <input  type="text" placeholder="username" className="input input-bordered" />
                        </div>
                        <div className="form-control my-5">

                            <input type="password" placeholder="password" className="input input-bordered" />

                        </div>
                        <div className="form-control">
                            <button className="btn btn-outline">Login</button>
                        </div>
                        <div className="form-control mt-2">
                            <button className="btn btn-neutral">GuestMode</button>
                        </div>
                        <div className='flex items-center justify-center'>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover link-accent text-sm">Forgot password?</a>
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
