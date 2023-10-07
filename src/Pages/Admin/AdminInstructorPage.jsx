import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BlockUser, UnblockUser, blockInstructor, blockUser, getInstructors, getUsers, unblockInstructor, unblockUser } from '../../features/UserSlice'
import noprofile from '../../icons/noprofile.png'


function AdminInstructorPage() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users)

    //users
    const [users, setUsers] = useState()
    const [userdetails, setUserdetails] = useState()
    const [toggle, setToggle] = useState(false)
    const [toggle1, setToggle1] = useState(false)

    useEffect(() => {
        const handleUserState = async () => {
            await dispatch(getInstructors())
            if (user.instructor.length >= 1) {
                await setUsers(user.instructor)
            }
        }
        handleUserState()
    }, [])

    useEffect(() => {
        if (user.instructor.length >= 1) {
            setUsers(user.instructor)
        }
    }, [user.instructor])

    const displayUser = async (id) => {
        console.log(users)
        Promise.resolve(setUserdetails(users.filter((item) => item.id == id)))
        console.log("This is the userdetails: ", userdetails)
        setToggle(true)
    }

    //block and unblock
    const handleBlock = async (id) => {
        await dispatch(blockInstructor({ userId: id }));
        await dispatch(BlockUser(id))
        setToggle(false)
    }

    const handleUnblock = async (id) => {
        await dispatch(unblockInstructor({ userId: id }));
        await dispatch(UnblockUser(id))
        setToggle(false)
    }

    //Search option
    const [find, setFind] = useState();
    const searchItem = async (e) => {
        if (!find) {
            setFind(users);
        }
        if (e.target.value === '') {
            setUsers(find);
        } else {
            setUsers(await users.filter((item) => {
                return item.email.startsWith(e.target.value);
            }));
        }
    }


    return (
        <>
            {
                !user.isLoading && user.instructor.length >= 1 ?
                    <>
                        <div className='grid lg:grid-cols-2 xs:grid-cols-1 gap-0 items-center justify-center min-h-screen'>
                            <div className='bg-[#ffff] object-contain min-h-[150px] max-w-[450px] relative lg:bottom-48 lg:top-[-130px] xs:top-6 lg:left-36 rounded-2xl mx-10'>
                                <div className='relative mx-10 mt-5'>
                                    <input onChange={(e) => searchItem(e)} type="text" placeholder="Search..." className="input input-sm input-bordered  w-full relative" />
                                </div>
                                {
                                    !toggle1 ?
                                        <>
                                            <div className='max-h-[60vh] scrollbar-none overflow-y-auto'>
                                                {
                                                    users && users.length >= 1 ?
                                                        <>
                                                            <ul className='mx-10 mt-3 '>
                                                                {
                                                                    users?.map((item) => {
                                                                        return (
                                                                            <li key={item.id} onClick={(e) => {
                                                                                displayUser(item.id)
                                                                            }} className='flex cursor-pointer items-center p-1 my-5 rounded-lg hover:bg-[#bec0c2]'>
                                                                                <img className='h-12 w-12 ms-2 rounded-full' src={item.profile_image ? item.profile_image : noprofile} alt="" />
                                                                                <h1 className='ms-2'>{item.username ? item.username : item.email}</h1>
                                                                                <div className='flex items-center justify-end w-full'>
                                                                                    {!item.is_blocked ? <h1 className='text-green-400 text-xs mx-3'>Active</h1> : <h1 className='text-red-400'>Blocked</h1>}
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </>
                                                        : null
                                                }
                                            </div>
                                        </> : null
                                }
                                {
                                    toggle1 ?
                                        <>
                                            <div className='max-h-[60vh] min-h-[30vh] scrollbar-none overflow-y-auto'>

                                                {
                                                    users && users.length >= 1 ?
                                                        <>
                                                            <ul className='mx-10 mt-3 '>
                                                                {
                                                                    users.map((item) => {
                                                                        if (!item.is_authorized) {
                                                                            return (
                                                                                <li key={item.id} onClick={(e) => {
                                                                                    displayUser(item.id)
                                                                                }} className='flex cursor-pointer items-center p-1 my-5 rounded-lg hover:bg-[#bec0c2]'>
                                                                                    <img className='h-12 w-12 ms-2 rounded-full' src={item.profile_image ? item.profile_image : noprofile} alt="" />
                                                                                    <h1 className='ms-2'>{item.email}</h1>
                                                                                    <div className='flex items-center justify-end w-full'>
                                                                                        <h1 className='text-red-400 text-xs mx-3'>Delete</h1>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </ul>
                                                        </>
                                                        : null
                                                }

                                            </div>
                                        </> : null
                                }
                            </div>
                            {
                                user && user.user && toggle && userdetails ?
                                    <>
                                        <div className='bg-[#ffff] object-contain min-h-[150px] lg:mt-0 xs:mt-32 relative lg:min-w-[650px] rounded-2xl mx-10 bottom-10'>
                                            <div className='flex items-center justify-end'>
                                                <button onClick={(e) => setToggle(false)} className="btn btn-xs me-5 mt-3 btn-circle btn-outline">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                            <div className=" relative  bg-[#4D4848] rounded-2xl">
                                                <div className="p-1  bg-[#ffff] rounded-2xl">
                                                    <div className="rounded-2xl">
                                                        <div className="relative ">
                                                            <div className="w-48 shadow-md shadow-[#c3c1c1] h-48  mx-auto rounded-full bg-[#3e4f5a] absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-32 text-center pb-12">
                                                        <h1 className="text-2xl font-medium text-[#6B7280]">{userdetails[0].email}</h1>
                                                        <p className="font-light text-gray-600 mt-3">active</p>

                                                        <p className="mt-8 text-gray-500">Solution Manager - Creative Tim Officer</p>
                                                        <p className="mt-2 text-gray-500">University of Computer Science</p>
                                                    </div>
                                                    <div className='grid  relative top-0.5 '>
                                                        {
                                                            !userdetails[0].is_blocked ?
                                                                <>
                                                                    <button onClick={(e) => handleBlock(userdetails[0].id)} className="btn rounded-none hover:btn-warning">Block</button>
                                                                </> : <button onClick={(e) => handleUnblock(userdetails[0].id)} className="btn rounded-none hover:btn-success">Unblock</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : null
                            }
                        </div>
                    </>
                    : <div className='flex items-center justify-center h-screen'>
                        <h1 className='text-2xl font-bold text-[#4D4848]'>THERE ARE NO INSTRUCTORS</h1>
                    </div>
            }
        </>
    )
}

export default AdminInstructorPage
