const express = require("express");
const Reservation = require("../models/reservation.js");
const jwt = require("../jwt/jwtUtils.js");
const mailservice = require("../notificationmanager/mailservice.js");
const moment = require("moment");



const reservationController = {
getallreservations :  async (req, res) => {
  const reservations = await Reservation.find()
    .populate("owner", "username")
    .populate("room")
    .exec();
  res.status(200).json(reservations);
} , 
getreservationbyid : async(req,res) => {

try {
  const res_id = req.params.id 
  const reservation = await  Reservation.findById(res_id) 
  if (reservation) { 
    res.status(200).json(reservation)
  }else {res.status(400).json({"message":"invalid reservation id "})}
}catch(err){res.status(400).json({"message": err.message})}

} ,
//TODO
deletereservationbyid  : async(req,res) => {
  try {
    const res_id = req.params.id 
    const reservation = await  Reservation.findById(res_id) 
    if (reservation) { 
      await Reservation.findByIdAndDelete(res_id) 
      res.status(200).json({"message":"deleted"})
    }else {res.status(400).json({"message":"invalid reservation id "})}
  }catch(err){res.status(400).json({"message": err.message})}
  

} ,

reservationbyuserid : async (req,res) => {
  try {
    const userid = req.params.id
const reservations =await  Reservation.find({owner : userid})
console.log(reservations);
res.status(200).json(reservations)

  }catch(err){res.status(400).json({"message":err.message})}
} ,

 addreservation :  async (req, res) => {
    const user = req.user;
    const room_id = req.body.roomid;
    const req_duration = req.body.duration;
    const startedAt = moment(req.body.started);
    const endedAt = startedAt.clone().add(req_duration, "days");

    //console.log(startedAt.toDate());

    const existingReservations = await Reservation.find({
      $or: [
        {
          started: { $lte: startedAt.toDate() },
          ended: { $gte: startedAt.toDate() },
        },
        {
          started: { $lte: endedAt.toDate() },
          ended: { $gte: endedAt.toDate() },
        },
      ],
    });
    //console.log(existingReservations);
    if (existingReservations.length === 0) {
      const reservation = await new Reservation({
        owner: user._id,
        room: room_id,
        started: startedAt.toDate(),
        duration: req_duration,
      }).save();

      //console.log(reservation)
      //create a token to send
      const token = jwt.generateToken_comfirm(reservation);
      //crete the email body
      const mailOptions = mailservice.comfiramtion_mail(user, token);
      //send the mail
      await mailservice.sendMail(mailOptions);
      res
        .status(201)
        .json({
          message: "added ,email comfirmation sended ",
          reservation: reservation,
        });
    } else {
      res.status(400).json({ message: "periode already taken" });
    }
  },


confirmToken :  async (req, res) => {
  const token = req.params.token;
  const data = jwt.verifytoken(token);
  if (data.valid) {
    console.log(data.payload.resid);
    const reservation = await Reservation.findByIdAndUpdate(
      data.payload.resid,
      { validation: true },
    );
    res.send("<h1> COMFIRMED </h1>");
  } else {
    res.send("<h> ERROR </h1>");
  }
},
//TODO 
updateReservation :  async (req, res) => {} }

module.exports = reservationController;
