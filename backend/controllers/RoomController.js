const Room = require("../model/Room");
const Hotel = require("../model/Hotel");
const createError = require("../utils/error");

const createRoom = async (req, res, next) => {
  try {
    const hotelid = req.params.hotelid;
    const newRoom = new Room(req.body);

    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelid, {
      $push: {
        rooms: savedRoom._id,
      },
    });
    res.status(201).json(savedRoom);
  } catch (error) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(err);
  }
};

const updateRoomAvailabilty = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status updated");
  } catch (error) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelid;
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelid, {
      $pull: {
        rooms: req.params.id,
      },
    });
    res.status(200).json("Room deleted successfully");
  } catch (error) {
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(err);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(err);
  }
};

module.exports = {
  getRoom,
  getRooms,
  createRoom,
  updateRoom,
  updateRoomAvailabilty,
  deleteRoom,
};
