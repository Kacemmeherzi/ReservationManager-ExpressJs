const mongoose = require("mongoose");
const reservationshema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    started: { type: Date, required: false },
    ended: { type: Date, required : false },
    duration: { type: Number, required: true },
    validation: { type: Boolean, default: false },
  },
  { collection: "reservations" },
);

reservationshema.pre("save", async function (next) {
  
    const currentDate = new Date();
    currentDate.setDate(this.started.getDate() + this.duration);
    this.ended = currentDate;
    next();
  
});
const Reservation = mongoose.model("Reservation", reservationshema);
module.exports = Reservation;
