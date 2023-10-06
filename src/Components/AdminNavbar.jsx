import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noprofile from '../icons/noprofile.png'
import jwtDecode from 'jwt-decode'

function AdminNavbar() {

    const navigate = useNavigate()

    const access = jwtDecode(localStorage.getItem('authToken'))

    const handleLogout = async () => {
        await localStorage.removeItem('authToken')
        await navigate('/login')
    }

    return (
        <div className="navbar bg-base-100 shadow-lg sticky top-0">
            <div className="flex-1">
                <Link to='/admin/'>
                    <span className="btn btn-ghost normal-case text-xl font-bold">ADMIN</span>
                </Link>
            </div>
            <div className='relative flex items-center justify-center w-full'>
                <ul className='flex'>
                    <Link to='/admin/'>
                        <li className='mx-3 font-semibold cursor-pointer'>DASHBOARD</li>
                    </Link>
                    <Link to='admin_users'>
                        <li className='mx-3 font-semibold cursor-pointer'>USERS</li>
                    </Link>
                    <Link to='admin_instructors'>
                        <li className='mx-3 font-semibold cursor-pointer'>INSTRUCTORS</li>
                    </Link>
                    <Link to='add_category'>
                        <li className='mx-3 font-semibold cursor-pointer lg:block md:block sm:hidden xs:hidden'>ADD CATEGORY</li>
                    </Link>
                </ul>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img className='h-7' src={noprofile} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            !access.is_superuser ?
                                <>
                                    <li>
                                        <Link to='/profile'>
                                            <span className="justify-between">
                                                Profile
                                            </span>
                                        </Link>
                                    </li>
                                </> : null
                       }
                        <li className='lg:hidden md:hidden sm:block xs:block'>
                            <Link to='add_category'>
                                <span className="justify-between">
                                    Add Category
                                </span>
                            </Link>
                        </li>

                        <li onClick={handleLogout}><span className='text-red-400'>Logout</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar
