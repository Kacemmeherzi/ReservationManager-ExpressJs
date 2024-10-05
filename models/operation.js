const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const operationshuma = new mongoose.Schema(
  {
    action: { type: String, required: true,unique : false },
    reservationid: { type: String, unique: false, required: true },
    token: { type: String, unique: false, required: true },
    content : {type : String , required : false}
  },
  { collection: "operations" },
);



const Operation = mongoose.model("Operation", operationshuma);
module.exports = Operation;