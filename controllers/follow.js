const User = require("../models/users");

exports.follow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try{
            const followingUser = await User.findById(req.body.userId);
            const followedUser = await User.findById(req.params.id);
            const followedUsername = followedUser.username;
            const followingUsername = followingUser.username;
            if(!followedUser.followers.includes(followingUsername)){
                await followedUser.updateOne({ $push : {followers: followingUsername}, $inc: {follower_count: 1}});
                await followingUser.updateOne({ $push : {following: followedUsername}, $inc: {following_count: 1}});
                res.status(200).send("User followed!");
            }else{
                res.status(400).json("you allready follow this user");
            }
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("you cant follow yourself");
    }
}

exports.unfollow = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try{
            const unfollowingUser = await User.findById(req.body.userId);
            const unfollowedUser = await User.findById(req.params.id);
            const unfollowedUsername = unfollowedUser.username;
            const unfollowingUsername = unfollowingUser.username;
            if(unfollowedUser.followers.includes(unfollowingUsername)){
                await unfollowedUser.updateOne({ $pull : {followers: unfollowingUsername}, $inc: {follower_count: -1}});
                await unfollowingUser.updateOne({ $pull : {following: unfollowedUsername}, $inc: {following_count: -1}});
                res.status(200).send("User unfollowed!");
            }else{
                res.status(400).json("you dont follow this user");
            }
        }catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("you cant unfollow yourself");
    }
}