const router = require("express").Router();

const {
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailabilty,
  createRoom,
  deleteRoom,
} = require("../controllers/RoomController");
const { verifyAdmin } = require("../utils/verfiyToken");

// CREATE ROOM
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE ROOM
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availabilty/:id", verifyAdmin, updateRoomAvailabilty);

// DELETE ROOM
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// GET SINGLE ROOM
router.get("/:id", getRoom);

// GET ALL ROOMS
router.get("/", getRooms);

module.exports = router;
