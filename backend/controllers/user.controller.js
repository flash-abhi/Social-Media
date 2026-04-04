import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).populate("posts loops").select("-password");
        if(!user){
            return res.status(400).json({message: "User Not Found !"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: "Get current user Error !"});
    }
}

export const suggestedUser = async (req,res) => {
    try {

        const users = await User.find({
            _id: {
                $ne: req.userId
            }
        }).select("-password");
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({message: "No users"});
    }
}

export const editProfile = async (req,res) => {
    try {
        const { name, userName, bio, profession, gender} = req.body;
        const user = await User.findById(req.userId).select("-password");
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }
        const sameUserWithUserName = await User.findOne({userName}).select("-password");
        if(sameUserWithUserName && sameUserWithUserName._id.toString() != req.userId) {
            return res.status(400).json({message: "Username Already Exists !"});
        }
        let profileImage ;
        if(req.file){
            profileImage = await uploadOnCloudinary(req.file.path);
        }
        user.name = name;
        user.userName = userName;
        if(profileImage){
            user.profileImage = profileImage;
        }
        user.bio = bio;
        user.profession = profession;
        user.gender = gender;
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({message: "Profile Edit Failed !"});
    }
}

export const getProfile = async (req,res) => {
    try {
        const userName = req.params.userName;
        const user = await User.findOne({userName}).select("-password");
        if(!user){
            return res.status(400).json({message: "Username Already Exists"});
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({message: "Get Profile Error !"});
    }
}

export const follow = async (req,res) => {
    try {
        const currentUserId = req.userId;
        const targetUserId = req.params.targetUserId;

        if(!targetUserId){
            return res.status(400).json({message: "Target user not found"});
        }
        if(currentUserId === targetUserId){
            return res.status(400).json({message: "You cannot follow yourself"});
        }
        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);
        
        const isFollowing = currentUser.following.includes(targetUserId);

        if(isFollowing){
            currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId.toString());
            targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId.toString());
            await currentUser.save();
            await targetUser.save();
            return res.status(200).json({following: false, message: "unfollowed successfully"});
        }else{
            currentUser.following.push(targetUserId);
            targetUser.followers.push(currentUserId);
            await currentUser.save();
            await targetUser.save();
            return res.status(200).json({following: true, message: "followed successfully"});
        }
        
    } catch (error) {
        return res.status(500).json({message: "Follow user error"});
    }
}