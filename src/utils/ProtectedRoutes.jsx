import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'

function ProtectedRoutes(){
    let authentication = localStorage.getItem('authToken')
    let guestmode = localStorage.getItem('guestToken')
    return (
        authentication || guestmode ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default ProtectedRoutes