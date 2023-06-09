const express = require("express");
const {
  registerUser,
  loginUser,
  allUsers,
} = require("./../controllers/userController");
const { protector } = require("./../middleware/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.get("/", protector, allUsers);
router.post("/login", loginUser);

module.exports = router;
