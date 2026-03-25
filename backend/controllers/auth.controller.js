import sendMail from "../config/mail.js";
import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req,res) => {
    try {
        const {name, email, password, userName} = req.body;
        if(password.length<6){
            return res.status(400).json({message: "Password Must be 6 character long !"})
        }
        const findByEmail = await User.findOne({email});
        if(findByEmail){
            return res.status(400).json({message: "Email already Exists !!"});
        }
        const findByUsername = await User.findOne({userName});
        if(findByUsername){
            return res.status(400).json({message: "Username already Exists !!"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,userName,email,password:hashPassword});
        const token =  await genToken(user._id);
        res.cookie("token",token,{
            httpOnly: true,
            maxAge: 10*24*60*60*1000,
            sameSite: "Strict",
            secure: false
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({message: "SignUp Controller Error"});
    }
}

export const signIn = async (req,res) => {
    try {
        const { password, userName} = req.body;
        const user = await User.findOne({userName});
        if(!user){
            return res.status(400).json({message: "Username Not Exists !!"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message: "Incorrect Password !!"});
        }
        const token = await genToken(user._id);
        
        res.cookie("token",token,{
            httpOnly: true,
            maxAge: 10*24*60*60*1000,
            sameSite: "Strict",
            secure: false
        });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "SignIn Controller Error"});
    }
}

export const signOut = async (req,res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message:"Sign Out Successfully"});
    } catch (error) {
        return res.status(500).json({message: "SignOut Controller Error"});
    }
}

export const sendOtp = async (req,res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "User not found"});
        } 
        const otp = Math.floor(1000 + Math.random()*9000).toString();
        user.resetOtp = otp;
        user.otpExpires =  Date.now() + 5*60*1000;
        user.isOtpVerify = false;

        await user.save();

        await sendMail(email,otp);

        return res.status(200).json({message: "Otp send successfully !"});
    } catch (error) {
        // console.log(error);
        return res.status(400).json({message: "OTP not send"});
    }
} 

export const verifyOtp = async(req,res) => {
    try {
        const {email,otp} = req.body;
        const user = await User.findOne({email});
        if(!user || user.resetOtp != otp || user.otpExpires < Date.now()){
            return res.status(400).json({message: "Your Otp is not valid Or Expired !"});
        }
        user.isOtpVerify = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        await user.save();
        return res.status(200).json({message: "Otp verified successfully"});

    } catch (error) {
        return res.status(400).json({message: "OTP Verification failed"});
    }
}

export const resetPassword = async (req,res) => {
    try {
        const {password,email } = req.body;
        const user = await User.findOne({email});
        if(!user || !user.isOtpVerify){
            return res.status(400).json({message: "OTP verification Required !"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        user.password = hashedPassword;
        user.isOtpVerify = false;
        await user.save();
        return res.status(200).json({message: "Password Changed Successfully !"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Password Changed Failed !"});
    }
} 