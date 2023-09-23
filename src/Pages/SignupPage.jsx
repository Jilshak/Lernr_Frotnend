import React from 'react'
import { Link } from 'react-router-dom'


function SignupPage() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse min-w-[450px]">
                <div className="card flex-shrink-0 w-full max-w-sm  hover:shadow-lg hover:shadow-[#555454] shadow-[#373737] bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <input type="text" placeholder="username" className="input input-bordered" />
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className="form-control my-2">
                                <input type="text" placeholder="first name" className="input input-bordered" />
                            </div>
                            <div className="form-control my-2">
                                <input type="text" placeholder="last name" className="input input-bordered" />
                            </div>
                        </div>
                        <div className="form-control">
                            <input type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control my-2">
                            <input type="password" placeholder="password" className="input input-bordered" />
                        </div>
                        <div className="form-control mb-2">
                            <input type="password" placeholder="Confirm Password" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <button className="btn btn-outline">SignUp</button>
                        </div>
                        <span className='flex justify-center '>
                            <label className="label ">
                                <span className="label-text-alt flex text-sm">Already have an Account? <Link to='/login'> <p className='ms-2 link link-hover link-accent'>Login</p> </Link> </span>
                            </label>
                        </span>
                        <span className='flex justify-center relative bottom-3'>
                            <label className="label ">
                                <span className="label-text-alt flex text-sm">Sign Up as a Instructor? <Link to='/signup_instructor'> <p className='ms-2 link link-hover link-accent'>SignUp</p> </Link> </span>
                            </label>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
