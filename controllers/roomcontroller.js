const express = require("express");
const router = express.Router();
const Room = require("../models/room.js");
const Reservation = require('../models/reservation.js')
const roomController = {
getallrooms : async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(400).json({ "error type": err.name, message: err.message });
  }
 
},
getunreservedrooms : async (req ,res ) =>{
const reservations = await Reservation.find()
const rooms = await Room.find() 
const unreservedrooms = rooms.filter((room)=> !reservations.some(reservation=>reservation.room ===room._id))
res.status(200).json(unreservedrooms)

} ,
getroombyid :  async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ "error type": err.name, message: err.message });
  }
},
addroom : async (req, res) => {
  try {
    const { roomNumber, roomDesc , RoomName} = req.body;
    const room = new Room({ roomNumber, roomDesc, RoomName });

    await Room.create(room);
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ "error type": err.name, message: err.message });
  }
},
deleteroombyid :  async (req, res) => {
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
}, 

updateroombyid: async (req, res) => {
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
}}

module.exports = roomController;
