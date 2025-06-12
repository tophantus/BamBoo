import { Camera, Mail, Notebook, User, Phone, Save, Edit, CircleX, SquareX } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const ProfilePage = () => {

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const [isEditInfo, setIsEditInfo] = useState(false);

  const [infoForm, setInfoForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: ""
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    if (!name) return;
    setInfoForm((pre) => ({
      ...pre,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImg(URL.createObjectURL(file));
    await updateProfile({ image: file });
  };

  const handleUpdateInfo = () => {
    if (!infoForm.firstName.trim() || !infoForm.lastName.trim()) {
      toast.error("Please fill in both first and last name");
      return;
    }
    updateProfile(infoForm);
    setIsEditInfo(false);
  }
  return (
    <div className='flex justify-center w-full bg-milk min-h-screen gap-[50px] p-[50px]'>
        {/* Login */}
        <div className='flex flex-col items-center bg-paper h-full scrollbar-hide overflow-auto w-full max-w-[1000px] rounded-[30px]'>
            <div className='px-[40px] pt-[40px] w-full'>
                <div className="text-center text-black">
                  <h1 className="font-bold text-4xl text-black">Profile</h1>
                  <p className="mt-2 text-textbox">Your profile information</p>
                </div>
            </div>

             {/* avatar upload section */}
            <div className="flex flex-col items-center pt-8 gap-4">
              <div className="relative">
                <img
                  src={selectedImg  || authUser?.profilePic || "/avatar.jpg"}
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 border-bamboo"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-0 right-0 
                    bg-textbox hover:scale-105
                    p-2 rounded-full cursor-pointer 
                    transition-all duration-200
                    border-bamboo border-4
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-5 h-5 text-base-200" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-textbox">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            <div className='flex gap-4'>
              <div className="space-y-6 pt-8 min-w-[200px]">
          
                <div className="space-y-1.5">
                  <div className="text-sm text-textbox flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                  <div className="ps-4 pe-2.5 py-2.5 flex items-center bg-bamboo text-milk rounded-lg border">
                    <div className='flex-1'>
                      {isEditInfo ? (
                        <div className='flex flex-col gap-2'>
                          <input
                            name='firstName'
                            value={infoForm.firstName}
                            onChange={handleOnChange}
                            className='bg-transparent outline-none placeholder:text-paper'
                            placeholder='First Name'
                          />
                        
                          <input
                            name='lastName'
                            value={infoForm.lastName}
                            onChange={handleOnChange}
                            className='bg-transparent outline-none placeholder:text-paper'
                            placeholder='Last Name'
                          />
                        </div>
                      ) : (
                        <p>{authUser?.firstName + " " + authUser?.lastName}</p>
                      )}
                    </div>
                  
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-textbox flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                  <div className="ps-4 pe-2.5 py-2.5 bg-bamboo flex items-center rounded-lg border">
                    <div className='flex-1'>
                      {isEditInfo ? (
                        <div>
                          <input
                            name='phoneNumber'
                            value={infoForm.phoneNumber}
                            onChange={handleOnChange}
                            className='bg-transparent outline-none placeholder:text-paper'
                            placeholder='Phone Number'
                          />
                        </div>
                      ) : (
                        <p>{authUser?.phoneNumber + " " }</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-textbox flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <div className="px-4 py-2.5 bg-bamboo rounded-lg border">
                    <p className="">{authUser?.email + " "}</p>
                  </div>
                </div>

              </div>
              <div className='flex flex-col justify-between pt-[30px]'>
                <button
                  type="button"
                  onClick={() => setIsEditInfo(!isEditInfo)}
                  className="text-milk bg-bamboo p-2 rounded-md hover:text-oldBamboo hover:scale-105"
                >
                  {isEditInfo ? <SquareX size={25}/>  : <Edit size={25}/>}
                </button>

                {isEditInfo && 
                  <button
                    type="button"
                    onClick={handleUpdateInfo}
                    className={`text-milk bg-bamboo p-2 rounded-md hover:text-oldBamboo hover:scale-105 ${isUpdatingProfile ? "cursor-not-allowed" : ""}`}
                    disabled={isUpdatingProfile}
                  >
                    <Save size={25}/>
                  </button>
                }
              </div>
            </div>
            
        </div>
    </div>
  )
}

export default ProfilePage