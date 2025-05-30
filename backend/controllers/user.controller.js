// import User from "../db/userModel.js";
const User = require("../db/userModel");
const mongoose = require("mongoose");
// import mongoose from "mongoose";

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id first_name last_name");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};
const getUserById = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(
      userId,
      "_id first_name last_name location description occupation"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  const { first_name, last_name, location, description, occupation } = req.body;
  try {
    const newUser = new User({
      first_name,
      last_name,
      location,
      description,
      occupation,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserById, getUsers, addUser };
