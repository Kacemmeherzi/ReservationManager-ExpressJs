const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation.js");
const User = require("../models/user.js");
const Room = require("../models/room.js");
const jwt = require ("../jwt/jwtUtils.js")
const mailservice =require ("../notificationmanager/mailservice.js")
router.get("/", async (req, res) => {
  const reservations = await Reservation.find()
    .populate("author", "username")
    .populate("room")
    .exec();
  res.status(200).json(reservations);
});
router.post("/add", async (req, res) => {
  const { authorid, roomid, duration } = req.body;
  const user = await User.findById({ _id: authorid });
  console.log(user);
  const room = await Room.findById({ _id: roomid });
  try {
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    } else if (!room) {
      res.status(404).json({
        message: "room not found",
      });
    } else if (await Reservation.findOne({ room: room._id })) {
      res.status(400).json({ message: "room already taken" });
    } else {
      const savedreservation = await new Reservation({
        author: user._id,
        room: room._id,
        duration,
      }).save();
      const token = jwt.generateToken_comfirm(savedreservation._id)
      const mailOptions = mailservice.comfiramtion_mail(user,token)
      await mailservice.sendMail(user.email,mailOptions)
      res.status(201).json({  "reservation": savedreservation});

    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ "error type ": err.name, message: err.message });
  }
});
router.get("/confirm/:token",async(req,res)=>{
    
    const token = req.params.token
    const  data = jwt.verifytoken(token)
    if (data.valid){
        console.log(data.payload.resid);
     const reservation = await Reservation.findByIdAndUpdate(data.payload.resid,{"validation":true})
        res.send("<h1> COMFIRMED </h1>")
    }else {res.send("<h> ERROR </h1>")}
    
   
})

module.exports = router;
