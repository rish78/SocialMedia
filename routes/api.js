const express = require('express');
const router = express.Router();
const User = require("../models/users");

const {login} = require("../controllers/login");
const {getSelf} = require("../controllers/getUser");
const {getUser} = require("../controllers/getUser");
const {follow} = require("../controllers/follow");
const {unfollow} = require("../controllers/follow");
const {makePost} = require("../controllers/post");
const {deletePost} = require("../controllers/post");
const {likePost} = require("../controllers/like");
const {unlikePost} = require("../controllers/like");
const {getSinglePost} = require("../controllers/getPost");
const {getAllPosts} = require("../controllers/getPost");
const {addComment} = require("../controllers/comment");

const {getNextSequenceValue} = require("../utils/increment");

const {verifym} = require("../middleware/authmiddleware");

router.post("/register", async (req, res) => {
  var user_id = await getNextSequenceValue("userId");
    try {
        console.log("registering user");
      const newUser = new User({
        _id: user_id,
        username: req.body.username,
        email: req.body.email
      });
      
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err)
    }
  });


router.post('/authenticate', login);

router.get('/user', verifym, getSelf);
router.get('/user/:id', getUser);
router.post('/follow/:id', verifym, follow);
router.post('/unfollow/:id', verifym, unfollow);


router.post('/posts',verifym, makePost);
router.delete('/posts/:id', verifym, deletePost);

router.post('/like/:id', verifym, likePost);
router.post('/unlike/:id', verifym, unlikePost);

router.get('/posts/:id', getSinglePost);
router.get('/all_posts', verifym, getAllPosts);

router.post('/comment/:id', verifym, addComment);

module.exports = router;