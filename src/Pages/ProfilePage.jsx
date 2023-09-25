import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from '../features/UserSlice';
import jwtDecode from 'jwt-decode';

function ProfilePage() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('authToken');
  const access = jwtDecode(token);

  const profileDetails = useSelector((state) => state.users);

  const [activeSection, setActiveSection] = useState('Account'); // Initialize the active section as 'Account'

  useEffect(() => {
    dispatch(getMyProfile(access.user_id));
  }, []);

  const handleSectionClick = (sectionName) => {
    // Update the active section when a section link is clicked
    setActiveSection(sectionName);
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      {profileDetails && profileDetails.profile ? (
        <>
          <div className="p-12 relative">
            <div className="p-8  bg-white mt-12">
              <div className="">
                <div className="relative ">
                  <div className="w-40 shadow-md shadow-[#c3c1c1] h-40  mx-auto rounded-full bg-[#b2b5b7] absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 w-20"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
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
                      className={`cursor-pointer ${
                        activeSection === 'Account' ? 'font-bold border-b-2 border-b-[#5df069]' : ''
                      }`}
                      onClick={() => handleSectionClick('Account')}
                    >
                      Account
                    </span>
                    <span
                      className={`cursor-pointer ${
                        activeSection === 'PaymentMethod' ? 'font-bold border-b-2 border-b-[#5df069]' : ''
                      }`}
                      onClick={() => handleSectionClick('PaymentMethod')}
                    >
                      Payment Method
                    </span>
                    <span
                      className={`cursor-pointer ${
                        activeSection === 'Notification' ? ' font-bold border-b-2 border-b-[#5df069]' : ''
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
