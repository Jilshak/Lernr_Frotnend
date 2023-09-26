import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

function RootPage() {
    return (
        <>
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default RootPage
