import axios from "axios";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import OtherUser from "./OtherUser";

const LeftHome =  () => {
  const { userData,suggestedUsers } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
        const result = await axios.get(serverUrl+"/api/auth/signout",{withCredentials:true});
        dispatch(setUserData(null));
        toast.success(result?.data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
  } 
  return (
    <div className="w-[25%] hidden lg:block min-h-screen bg-black border-r-2 border-gray-900">
      <div className="w-full h-25 flex items-center justify-between p-5">
        <img src="white-logo.png" alt="logo" className="w-[50px] h-[40px]" />
        <div>
          <FaRegHeart className="text-white w-[25px] h-[25px]" />
        </div>
      </div>
        <div className="flex items-center justify-between px-2 gap-2.5 border-b-2 border-b-gray-900 py-2.5">
        <div className="flex items-center gap-2 ">
          <div className="w-13.75 h-13.75 border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={userData?.profileImage || "EmptyDP.jpg"}
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[18px] text-white font-semibold">
              {userData?.userName}
            </div>
            <div className="text-[15px] text-white/80">{userData?.name}</div>
          </div>
        </div>
        <div className="text-blue-500 cursor-pointer" onClick={handleLogout} >Log Out</div>
      </div>
      {/* suggested users */}
      <div className="w-full flex flex-col gap-5 p-5">
        <h1 className="text-white text-[19px]">Suggeseted Users</h1>
        {suggestedUsers && suggestedUsers.slice(0,3).map((user,index) => (
          <OtherUser key={index} user={user}/>
        ))}
      </div>
    </div>
  );
};

export default LeftHome;
