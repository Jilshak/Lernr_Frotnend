import React from 'react'
import AdminNavbar from '../../Components/AdminNavbar'
import AdminRouteGuard from '../../utils/AdminRouteGuard'
import { Outlet } from 'react-router-dom'

function AdminHome() {
  return (
    <>
    <AdminRouteGuard>
        <div className='sticky top-0 z-50'>
            <AdminNavbar />
        </div>
        <div>
            <Outlet />
        </div>
    </AdminRouteGuard>
</>
  )
}

export default AdminHome
