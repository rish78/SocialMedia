const Post = require("../models/posts");

const {getNextSequenceValue} = require("../utils/increment");

exports.makePost = async (req, res) => {
    var post_id = await getNextSequenceValue("postId");
    const newPost = new Post({
        _id: post_id,
        ...req.body
    });
    
  try {
    const posted = await newPost.save();
    res.status(200).json(posted);
  } catch (err) {
      console.log(err);
    res.status(500).json(err);
  }
}

exports.deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        
        if (post.userId == req.body.userId){
            await post.deleteOne();
            res.status(200).json("Post has been deleted!");
        }
        else{
            res.status(404).json("Cannot delete this post!");
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}