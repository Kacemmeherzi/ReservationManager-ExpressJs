const express = require('express');
const router = express.Router() ;
const User = require('../models/user.js') ;
const jwt = require ('../jwt/jwtUtils.js')
const bcrypt = require('bcryptjs')

router.post('/login', async (req, res) => {
    try {
const {username,password} = req.body ;
const user = await User.findOne({username:username});

const valid= await  bcrypt.compare(password,user.password) ;

      if (user&&valid) {
       const token = jwt.generateToken(user) ;
       res.status(200).json(token)
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



  module.exports = router ;