import { useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom'
import { LuCirclePlus } from "react-icons/lu";
import VideoPlayer from '../components/VideoPlayer';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setPostData } from '../redux/postSlice';
import { setStoryData } from '../redux/storySlice';
import { setLoopData } from '../redux/loopSlice';
import { PulseLoader } from 'react-spinners';

const Upload = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploadType,setUploadType] = useState("post");
    const [frontendMedia, setFrontendMedia] = useState(null);
    const [backendMedia, setBackendMedia] = useState(null);
    const mediaInput = useRef();
    const [mediaType, setMediaType] = useState(null);
    const [caption, setCaption] = useState("");
    const dispatch = useDispatch();
    const {postData} = useSelector((state) => state.post);
    const {storyData} = useSelector((state) => state.story);
    const {loopData} = useSelector((state) => state.loop);
    const handleMedia = (e) => {
        const file = e.target.files[0];
        if(file.type.includes("image")){
            setMediaType("image");
        } else if(file.type.includes("video")){
            setMediaType("video");
        }
        setBackendMedia(file);
        setFrontendMedia(URL.createObjectURL(file));
    }

    const uploadPost = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("caption",caption);
            formData.append("mediaType",mediaType);
            formData.append("media", backendMedia);
            const result = await axios.post(`${serverUrl}/api/post/upload`,formData,{withCredentials:true});
            setLoading(false);
            dispatch(setPostData([...postData,result.data]))
            toast.success("Upload Successful!");
            navigate(`/`);
        } catch (error) {
            setLoading(false);
            toast.error("Upload Failed !");
            console.log(error);
        }
    }

    const uploadStory = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("mediaType",mediaType);
            formData.append("media", backendMedia);
            const result = await axios.post(`${serverUrl}/api/story/upload`,formData,{withCredentials:true});
            // console.log(result);
            setLoading(false);
            navigate(`/`);
            dispatch(setStoryData([...storyData,result.data]))
            toast.success("Upload Successful!");
        } catch (error) {
            setLoading(false);
            toast.error("Upload Failed !");
            console.log(error);
        }
    }

    const uploadLoop = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("caption",caption);
            formData.append("media", backendMedia);
            const result = await axios.post(`${serverUrl}/api/loop/upload`,formData,{withCredentials:true});
            // console.log(result);
            setLoading(false);
            navigate(`/`);
            dispatch(setLoopData([...loopData,result.data]))
            toast.success("Upload Successful!");
        } catch (error) {
            setLoading(false);
            toast.error("Upload Failed !");
            console.log(error);
        }
    }

    const handleUpload = () => {
        if(uploadType === "post"){
            uploadPost();
        } else if(uploadType === "story"){
            uploadStory();
        } else {
            uploadLoop();
        }
    }

  return (
    <div className='w-full h-screen bg-black flex flex-col items-center'>
        <div className='w-full h-20 flex items-center gap-5 px-5'>
            <IoIosArrowBack onClick={() => navigate(`/`)} className='text-white  cursor-pointer w-[25px] h-[25px]' />
            <h1 className='text-white text-[20px] font-semibold'>Upload Media</h1>
        </div>

        <div className='w-[90%] max-w-150 h-20 bg-white rounded-full flex justify-around items-center gap-2.5'>
            <div onClick={() => setUploadType("post")} className={`${uploadType === "post" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl transition duration-300 hover:shadow-black`}>Post</div>
            <div onClick={() => setUploadType("story")} className={`${uploadType === "story" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl transition duration-300 hover:shadow-black`}>Story</div>
            <div onClick={() => setUploadType("loop")} className={`${uploadType === "loop" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl transition duration-300 hover:shadow-black`}>Loop</div>
        </div>

        {
            !frontendMedia ? 

            <div onClick={() => mediaInput.current.click()} className='w-[80%] max-w-[500px] h-[250px] cursor-pointer bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]'>
            <input type="file" onChange={handleMedia} name="" id="" accept='*' ref={mediaInput} hidden />
            <LuCirclePlus className='text-white cursor-pointer text-4xl'/>
            <div className='font-semibold text-white text-[19px]'>
                upload {uploadType}
            </div>
        </div>
        : 
        <div className='w-[80%] max-w-125 h-62.5 flex flex-col items-center justify-center mt-[15vh]'>
            {mediaType === "image" &&
            <div className='w-[80%] max-w-125 h-62.5 flex flex-col items-center justify-center mt-[5vh]'>
                <img src={frontendMedia} alt="media" className='h-[80%] rounded-2xl' />
               {uploadType != "story" && <input type="text" onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='Enter caption...' className='w-full border-b-gray-400 border-b-2 outline-none px-2.5 py-1.25 text-white mt-5' />}
            </div>
            }
            {
            mediaType === "video" &&
          <div className='w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]'>
                <VideoPlayer media={frontendMedia}/>
               {uploadType != "story" && <input type="text" onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='Enter caption...' className='w-full border-b-gray-400 border-b-2 outline-none px-2.5 py-1.25 text-white mt-5' />}
            </div>
            }
            {frontendMedia && <button onClick={handleUpload} className='px-2.5 w-full max-w-[400px] hover:bg-white/80 hover:transition hover:delay-75 font-semibold py-2 h-[50px] bg-white mt-[50px] cursor-pointer rounded-2xl'>{loading? <PulseLoader />: `Upload ${uploadType}` }{}</button>}
        </div>
        }
    </div>
  )
}

export default Upload