const Post = require("../models/posts");


const {getNextSequenceValue} = require("../utils/increment");

exports.addComment = async (req, res) => {
    var comment_id = await getNextSequenceValue("commentId");
    try{
        const post = await Post.findById(req.params.id);
        await post.updateOne({
            $push: {
                comments: {
                    commentId : comment_id,
                    userId: req.body.userId,
                    comment: req.body.comment
                }
            }
        });
        res.status(200).json(comment_id);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}