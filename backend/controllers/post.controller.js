import uploadOnCloudinary from "../config/cloudinary.js";
import Post from '../models/post.model.js';
import User from "../models/user.model.js";

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
        return res.status(500).json({message: error, stack: error.stack});
    }
}

export const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate("author","name userName profileImage").populate("comments.author","name userName profileImage").sort({createdAt:-1});
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const like = async (req,res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post not found !"});
        }
        const alreadyLiked = post.likes.includes(req.userId);
        if(alreadyLiked){
            post.likes = post.likes.filter(id => id.toString() !== req.userId.toString());
        }else{
            post.likes.push(req.userId);
        }   
        post.populate("author","name userName profileImage");
        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const comment = async (req,res) => {
    try {
        const {message} = req.body;
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post not found !"});
        }

        post.comments.push({
            author: req.userId,
            message
        });
        await post.populate("author","name userName profileImage");
        await post.populate("comments.author");
        await post.save();
        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const saved = async (req,res) =>{
     try {
        const postId = req.params.postId;
        const user = await User.findById(req.userId);
        const post = await Post.findById(postId);
        if(!user){
            return res.status(404).json({message: "User not found !"});
        }
        if(!post){
            return res.status(404).json({message: "Post not found !"});
        }
        const alreadySaved = user.saved.includes(postId);
        if(alreadySaved){
            user.saved = user.saved.filter(id => id.toString() !== postId.toString());
        }else{
            user.saved.push(postId);
        }
        await user.save();
        user.populate("saved");
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}