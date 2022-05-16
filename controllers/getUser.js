const User = require("../models/users");

exports.getSelf = async (req, res) => {
    try{
        const user = await User.findById(req.body.userId);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}