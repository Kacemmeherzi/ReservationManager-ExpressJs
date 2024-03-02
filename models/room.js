const mongoose = require('mongoose');

const roomshema = new mongoose.Schema ({
    roomNumber : {type : String ,required : true},
    roomBeds  : {type : String , required : true},
    floor : {type : String ,required : true }
},{collection : "rooms"})
const  Room = mongoose.model("Room",roomshema);
module.exports = Room ;