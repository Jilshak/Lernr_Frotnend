import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noprofile from '../icons/noprofile.png'
import jwtDecode from 'jwt-decode'

function Navbar() {

    const navigate = useNavigate()
    const [token, setToken] = useState()

    const handleLogout = async () => {
        await localStorage.removeItem('authToken')
        await navigate('/login')
    }

    //the token is here
    useEffect(() => {
        const handleToken = async () => {
            if (localStorage.getItem('authToken')) {
                let access = await jwtDecode(localStorage?.getItem('authToken'))
                await setToken(access)
            }
        }
        handleToken()
    }, [])

    return (
        <div className="navbar bg-base-100 z-50 shadow-lg sticky top-0">
            <div className="flex-1">
                <Link to='/'>
                    <span className="btn btn-ghost normal-case text-xl font-bold">Lernr</span>
                </Link>
            </div>
            <div className='relative flex items-center justify-center w-full'>
                <ul className='flex'>
                    <Link to='/'>
                        <li className='mx-3 font-semibold cursor-pointer'>Home</li>
                    </Link>
                    {
                        <Link to='allCourse'>
                            <li className='mx-3 font-semibold cursor-pointer'>Courses</li>
                        </Link>
                    }
                    {
                        !token?.is_instructor ?
                            <>
                                <Link to='/enrolled'>
                                    <li className='mx-3 font-semibold cursor-pointer'>Enrolled</li>
                                </Link>
                            </> : null
                    }
                    {
                        token?.is_instructor ?
                            <>
                                <Link to='/add_course'>
                                    <li className='mx-3 font-semibold cursor-pointer lg:block md:block sm:hidden xs:hidden'>Add Course</li>
                                </Link>
                            </> : null
                    }
                    {
                        token?.is_instructor ?
                            <>
                                <Link to='/mycourses'>
                                    <li className='mx-3 font-semibold cursor-pointer'>My Courses</li>
                                </Link>
                            </> : null
                    }
                </ul>
            </div>
            <div className="flex-none">
                <Link to='/cart'>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">0</span>
                            </div>
                        </label>
                    </div>
                </Link>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img className='h-7' src={noprofile} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            !localStorage?.getItem('guestToken') ?
                                <>
                                    <li>
                                        <Link to='/profile'>
                                            <span className="justify-between">
                                                Profile
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/add_course'>
                                            <span className="justify-between">
                                                <li className='lg:hidden md:hidden sm:block xs:block'>Add Course</li>
                                            </span>
                                        </Link>
                                    </li>

                                    <li onClick={handleLogout}><span className='text-red-400'>Logout</span></li>
                                </>
                                :
                                <Link to='/login'>
                                    <h1 className='text-orange-400 ms-3 font-semibold'>Login first</h1>
                                </Link>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
