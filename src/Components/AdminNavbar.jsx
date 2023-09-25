import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noprofile from '../icons/noprofile.png'

function AdminNavbar() {

    const navigate = useNavigate()

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
                    <Link to='admin_reports'>
                        <li className='mx-3 font-semibold cursor-pointer'>REPORTS</li>
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
                        <li>
                            <Link to='/profile'>
                                <span className="justify-between">
                                    Profile
                                </span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li onClick={handleLogout}><span>Logout</span></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminNavbar
