
const express = require("express")
const router = express.Router()
const reservationController = require('../controllers/reservationcontroller.js')
const res_verification = require("../services/reservation_verifcation.js");




router.get('/',reservationController.getallreservations)
router.get('/:id',reservationController.getreservationbyid)
router.post('/add',res_verification.verif_user,res_verification.verif_room,reservationController.getallreservations)
router.delete('/delete/:id',reservationController.deletereservationbyid)
router.put('/update/:id', reservationController.updateReservation)

module.exports = router