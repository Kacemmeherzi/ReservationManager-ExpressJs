const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomcontroller')

router.get('/',roomController.getallrooms)
router.get('/roombyid/:id',roomController.getroombyid)
router.put('/update',roomController.updateroombyid)
router.delete('/delete',roomController.deleteroombyid)
router.post('/add',roomController.addroom)

router.get('/freerooms',roomController.getunreservedrooms)

module.exports = router 