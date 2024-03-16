const Reservation = require("../models/reservation");
const Room = require("../models/room");
const User = require("../models/user");

async function verif_user(req, res, next) {
  const req_userid = req.body.userid;
  const user = await User.findById(req_userid);
  if (user) {
    req.user = user;
    console.log(user);
    next();
  } else {
    res.status(400).json({ message: "userid not found" });
  }
}

async function verif_room(req, res, next) {
  const roomid = req.body.roomid;
  const room = await Room.findById(roomid);
  if (room) {
    next();
  } else {
    res.status(400).json({ message: "roomid not found" });
  }
}

module.exports = { verif_room, verif_user };
