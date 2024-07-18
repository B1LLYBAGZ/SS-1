// postRoutes.js
const express = require("express");
const router = express.Router();
const { Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  const posts = await Post.findAll({ include: [Comment] });
  res.render("home", { posts });
});

router.post("/", async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId,
    });
    res.redirect("/posts");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/:postId/comments", async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      postId: req.params.postId,
    });
    res.redirect("/posts");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
