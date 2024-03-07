const mongoose = require("mongoose");

const roomshema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true },
    roomDesc: { type: String, required: true },
    equipments: [{}],
  },
  { collection: "rooms" },
);
const Room = mongoose.model("Room", roomshema);
module.exports = Room;
