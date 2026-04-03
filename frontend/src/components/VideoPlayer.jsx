import { useRef, useState } from 'react'
import { FiVolume2, FiVolumeX } from "react-icons/fi";

const VideoPlayer = ({media}) => {
  const videoTag = useRef();
  const [mute, setMute] = useState(true);
  const [playing, setPlaying] = useState(true);

  const handleClick = () => {
    if(playing){
      videoTag.current.pause();
      setPlaying(false);
    } else {
      videoTag.current.play();
      setPlaying(true);
    }
  }
  
  return (
    <div className='h-full overflow-hidden relative cursor-pointer max-w-full rounded-2xl'>
        <video onClick={handleClick} ref={videoTag} src={media} autoPlay loop muted={mute} className='h-full cursor-pointer w-full object-cover rounded-2xl'></video>
      <div onClick={() => setMute(prev => !prev)} className='absolute bottom-2 right-2 text-gray-500 cursor-pointer' onClick={() => setMute(!mute)}>
          {!mute ?
          <FiVolume2 className='w-[22px] h-[22px] font-semibold'/>: 
          <FiVolumeX className='w-[22px] h-[22px] font-semibold'/>
          }
        </div>
    </div>
  )
}

export default VideoPlayer