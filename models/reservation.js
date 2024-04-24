const mongoose = require("mongoose");
const moment = require("moment");
const reservationshema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    started: { type: Date, required: false },
    ended: { type: Date, required: true },
    duration: { type: Number, required: false },
    validation: { type: Boolean, default: false },
  },
  { collection: "reservations" },
);

reservationshema.pre("save", async function (next) {

  next();
});
const Reservation = mongoose.model("Reservation", reservationshema);
module.exports = Reservation;
