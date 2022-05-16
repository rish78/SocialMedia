const Post = require("../models/posts");
const User = require("../models/users");

exports.getSinglePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post)
            res.status(200).json(post);
        else
            res.status(400).json("Post with given id does not exist.");
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getAllPosts = async (req, res) => {
    try{
        const user = await User.findById(req.body.userId);
        const allPosts = await Post.find({userId : user._id});
        res.status(200).json(allPosts);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}