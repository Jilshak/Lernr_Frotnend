import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile, getMyProfile, profileImage, updatePassword } from '../features/UserSlice';
import jwtDecode from 'jwt-decode';
import Footer from '../Components/Footer';

function ProfilePage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('authToken');
  const access = jwtDecode(token);

  const profileDetails = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getMyProfile(access.user_id));
  }, []);



  const [profile, setProfile] = useState()


  const updateImage = async (e) => {
    const formData = new FormData();
    formData.append('profile_image', e);

    const credentials = {
      id: access.user_id,
      profile_image: formData
    }

    await Promise.resolve(dispatch(profileImage(credentials)))
    await dispatch(getMyProfile(access.user_id))
  };

  useEffect(() => {
    if (profileDetails.profile) {
      setProfile(profileDetails.profile)
      console.log("This is the profile: ", profile)
    }
  }, [profileDetails.profile])

  const [toggle, setToggle] = useState(false)




  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const handleEdit = async () => {
    const credentials = {
      id: access.user_id,
      username: username,
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
    }
    await dispatch(editProfile(credentials))
    await setToggle(false)
  }

  //phone validation
  const [validPhone, setValidPhone] = useState(true)

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value
    setPhone(phoneNumber)

    const phoneRegex = /^(?!([0-9])\1{9}$)\d{10}$/;
    if (phoneRegex.test(phoneNumber)) {
      setValidPhone(true);
    } else {
      setValidPhone(false);
    }

  }

  //display account
  const [displayToggle, setDisplayToggle] = useState(false)

  //password fields
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const cleanState = () => {
    setOldPassword('')
    setNewPassword('')
  }

  const handleUpdatePassword = async () => {
    const credentials = {
      old_password: oldPassword,
      new_password: newPassword
    }
    await dispatch(updatePassword(credentials))
    cleanState()
  }

  return (
    <>
      {!profileDetails.isLoading && profile ? (
        <>
          <div className="p-12 relative  min-h-screen">
            {
              toggle ?
                <>
                  <div className='w-full  flex justify-center'>
                    <div className='h-[550px]  w-[450px] z-50 shadow-xl bg-white absolute'>
                      <div className='flex items-center justify-center'>
                        <h1 className='font-bold text-2xl mx-2 my-4'>Edit Profile</h1>
                      </div>
                      <div className='w-full flex flex-col gap-y-4 items-center justify-center mt-4'>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" className="input input-bordered w-full max-w-sm " />
                        <input onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="first name" className="input input-bordered w-full max-w-sm " />
                        <input onChange={(e) => setLastName(e.target.value)} type="text" placeholder="last name" className="input input-bordered w-full max-w-sm " />
                        <input onChange={(e) => handlePhoneChange(e)} type="number" placeholder="Phone" className={validPhone ? 'input input-bordered w-full max-w-sm ' : 'input input-bordered input-error w-full max-w-sm '} />
                      </div>
                      <div className='flex flex-col gap-y-4 items-center justify-center mt-5'>
                        <button onClick={handleEdit} className="btn btn-wide hover:bg-green-300">Apply Changes</button>
                        <button onClick={(e) => {
                          setToggle(false)
                          setEmail('')
                          setFirstName('')
                          setLastName('')
                          setPhone('')
                          setValidPhone(true)
                        }} className="btn btn-wide hover:bg-red-300">Cancel</button>
                      </div>
                    </div>
                  </div>
                </> : null
            }
            <div className="p-8  bg-white mt-12">
              <div className="">
                <div className="relative ">
                  <button type="button" className="w-40 shadow-md shadow-[#c3c1c1] h-40  mx-auto rounded-full bg-[#b2b5b7] absolute inset-x-0 top-0 -mt-24 flex items-center justify-center" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                    <label htmlFor="profile_image">
                      <input
                        type="file"
                        name='profile_image'
                        accept='image/*'
                        id='profile_image'
                        onChange={(e) => {
                          updateImage(e.target.files[0])
                        }}
                        className="hidden"
                      />
                      <img
                        className="rounded-full w-[160px] outline-none border h-[160px]  object-cover cursor-pointer"
                        src={profile?.profile_image ? profile?.profile_image : null}
                      />
                    </label>
                  </button>
                </div>
              </div>

              <div className="mt-16 relative top-2 text-center  pb-12">
                <h1 className="text-2xl font-medium text-[#6B7280]">
                  {profile.username ? profile.username : profile.email}
                  <span onClick={(e) => setToggle(true)} className="badge badge-outline relative left-3 cursor-pointer ">Edit</span>
                </h1>
                <div className='flex items-center justify-center relative top-8  gap-x-14 font-bold'>
                  <span onClick={(e) => setDisplayToggle(false)} className={!displayToggle ? 'underline underline-offset-8 cursor-pointer' : 'cursor-pointer'}>General</span>
                  <span onClick={(e) => setDisplayToggle(true)} className={displayToggle ? 'underline underline-offset-8 cursor-pointer' : 'cursor-pointer'}>Password</span>
                </div>
                <div className="flex items-center justify-center mt-10 ">
                  <div className="w-[1000px] lg:h-[300px] rounded-xl bg-[#f0f0f0]">
                    {
                      !displayToggle ?
                        <>
                          <div className='grid lg:grid-cols-2'>
                            <div className='h-[250px] my-5 flex flex-col text-start mx-10 '>
                              <h1 className='text-xs'>First name</h1>
                              <div className='h-[40px] rounded-xl bg-white my-2'>
                                <h1 className='my-1.5 mx-4 text-[#6B7280] font-semibold'>{firstName != '' ? firstName : (profile.first_name ? profile.first_name : 'Not Provided')}</h1>
                              </div>
                              <h1 className='text-xs mt-2'>Last name</h1>
                              <div className='h-[40px] rounded-xl bg-white my-2'>
                                <h1 className='my-1.5 mx-4 text-[#6B7280] font-semibold'>{lastName != '' ? lastName : (profile.last_name ? profile.last_name : 'Not Provided')}</h1>
                              </div>
                              <h1 className='text-xs mt-3'>Email</h1>
                              <div className='h-[40px] rounded-xl bg-white my-2'>
                                <h1 className='my-1.5 mx-4 text-[#6B7280] font-semibold'>{profile.email}</h1>
                              </div>
                            </div>
                            <div className='h-[250px] relative lg:bottom-0 md:bottom-0 sm:bottom-0 xs:bottom-10 my-5 flex flex-col text-start mx-10 '>
                              <h1 className='text-xs'>Username</h1>
                              <div className='h-[40px] rounded-xl bg-white my-2'>
                                <h1 className='my-1.5 mx-4 text-[#6B7280] font-semibold'>{username != '' ? username : (profile.username ? profile.username : 'not given')}</h1>
                              </div>
                              <h1 className='text-xs mt-2'>Phone</h1>
                              <div className='h-[40px] rounded-xl bg-white my-2'>
                                <h1 className='my-1.5 mx-4 text-[#6B7280] font-semibold'>{phone != '' ? phone : (profile.phone_number ? profile.phone_number : 'not provided')}</h1>
                              </div>
                            </div>

                          </div>
                        </>
                        :
                        <div className='flex gap-y-5 flex-col items-center justify-center mt-7 mx-[30px]'>
                          <h1 className='font-semibold text-lg'>UPDATE PASSWORD</h1>
                          <div className=' flex flex-col gap-y-5 w-full items-center justify-center'>
                            <input onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} type="text" placeholder="old password" className="input input-bordered w-full max-w-sm" />
                            <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="text" placeholder="new password" className="input input-bordered w-full max-w-sm" />
                            <button onClick={handleUpdatePassword} className="btn btn-outline xs:w-full lg:w-[380px]">UPDATE</button>
                          </div>
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <Footer />
    </>
  );
}

export default ProfilePage;
