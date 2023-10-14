import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Register } from '../features/UserSlice'
import Swal from 'sweetalert2'

function SignupPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPasswrod] = useState('')
    const [password1, setPassword1] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')

    const handleRegister = async () => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (email != '' && username != '' && password != '' && password1 != '') {
            if (password !== password1) {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'error',
                        title: 'Passwords do not match',
                        text: "Passwords entered do not match.",
                    }
                );
            } else if (!password.match(passwordPattern)) {
                await Swal.fire(
                    {
                        background: '#fff',
                        icon: 'error',
                        title: 'Invalid Password',
                        text: "Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one special character (!@#$%^&*).",
                    }
                );
            } else {
                const credentials = {
                    email: email,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    username: username
                };
                await dispatch(Register(credentials));
                navigate('/login');
            }
        } else {
            await Swal.fire(
                {
                    background: '#fff',
                    icon: 'error',
                    title: 'INCOMPLETE!!!!',
                    text: "Some of the required fields are not filled.",
                }
            );
        }
    };


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse min-w-[450px]">
                <div className="card flex-shrink-0 w-full max-w-sm  hover:shadow-lg hover:shadow-[#555454] shadow-[#373737] bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className="form-control my-2">
                                <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="first name (optional)" className="input input-bordered" />
                            </div>
                            <div className="form-control my-2">
                                <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="last name (optional)" className="input input-bordered" />
                            </div>
                        </div>
                        <div className="form-control">
                            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" className="input input-bordered" />
                        </div>
                        <div className="form-control my-2">
                            <input onChange={(e) => setPasswrod(e.target.value)} type="password" placeholder="password" className="input input-bordered" />
                        </div>
                        <div className="form-control mb-2">
                            <input onChange={(e) => setPassword1(e.target.value)} type="password" placeholder="Confirm Password" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <button onClick={handleRegister} className="btn btn-outline">SignUp</button>
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
