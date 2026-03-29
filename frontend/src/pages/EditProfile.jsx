import axios from 'axios';
import React, { useRef, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App';
import { setProfileData, setUserData } from '../redux/userSlice';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const navigate = useNavigate();
    const image = useRef();
    const [loading , setLoading] = useState(false);
    const {userData} = useSelector(state => state.user);
    const [frontendImage, setFrontendImage] = useState(userData?.profileImage || "/EmptyDP.jpg")
    const [backendImage, setBackendImage] = useState(null);
    const [name,setName] = useState(userData?.name || "");
    const [userName, setUserName] = useState(userData?.userName || "");
    const [bio,setBio] = useState(userData?.bio || "");
    const [profession,setProfession] = useState(userData?.profession || "");
    const [gender,setGender] = useState(userData?.gender || "");
    const dispatch = useDispatch();
    const handleImage = (e)=> {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }
    const handleEditProfile = async () => {
        try {
            setLoading(true);
            const formdata = new FormData();
            formdata.append("name",name);
            formdata.append("userName", userName);
            formdata.append("bio",bio);
            formdata.append("profession",profession);
            formdata.append("gender",gender);
            if(backendImage){
                formdata.append("profileImage",backendImage);
            }
            const result = await axios.post(serverUrl + `/api/user/editProfile`,formdata,{withCredentials:true});
            setLoading(false);
            
            dispatch(setProfileData(result?.data));
            dispatch(setUserData(result?.data));
            navigate(`/profile/${userData?.userName}`);
            toast.success("Profile Updated !")
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error("Failed to update profile !")
        }
    }
  return (
    <div className='w-full min-h-screen bg-black flex items-center  flex-col gap-5'>
        <div className='w-full h-[80px] flex items-center gap-5 px-5'>
            <IoIosArrowBack onClick={() => navigate(`/profile/${userData?.userName}`)} className='text-white  cursor-pointer w-[25px] h-[25px]' />
            <h1 className='text-white text-[20px] font-semibold'>Edit Profile</h1>
        </div>
        <div onClick={() => image.current.click()} className="w-20 h-20 lg:w-30 lg:h-30 border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                src={frontendImage || "/EmptyDP.jpg"}
                alt="dp"
                className="w-full object-cover"
                />
                <input onChange={handleImage} type="file" name="profile" accept='image/*' ref={image} hidden />
        </div>
        <div className="text-blue-500 text-center text-[18px] cursor-pointer" onClick={() => image.current.click()}>change your profile picture</div>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='w-[90%] text-white font-semibold max-w-150 h-15 bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-5 outline-none' placeholder='Enter your name'/>
        <input value={userName} onChange={(e) => setUserName(e.target.value)} type="text" className='w-[90%] text-white font-semibold max-w-150 h-15 bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-5 outline-none' placeholder='Enter your username'/>
        <input value={bio} onChange={(e) => setBio(e.target.value)} type="text" className='w-[90%] text-white font-semibold max-w-150 h-15 bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-5 outline-none' placeholder='Enter your bio'/>
        <input value={profession} onChange={(e) => setProfession(e.target.value)} type="text" className='w-[90%] text-white font-semibold max-w-150 h-15 bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-5 outline-none' placeholder='Enter your profession'/>
        <input value={gender} onChange={(e) => setGender(e.target.value)} type="text" className='w-[90%] text-white font-semibold max-w-150 h-15 bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-5 outline-none' placeholder='Enter your gender'/>
        <button onClick={handleEditProfile} className='px-2.5 w-[60%] max-w-[400px] py-[5px] h-[50px] bg-blue-500 text-white font-semibold cursor-pointer rounded-2xl mb-10'>{loading? <PulseLoader size={10} color="#ffffff"/> : "Save Profile"}</button>
    </div>
  )
}

export default EditProfile