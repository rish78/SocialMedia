const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    _id: {type:Number},
    userId: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        max: 500,
      },
      title: {
        type: String,
        max: 100,
      },
      likes: {
          type: Number,
          default: 0,
      },
      likedBy: {
        type: Array,
        default: [],
      },
      comments: {
        type: Array,
        default: [],
      }
    },
    { 
        timestamps: true 
});

module.exports = mongoose.model("Post", PostSchema);