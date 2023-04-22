const express = require("express");
const { protector } = require("./../middleware/authMiddleware");
const {
  sendMessage,
  allMessages,
} = require("./../controllers/messageController");

const router = express.Router();

router.post("/", protector, sendMessage);
router.get("/:chatId", protector, allMessages);

module.exports = router;
