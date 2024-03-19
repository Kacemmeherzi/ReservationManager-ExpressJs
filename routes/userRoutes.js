const express = require('express')
const router = express.Router()
const userController =require('../controllers/usercontroller')



router.get('/',userController.getallusers)
router.post('/add',userController.adduser)
router.get('/:id',userController.getuserbyid)
router.put('/update/:id',userController.updateuser)
router.delete('/delete/:id',userController.deleteuserbyid)



module.exports = router