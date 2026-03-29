import { useNavigate } from "react-router-dom"

const OtherUser = ({user}) => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-[80px] flex items-center justify-between border-b-2 border-gray-800'>
        <div className="flex items-center gap-2 ">
          <div onClick={() => navigate(`/profile/${user?.userName}`) } className="w-11 h-11 border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={user?.profileImage || "/EmptyDP.jpg"}
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div>
            <div className="text-[18px] text-white font-semibold">
              {user?.userName}
            </div>
            <div className="text-[15px] text-white/80">{user?.name}</div>
          </div>
        </div>
        <button className="px-[10px] w-[90px] py-[5px] h-[35px] cursor-pointer bg-white rounded-2xl">Follow</button>
    </div>
  )
}

export default OtherUser