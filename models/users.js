const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: {type:Number},
    username: {
        type: String,
        require: true,
        unique: true,
      },
      email: {
        type: String,
        require: true,
        unique: true,
      },
      followers: {
        type: Array,
        default: [],
      },
      following: {
        type: Array,
        default: [],
      },
      follower_count: {
          type: Number,
          default: 0,
      },
      following_count: {
        type: Number,
        default: 0,
    }
    
})

module.exports = mongoose.model("User", UserSchema);