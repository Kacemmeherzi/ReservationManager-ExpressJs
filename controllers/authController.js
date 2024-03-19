const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const jwt = require("../jwt/jwtUtils.js");
const bcrypt = require("bcryptjs");
const authController = {
login :  async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const token = jwt.generateToken(user);
        res.status(200).json({ message: "connected", token: token });
      } else {
        res.status(406).json({ message: "wrong password" });
      }
    } else {
      res.status(406).json({ message: "username not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} , 

register :  async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ errortype: error.name, message: error.message });
  }
}}

module.exports = authController;
