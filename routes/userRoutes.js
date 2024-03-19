const express = require('express')
const router = express.Router()
const userController =require('../controllers/usercontroller')



router.get('/',userController.getallusers)
router.get('/add',userController.adduser)
router.get('/:id',userController.getuserbyid)
router.get('/update/:id',userController.updateuser)
router.get('/delete/:id',userController.deleteuserbyid)



module.exports = router