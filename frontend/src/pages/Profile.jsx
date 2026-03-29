import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { IoIosArrowBack } from "react-icons/io";
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'

const Profile = () => {
    const {userName} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {profileData, userData} = useSelector((state) => state.user);
    console.log(profileData);
    const handleLogout = async () => {
    try {
        const result = await axios.get(serverUrl+"/api/auth/signout",{withCredentials:true});
        dispatch(setUserData(null));
        toast.success(result?.data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
  } 

    const handleProfile = async () => {
        try {
            const result = await axios.get(serverUrl+`/api/user/getProfile/${userName}`,{withCredentials: true});
            dispatch(setProfileData(result.data));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleProfile();
    },[userName, dispatch]);
  return (
    <div className='w-full min-h-screen bg-black'>
        <div className=' w-full h-20 flex justify-between items-center px-[30px] text-white'>
            <div>
                <IoIosArrowBack onClick={() => navigate("/")} className='text-white cursor-pointer w-[25px] h-[25px]' />
            </div>
            <div className='font-semibold text-[20px]'>
                {profileData?.userName}
            </div>
            <div onClick={handleLogout} className='font-semibold cursor-pointer text-[20px] text-blue-500'>
                Log Out
            </div>
        </div>
        <div className='w-full h-[150px] flex items-start gap-5 lg:gap-[50px] pt-[20px] px-[10px] justify-center'>
            <div className="w-20 h-20 lg:w-30 lg:h-30 border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                src={profileData?.profileImage || "/EmptyDP.jpg"}
                alt="dp"
                className="w-full object-cover"
                />
            </div>
            <div className='text-white'>
                <div className='font-semibold text-[22px] text-white'>{profileData?.name}</div>
                <div className='text-[14px] text-[#ffffffe8]'>{profileData?.profession || "New User"}</div>
                <div className='text-[14px]'>{profileData?.bio }</div>
            </div>
        </div>
        {/* followers following and posts count */}
        <div className='w-full text-white h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px]'>
            {/* post */}
            <div className='text-[22px] md:text-[30px] font-semibold'>
                <div className="">{profileData?.posts.length}</div>
                <div className='text-[18px] md:text-[22px] text-[#ffffffc7] '>Posts</div>
            </div>
            {/* followers */}
            <div className='text-[22px] md:text-[30px] font-semibold'>
                <div>{profileData?.followers?.length}</div>
                <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>followers</div>
            </div>
            {/* following */}
            <div className='text-[22px] md:text-[30px] font-semibold'>
                <div>{profileData?.following?.length}</div>
                <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>following</div>
            </div>
        </div>

        <div className='w-full mt-2.5 h-[80px] flex justify-center items-center gap-5'>
            {
                profileData?._id == userData?._id && 
                <button onClick={() => navigate(`/editprofile`)} className='px-[10px] font-semibold min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl'>
                    Edit Profile
                </button>
            }
            {profileData?._id != userData?._id &&  
            <div className=' flex gap-8'>
                 <button className='px-[10px] font-semibold min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl'>
                    follow
                </button>
                 <button className='px-[10px] font-semibold min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl'>
                    message
                </button>
            </div>
            }
        </div>
        
        <div className="w-full min-h-screen flex justify-center">
            <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]">
                <Navbar />
            </div>
        </div>
    </div>
  )
}

export default Profile