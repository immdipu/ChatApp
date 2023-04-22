const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const asyncHandler = require("express-async-handler");

const protector = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      res.status(400);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(400);
    throw new Error("Not authorized, token failed");
  }
});

module.exports = { protector };
