const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
};

const validatePassword = (savedPwd, userPwd) => {
  if (savedPwd === userPwd) {
    return true;
  } else {
    return false;
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exist");
  }
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    pic: req.body.pic,
  });
  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
      token: jwtToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("email or password is not provided");
  }
  const user = await User.findOne({ email });
  if (!user || !validatePassword(user.password, password)) {
    throw new Error("email or password didn't match");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    token: jwtToken(user._id),
  });
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search;
  const user = await User.find({
    $and: [{ _id: { $ne: req.user._id } }],
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  }).select("-password");
  if (user) {
    res.status(200).json({
      user,
    });
  }
});

module.exports = { registerUser, loginUser, allUsers };
