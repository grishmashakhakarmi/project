const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");


exports.register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  let user = new User({
    full_name: req.body.full_name,
    email: req.body.email,
    password_hash: bcrypt.hashSync(req.body.password),
    blood_group: req.body.blood_group,
    coordinates: req.body.coordinates,
    role: 0,
    is_verified: false,
  });
  user.save((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "Something went wrong when registering user" });
    }
    user.password_hash = undefined;
    return res.json(user);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "Email doesnt exists, please register" });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password doesnt match" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    const { _id, full_name, email, coordinates, blood_group } = user;
    return res.json({ token, user: { _id, full_name, email, coordinates, blood_group } });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ success: true, message: "Successfuly logout" });
};
