import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { confirmResetPassword } from '../features/UserSlice'
import Swal from 'sweetalert2'


function ResetPasswordPage() {

    const { token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')

    const handleResetPassword = async () => {
        try {
            if (password === password1) {
                const credentials = {
                    token: token,
                    new_password: password
                }
                await dispatch(confirmResetPassword(credentials))
                await navigate('/login')
            } else {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'error',
                        title: 'FAILED!!',
                        text: "Password updation failed!!!",
                    }
                )
            }
        }catch(error){
               console.log("Error: ", error) 
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='absolute h-[320px] w-[400px] bg-white hover:shadow-2xl hover:shadow-green-300 shadow-2xl z-50'>
                <div className='w-full  flex flex-col items-center justify-center'>
                    <h1 className='my-5 text-xl font-bold text-[#535050]'>Forgot Your Password ?</h1>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Your New Password" className="input input-bordered w-full max-w-xs mt-5" />
                    <input onChange={(e) => setPassword1(e.target.value)} type="password" placeholder="Set Your New Password" className="input input-bordered w-full max-w-xs mt-5" />
                    <button onClick={handleResetPassword} className="btn btn-wide btn-outline btn-sm  my-5">CONFIRM</button>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage
