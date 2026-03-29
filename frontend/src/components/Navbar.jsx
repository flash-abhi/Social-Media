import React from 'react'
import { HiHome } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import { RxVideo } from "react-icons/rx";
import { LuCirclePlus } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const {userData} = useSelector(state => state.user);
  return (
    <div className='w-full lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-0 bottom-[16px]  rounded-full shadow-2xl shadow-[#000] z-[100]'>
        <div>
            <HiHome onClick={() => navigate("/")} className='text-white cursor-pointer text-4xl'/>
        </div>
        <div>
            <RiSearchLine className='text-white cursor-pointer text-4xl'/>
        </div>
        <div>
            <LuCirclePlus className='text-white cursor-pointer text-4xl'/>
        </div>
        <div>
            <RxVideo className='text-white cursor-pointer text-4xl'/>
        </div>
        <div onClick={() => navigate(`/profile/${userData?.userName}`)} className="w-10 h-10 border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={userData?.profileImage || "/EmptyDP.jpg"}
              alt=""
              className="w-full object-cover"
            />
          </div>
    </div>
  )
}

export default Navbar;