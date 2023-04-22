const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  RemoveFromGroup,
} = require("./../controllers/chatController");
const { protector } = require("./../middleware/authMiddleware");
const router = express.Router();

router.post("/", protector, accessChat);
router.get("/", protector, fetchChats);
router.post("/group", protector, createGroupChat);
router.put("/rename", protector, renameGroup);
router.put("/groupadd", protector, addToGroup);
router.put("/groupremove", protector, RemoveFromGroup);

module.exports = router;
