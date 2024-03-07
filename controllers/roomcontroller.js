const express = require("express");
const router = express.Router();
const Room = require("../models/room.js");

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(400).json({ "error type": err.name, message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ "error type": err.name, message: err.message });
  }
});
router.post("/add", async (req, res) => {
  try {
    const { roomNumber, roomBeds, floor } = req.body;
    const room = new Room({ roomNumber, roomBeds, floor });

    await Room.create(room);
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ "error type": err.name, message: err.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const room = await Room.findByIdAndDelete(id);

    if (room) {
      res.status(200).json({ message: "deleted" });
    } else {
      res.status(404).json({ message: "room not found" });
    }
  } catch (err) {
    res.status(400).json({ "error type": err.name, message: err.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedRoom) {
      res.json(updatedRoom);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(400).json({ "error type": error.name, message: error.message });
  }
});

module.exports = router;
