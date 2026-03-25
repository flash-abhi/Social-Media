import  { useState } from 'react'
import { PulseLoader } from 'react-spinners';
import { TiTick } from "react-icons/ti";
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [step,setStep] = useState(1);
    const [inputClicked,setInputClicked] = useState({email: false, otp: false, newPassword: false, confirmPassword: false});
    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState(false);
    const [loading,setLoading] = useState(false);
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleStep1 = async () => {
        try {
            setLoading(true);
            const result = await axios.post(serverUrl+`/api/auth/sendOtp`,{email},{withCredentials:true});
            setStep(2);
            console.log(result);
            setLoading(false);
            toast.success("OTP Send !");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            setLoading(false);
        }
    }

    const handleStep2 = async () => {
        try {
            setLoading(true);
            const result = await axios.post(serverUrl+`/api/auth/verifyOtp`,{email,otp},{withCredentials:true});
            console.log(result);
            toast.success(result?.data?.message)
            setStep(3);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message);

        }
    }

    const handleStep3 = async () => {
        try {
            setLoading(true);
            const result = await axios.post(serverUrl+`/api/auth/resetPassword`,{email,password:newPassword},{withCredentials:true});
            toast.success(result?.data?.message);
            console.log(result);
            navigate("/signin");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error?.response?.data?.message);
        }
    }

  return (
    <div className='w-full  h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
        {/* step 1 */}
        { step == 1 &&
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white  rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
            <h2 className='text-[30px] font-semibold'>Forgot Password</h2>
            <div className='relative flex items-center justify-start w-[90%] h-[50px] mt-6 rounded-2xl border-2 border-black'
                onClick={() =>setInputClicked({...inputClicked,email:true})}
                >
                    <label htmlFor="email" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.email?"top-[-16px]":""}`}>Enter Your Email</label>
                    <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required/>
            </div>
            <button 
                onClick={handleStep1}
                disabled={loading}
                className={`${loading ? "cursor-not-allowed":"cursor-pointer"} w-[90%] px-5 py-2.5 bg-black text-white font-semibold h-[50px] mt-6 rounded-2xl`}>{loading?<PulseLoader size={10} color="#ffffff"/>:"Sign In"}
            </button>
        </div>
        }
        {/* step 2 */}
        {step == 2 &&
          <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
            <h2 className='text-[30px] font-semibold'>Enter the otp</h2>
            <div className='relative flex items-center justify-start w-[90%] h-[50px] mt-6 rounded-2xl border-2 border-black'
                onClick={() =>setInputClicked({...inputClicked,otp:true})}
                >
                    <label htmlFor="otp" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.otp?"top-[-16px]":""}`}>Enter Your Otp</label>
                    <input type="text" id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required/>
            </div>
            <button 
                onClick={handleStep2}
                disabled={loading}
                className={`${loading ? "cursor-not-allowed":"cursor-pointer"} w-[90%] px-5 py-2.5 bg-black text-white font-semibold h-[50px] mt-6 rounded-2xl`}>{loading?<PulseLoader size={10} color="#ffffff"/>:"Submit"}
            </button>
          </div>
        }
        {/* step 3 */}
        {step == 3 && 
            <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]'>
            <h2 className='text-[30px] font-semibold'>Reset Password</h2>
            <div className='relative flex items-center justify-start w-[90%] h-[50px] mt-6 rounded-2xl border-2 border-black'
                onClick={() =>setInputClicked({...inputClicked,newPassword:true})}
                >
                    <label htmlFor="newPassword" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.newPassword?"top-[-16px]":""}`}>Enter New Password</label>
                    <input type="text" id='newPassword' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='w-[100%] h-[100%] rounded-2xl px-[20px]  outline-none border-0' required/>
            </div>
            <div className='relative flex items-center justify-start w-[90%] h-[50px] mt-6 rounded-2xl border-2 border-black'
                onClick={() =>setInputClicked({...inputClicked,confirmPassword:true})}
                >
                    <label htmlFor="confirmPassword" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${inputClicked.confirmPassword?"top-[-16px]":""}`}>Confirm Password</label>
                    <input type="text" id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0' required/>
            </div>
                
           {confirmPassword && newPassword && confirmPassword == newPassword ? <div className='mt-4 text-md font-semibold w-[90%] px-4 text-green-600 flex items-center gap-1'>Password Matches <TiTick className='text-2xl'/>
            </div>:false
            }
            <button 
                onClick={handleStep3}
                disabled={loading}
                className={`${loading ? "cursor-not-allowed":"cursor-pointer"} w-[90%] px-4 py-2.5 bg-black text-white font-semibold h-[50px] mt-4 rounded-2xl`}>{loading?<PulseLoader size={10} color="#ffffff"/>:"Reset Password"}
            </button>
          </div>
        }
    </div>
  )
}

export default ForgotPassword;