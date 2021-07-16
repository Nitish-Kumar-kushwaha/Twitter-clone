const express = require("express");
const router = express.Router();
const Post = require("../../models/posts");
const { isLoggedIn } = require("../../middleware");

//TO get all the post
router.get("/api/post", isLoggedIn, async (req, res) => {
  const posts = await Post.find({}).populate("postedBy");

  res.json(posts);
});

//To add the add new post

router.post("/api/post", isLoggedIn, async (req, res) => {
  console.log(req.body);
  const post = {
    content: req.body.content,
    postedBy: req.user.username,
  };

  const newPost = await Post.create(post);
  res.json(newPost);
});

module.exports = router;
