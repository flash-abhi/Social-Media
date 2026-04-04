import {Navigate, Route,Routes} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import {ToastContainer} from "react-toastify"
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector } from "react-redux";
import useCurrentUser from "./hooks/getCurrentUser";
import useSuggestedUser from "./hooks/getSuggestedUser";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Upload from "./pages/Upload";
import useAllPost from "./hooks/getAllPosts";
export const serverUrl = "http://localhost:8000"

function App() {
  useCurrentUser();
  useSuggestedUser();
  useAllPost();
  const {userData} = useSelector((state) => state.user);
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/signup" element={!userData?<SignUp/>:<Navigate to={"/"}/>} />
      <Route path="/signin" element={!userData?<SignIn/>:<Navigate to={"/"}/>} />
      <Route path="/forgot-password" element={!userData?<ForgotPassword/>:<Navigate to={"/"}/>} />
      <Route path="/" element={userData?<Home/>:<Navigate to={"/signin"}/>}/>
      <Route path="/profile/:userName" element={userData?<Profile/>:<Navigate to={"/signin"}/>}/>
      <Route path="/editprofile" element={userData?<EditProfile/>:<Navigate to={"/signin"}/>}/>
      <Route path="/upload" element={userData?<Upload/>:<Navigate to={"/signin"}/>}/>
    </Routes>
    </>
  )
}

export default App
