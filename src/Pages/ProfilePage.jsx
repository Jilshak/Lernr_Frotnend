import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, profileImage } from '../features/UserSlice';
import jwtDecode from 'jwt-decode';

function ProfilePage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('authToken');
  const access = jwtDecode(token);

  const profileDetails = useSelector((state) => state.users);

  const [activeSection, setActiveSection] = useState('Account');

  useEffect(() => {
    dispatch(getMyProfile(access.user_id));
  }, []);



  const [profile, setProfile] = useState()

  //for controlling different section
  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName);
  };


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

  return (
    <>
      {!profileDetails.isLoading && profile ? (
        <>
          <div className="p-12 relative">
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
                        className="rounded-full w-[160px] outline-none border h-[160px] object-cover cursor-pointer"
                        src={profile?.profile_image ? profile?.profile_image : null}
                      />
                    </label>
                  </button>
                </div>
              </div>

              <div className="mt-16 text-center  pb-12">
                <h1 className="text-2xl font-medium text-[#6B7280]">
                  {profileDetails.profile.email}
                </h1>
                <div className="flex items-center justify-center">
                  <div className="grid grid-cols-3 w-[800px] my-5">
                    {/* Apply conditional styling for each section based on the activeSection */}
                    <span
                      className={`cursor-pointer ${activeSection === 'Account' ? 'font-bold border-b-2 border-b-[#5df069]' : ''
                        }`}
                      onClick={() => handleSectionClick('Account')}
                    >
                      Account
                    </span>
                    <span
                      className={`cursor-pointer ${activeSection === 'PaymentMethod' ? 'font-bold border-b-2 border-b-[#5df069]' : ''
                        }`}
                      onClick={() => handleSectionClick('PaymentMethod')}
                    >
                      Payment Method
                    </span>
                    <span
                      className={`cursor-pointer ${activeSection === 'Notification' ? ' font-bold border-b-2 border-b-[#5df069]' : ''
                        }`}
                      onClick={() => handleSectionClick('Notification')}
                    >
                      Notification
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-[900px] h-[250px] rounded-xl bg-[#D9D9D9]"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default ProfilePage;
