const express = require('express')
const router = express.Router()
const roomController = require('../controllers/roomcontroller')

router.get('/',roomController.getallrooms)
router.get('/:id',roomController.getroombyid)
router.get('/update',roomController.updateroombyid)
router.get('/delete',roomController.deleteroombyid)
router.get('/add',roomController.addroom)



module.exports = router 