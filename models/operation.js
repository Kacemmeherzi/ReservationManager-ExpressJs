const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const operationshuma = new mongoose.Schema(
  {
    op: { type: String, unique: false, required: true },
    reservationid: { type: String, unique: false, required: true },
    token: { type: String, unique: true, required: true },
    content : {type : String , required : false}
  },
  { collection: "operations" },
);


const Operation = mongoose.model("Operation", operationshuma);
module.exports = Operation;