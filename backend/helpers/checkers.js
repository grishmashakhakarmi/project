const { expressjwt: jwt } = require("express-jwt");
const User = require("../models/user");
const Post = require("../models/post");

exports.checkByUserId = (req, res, next, id) => {
  User.findById({ _id: id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    user.password_hash = undefined;
    req.profile = user;
    next();
  });
};

exports.checkByPostId = (req, res, next, id) => {
  Post.findById({ _id: id }).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({ error: "Post not found" });
    }
    next();
  });
};

exports.checkLoggedin =()=> jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],

});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.checkVerified = (req, res, next) => {
  verified = req.profile.is_verified;
  if (!verified) {
    return res.status(403).json({ error: "Email unverified" });
  }
  next();
};

exports.checkRole = (req, res, next) => {
  role = req.profile.role;
  if (role === 0) {
    return res.status(403).json({ error: "Admin access denied" });
  }
  next();
};
