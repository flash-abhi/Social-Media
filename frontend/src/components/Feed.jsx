import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import StoryDp from './StoryDp';
import Navbar from './Navbar';

const Feed = () => {
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
        <div className="w-full h-25 lg:hidden flex items-center justify-between p-5">
            <img src="white-logo.png" alt="logo" className="w-[50px] h-[40px]" />
            <div>
              <FaRegHeart className="text-white w-[25px] h-[25px]" />
            </div>
        </div>
        {/* story card */}
        <div className='flex w-full overflow-auto gap-2.5 items-center p-5'>
          <StoryDp userName={"hellohhhhhhhhhhhh"} profileImage={""}/>
          <StoryDp userName={"hello"} profileImage={""}/>
          <StoryDp userName={"hello"} profileImage={""}/>
        </div>
        <div className="w-full min-h-screen flex flex-col  items-center gap-5 p-2.5 pt-10 bg-white rounded-t-[40px] relative pb-[120px]">
          <Navbar/>
        </div>
    </div>
  )
}

export default Feed;