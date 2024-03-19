const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const userController = {
getallusers : async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

getuserbyid : async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},

// Create a new user
adduser :  async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},

// Update an existing user
updateuser :async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ "error type": error.name, message: error.message });
  }
},

// Delete a user
deleteuserbyid :  async (req, res) => {
  try {
    const userid = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userid);
    if (deletedUser) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ "error type": error.name, message: error.message });
  }
}}

module.exports = userController;
