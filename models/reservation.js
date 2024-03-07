const mongoose = require('mongoose')
const reservationshema = new mongoose.Schema({


    author : {type : mongoose.Schema.Types.ObjectId, ref : "User",required: true},

    room  : {type: mongoose.Schema.Types.ObjectId, ref : "Room",required : true},
    started : {type : Date , required : false ,default : Date.now} , 
    ended : {type : Date  },
    duration : {type : Number , required  : true }


   
},{collection : "reservations"}

)

reservationshema.pre('save' , async function  (next){
    if (this.duration && !this.yourDateField) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + this.duration);
          this.ended=currentDate;
         next()
      }
    })
const Reservation = mongoose.model("Reservation",reservationshema)
module.exports = Reservation 