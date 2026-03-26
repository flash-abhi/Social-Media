import { useState } from "react"
import axios from "axios";
import { serverUrl } from "../App";
import {toast} from "react-toastify";
import {PulseLoader} from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const SignIn = () => {
    const [inputClicked, setInputClicked] = useState({
        userName: false,
        password: false
    });
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const handleSignIn = async () => {
        try {
            if(!userName){
                setError("Username is Required !");
                return;
            }
            if(!password){
                setError("Password is Required !");
                return;
            }
            setLoading(true);
            const result = await axios.post(serverUrl+`/api/auth/signin`,{password,userName},{withCredentials:true});
            if(result){
                toast.success("Signin Successfull !!");
                setLoading(false);
                dispatch(setUserData(result.data));
            }

            setPassword("");
            setUserName("");
            navigate("/");
        } catch (error) {
            setError(error?.response?.data?.message);
            setLoading(false);
        }
    }
  return (
      <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
        <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden boder-2 border-[#1a1f23]'>
            {/* left side */}
            <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-2.5 gap-5'>
                <div className='flex gap-[10px] items-center text-[20px] justify-center font-semibold mt-[40px]'>
                    <span className="text-3xl">Sign In to </span>
                    <img src="black-logo.png" alt="" className='w-[60px]' />
                </div>
                
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                onClick={() =>setInputClicked({...inputClicked,userName:true})}
                >
                    <label htmlFor="username" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.userName?"top-[-16px]":""}`}>Enter Your Username</label>
                    <input type="text" id='username' value={userName} onChange={(e) => setUserName(e.target.value)} className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required/>
                </div>
                
                <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black'
                onClick={() =>setInputClicked({...inputClicked,password:true})}
                >
                    <label htmlFor="password" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.password?"top-[-16px]":""}`}>Enter Your Password</label>
                    <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required/>
                </div>
                <div onClick={() => navigate("/forgot-password")} className="w-[90%] px-2 cursor-pointer font-semibold text-gray-600">Forgot password</div>
                <div className="text-red-600">
                    {error}
                </div>
                <button 
                disabled={loading}
                onClick={() => {
                    if(userName || password) {handleSignIn();}
                }} className={`${loading ? "cursor-not-allowed":"cursor-pointer"} w-[90%] px-5 py-2.5 bg-black text-white font-semibold h-[50px] rounded-2xl`}>{loading?<PulseLoader size={10} color="#ffffff"/>:"Sign In"}
                </button>
                <p>Want to create a new account ? <span className="border-b-2 border-b-black font-semibold pb-[3px] text-black cursor-pointer" onClick={() => navigate("/signup")}>sign up</span></p>
            </div>
            {/* right side */}
            <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-2.5 text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>
                <img src="white-logo.png" className="w-[40%]" alt="" />
                <p>Start your journey by creating loopes.</p>
            </div>
        </div>
    </div>
  )
}

export default SignIn