const express = require('express')
const router =express.Router() 
const Reservation = require('../models/reservation.js')
const User =require('../models/user.js')
const Room  = require('../models/room.js')
router.get('/',async(req,res)=>{
    const reservations = await Reservation.find().populate("author","username").populate("room").exec()
    res.status(200).json(reservations)
})
router.post('/add', async (req,res)=>{
    const {authorid , roomid , duration} = req.body ;
    const user = await User.findById({"_id" :   authorid}) 
    console.log(user);
    const  room = await Room.findById({"_id" :   roomid})
try {
if (!user){
    res.status(404).json({
        "message" :"user not found"
    })
    
}
 else if (!room){
    res.status(404).json({
        "message" :"room not found"
    }) 


}
else if (  await Reservation.findOne({"room": room._id})
){res.status(400).json({"message":"room already taken"})}

else {const   savedreservation  =await  new Reservation({"author" : user._id , "room" : room._id,duration}).save() 
res.json(savedreservation)}
 

}catch(err){console.log(err.message)
res.status(400).json({"error type ": err.name , "message": err.message})}



   

})



module.exports = router 