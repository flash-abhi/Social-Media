import {Route,Routes} from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import {ToastContainer} from "react-toastify"
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
export const serverUrl = "http://localhost:8000"

function App() {

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/" element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
