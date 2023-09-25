import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'

function ProtectedRoutes(){
    let authentication = true
    let guestmode = false
    return (
        authentication || guestmode ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default ProtectedRoutes