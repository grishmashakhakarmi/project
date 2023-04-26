const Post = require("../models/post");
const { validationResult } = require("express-validator");
const {addToNearSchema}  = require("./near")
exports.postCreate = (req, res) => {
  req.body.user = req.profile;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  let post = new Post(req.body);
  post.save((err, post) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "Error occured while saving post " });
    }
    const {_id, coordinates} = post
    const authorId = post.user._id
    // save calculated distance of given post and user  to Near schema
    addToNearSchema({_id, coordinates, authorId})
    return res.json(post);
  });
};

exports.postUpdate = (req, res) => {
  // raise error if post user id doesnt match with authenticated user id
  postUserId = Post.findById(req.params.postId).exec((err, post) => {
    if (err || !post) {
      return res.status(403).json({ error: "Post doesnt exists" });
    }
    if (post.user._id.toString() !== req.auth._id) {
      return res.status(403).json({ error: "Unauthenticated" });
    }
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  req.body.user = undefined;
  Post.findOneAndUpdate(
    req.params.postId,
    req.body,
    { new: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send({ success: "Succesfully updated" });
    }
  );
};

exports.postDelete = (req, res) => {
  // raise error if post user id doesnt match with authenticated user id
  post = Post.findById(req.params.postId).then((post, err) => {
    if (err || !post) {
      return res.status(403).json({ error: "Post doesnt exists" });
    }
    if (post.user._id.toString() !== req.auth._id) {
      return res.status(403).json({ error: "Unauthenticated" });
    }
    if (post) {
      post.remove((err, deletedPost) => {
        if (err)
          res
            .status(400)
            .json({ error: "Something error occured while deleting post" });
      });
      res.json({
        success: true,
        message: "Successfully deleted",
      });
    }
  });
};

exports.postList = (req, res) => {
  Post.find().exec(function (err, post) {
    res.json({ posts: post });
  });
};

exports.postListById = (req, res) => {
  const uid = req.params.userId
  Post.find({user: uid}).exec(function (err, post) {
    res.json({ posts: post });
  });
};
