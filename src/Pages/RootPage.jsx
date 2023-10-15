import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { getMyProfile } from '../features/UserSlice'



function RootPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const blocking = useSelector((state) => state.users)

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate('/login')
    }

    useEffect(() => {
        const handleToken = async () => {
            if (localStorage.getItem('authToken')) {
                const access = await jwtDecode(localStorage.getItem('authToken'))
                if (access.user_id != null) {
                    await dispatch(getMyProfile(access.user_id))
                }
            } else {
               await dispatch(getMyProfile(''))
            }
        }
        handleToken()
    }, [])



    return (
        <>
            {
                blocking && !blocking?.profile?.is_blocked || localStorage?.getItem('guestToken') ?
                    <>
                        <div className='sticky top-0 z-50'>
                            <Navbar />
                        </div>
                        <div>
                            <Outlet />
                        </div>
                    </> :
                    <div className='flex h-screen items-center justify-center'>
                        <div>
                            <h1 className='text-2xl'>You have been blocked by the admin!!</h1>
                            <button onClick={handleLogout} className="btn btn-outline w-full mt-5">LogOut</button>
                        </div>
                    </div>
            }

        </>
    )
}

export default RootPage
