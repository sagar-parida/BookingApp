const router = require("express").Router();
const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
const { verifyAdmin, verfiyUser } = require("../utils/verfiyToken");

// GET ALL USERS
router.get("/", verifyAdmin, getUsers);

// GET SINGLE USER
router.get("/:id", verfiyUser, getUser);

// UPDATE USER
router.put("/:id", verfiyUser, updateUser);

// DELETE USER
router.delete("/:id", verfiyUser, deleteUser);

module.exports = router;
