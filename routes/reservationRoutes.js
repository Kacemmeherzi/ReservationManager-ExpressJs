
const express = require("express")
const router = express.Router()
const reservationController = require('../controllers/reservationcontroller.js')
const res_verification = require("../services/reservation_verifcation.js");




router.get('/',reservationController.getallreservations)
router.get('/reservationbyid/:id',reservationController.getreservationbyid)
router.get('/byuserid/:id',reservationController.reservationbyuserid)
router.post('/add',res_verification.verif_user,res_verification.verif_room,reservationController.addreservation)
router.delete('/delete/:id',reservationController.deletereservationbyid)
router.put('/update/:id', reservationController.updateReservation)

module.exports = router 