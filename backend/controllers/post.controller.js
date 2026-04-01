import uploadOnCloudinary from "../config/cloudinary";
import Post from '../models/post.model';
import User from "../models/user.model";

export const uploadPost = async (req,res) => {
    try {
        const {caption,mediaType} = req.body;
        // Process the uploaded post   
        let media ;
        if(req.file) {
            media = await uploadOnCloudinary(req.file.path);
        }else{
            return res.status(400).json({message: "Media is required !"});
        }
        const post = await Post.create({
            caption,
            media,
            mediaType,
            author:req.userId
        });
        const user = await User.findById(req.userId);
        user.posts.push(post._id);
        await user.save();
        const populatedPost = await Post.findById(post._id).populate("author","name userName profileImage");
        return res.status(201).json( populatedPost);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate("author","name userName profileImage").sort({createdAt:-1});
        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}