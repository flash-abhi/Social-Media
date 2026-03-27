import React from 'react'

const StoryDp = ({profileImage,userName}) => {

  return (
    <div className='flex flex-col w-[60px]'>
    <div className='w-15 h-15 bg-gradient-to-b from-blue-500 to-blue-950 rounded-full flex justify-center items-center'>
        <div className="w-13.75 h-13.75 border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={profileImage || "EmptyDP.jpg"}
              alt=""
              className="w-full object-cover"
            />
          </div>
    </div>
    <div className="text-[14px] text-center truncate w-full text-white">{userName}</div>
    </div>
  )
}

export default StoryDp