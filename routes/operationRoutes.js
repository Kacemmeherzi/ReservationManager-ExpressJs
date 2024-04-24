const express = require("express");
const router = express.Router();
const OperationController = require('../controllers/OperationController.js')


router.post('/createop',OperationController.createOperation)

router.post('/confirmoperation',OperationController.confirmToken)

module.exports = router;
