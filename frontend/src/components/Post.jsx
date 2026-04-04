import React, { useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { serverUrl } from '../App';
import { setPostData } from '../redux/postSlice';

const Post = ({post}) => {
    console.log(post);
    const {userData} = useSelector((state) => state.user);
    const [showComment, setShowComment] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {postData} = useSelector(state => state.post);
    const handleLike = async () => {
        try {
           const result = await axios.get(`${serverUrl}/api/post/like/${post._id}`,{withCredentials:true}); 
           const updatedPost = result.data;
           const updatedPosts = postData.map(p => p._id === post._id ? updatedPost : p);
           dispatch(setPostData(updatedPosts));
        } catch (error) {
            console.log(error);
        }
    }
    const handleComment = async () => {
        try {
           const result = await axios.post(`${serverUrl}/api/post/comment/${post._id}`, { message }, { withCredentials: true });
           const updatedPost = result.data;
           const updatedPosts = postData.map(p => p._id === post._id ? updatedPost : p);
           dispatch(setPostData(updatedPosts));
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='w-[90%] pb-4 flex flex-col gap-2.5 bg-white items-center rounded-2xl border-t-1 border-gray-300 shadow-2xl shadow-[#00000058]'>
        <div className='w-full h-20 flex justify-between items-center px-2.5'>
            <div className='flex justify-center items-center gap-4'>
                <div className='w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] border-2 border-black/50 rounded-full cursor-pointer overflow-hidden'>
                    <img src={post?.author?.profileImage || "EmptyDP.jpg"} alt="profile" className='w-full object-cover'/>
                </div>
                <div className="w-25 font-semibold truncate">{post?.author?.userName}</div>
            </div>
            <button className='cursor-pointer px-2.5 w-[80px] md:w-[100px] py-[5px] h-[30px] md:h-[40px] bg-black text-white rounded-2xl text-[14px] md:text-[16px]'>follow</button>
        </div>
        <div className='w-[90%] flex items-center justify-center '>
            {post?.mediaType === "image" &&
            <div className='w-[90%] flex  items-center justify-center'>
                <img src={post?.media} alt="media" className='h-[100%] max-w-full object-cover rounded-2xl' />
            </div>
            }
            {
            post?.mediaType === "video" &&
          <div className='w-[90%]  flex  items-center justify-center '>
                <VideoPlayer media={post?.media}/>
          </div>
            }
        </div>
        <div className="w-full h-15 flex justify-between items-center px-5 mt-2">
            <div className="flex gap-6 items-center">
                {/* like */}
                <div className="flex justify-center items-center gap-3">
                    {!post?.likes?.includes(userData._id) ? <FaRegHeart onClick={handleLike} className='text-[26px] cursor-pointer'/>: <FaHeart onClick={handleLike}  className='text-[26px] text-red-600' />}
                    <span className='text-[22px] '>{post?.likes?.length}</span>
                </div>
                {/* comment */}
                <div onClick={() => setShowComment(prev => !prev)} className="flex justify-center items-center gap-3">
                    <FaRegComment className='text-[26px] cursor-pointer' />
                    <span className='text-[22px] '>{post?.comments?.length}</span>
                </div>
            </div>
                {/* bookmark */}
            <div className="">
                {userData?.saved?.includes(post._id) ? <FaBookmark className='text-[26px] cursor-pointer'/> :  <FaRegBookmark className='text-[26px] cursor-pointer' />}
            </div>
        </div>
        {
        post?.caption && 
        <div className="w-full px-5 flex justify-start items-center gap-4 ">
            <h1 className='font-semibold'>{post?.author?.userName}</h1>
            <div className="">{post?.caption}</div>
        </div>
        }
        {showComment && <div className='w-full flex flex-col gap-6 pb-5'>
            <div className='w-full h-20 flex items-center justify-between px-5 relative'>
                <div className='w-10 h-10 lg:w-12.5 lg:h-12.5 border-2 border-black/50 rounded-full cursor-pointer overflow-hidden'>
                    <img src={userData?.profileImage || "EmptyDP.jpg"} alt="profile" className='w-full object-cover'/>
                </div>
                <input onChange={(e) => setMessage(e.target.value)} value={message} placeholder='Write your comment' type="text" className='px-2.5 mx-4 border-b-2 border-b-gray-500 flex-1 outline-none h-10' />
                <button className='cursor-pointer text-2xl'>
                    <IoSend onClick={handleComment}/>
                </button>
            </div>
            <div className='w-full max-h-[300px] overflow-auto'>
                {post.comments?.map((comment,index) => (
                    <div key={index}>
                        <div className='w-10 h-10 lg:w-12.5 lg:h-12.5 border-2 border-black/50 rounded-full cursor-pointer overflow-hidden'>
                            <img src={comment?.author?.profileImage || "EmptyDP.jpg"} alt="profile" className='w-full object-cover'/>
                        </div>
                        <div>{comment.message}</div>
                    </div>
                ))}
                
            </div>
        </div>
        }
    </div>
  )
}

export default Post