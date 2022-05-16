const Post = require("../models/posts");
const User = require("../models/users");

exports.likePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.body.userId);

        if(!post.likedBy.includes(user.username)){
            await post.updateOne({
                $push: {likedBy: user.username},
                $inc: {likes: 1}
            });

            res.status(200).json("Post liked!");
        }
        else{
            res.status(400).json("You have already liked this post!");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.unlikePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.body.userId);

        if(post.likedBy.includes(user.username)){
            await post.updateOne({
                $pull: {likedBy: user.username},
                $inc: {likes: -1}
            });
            res.status(200).json("Post unliked!");
        }
        else{
            res.status(400).json("You cannot unlike this post!");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}