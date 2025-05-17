const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
// import { getUsers, getUserById } from "../controllers/user.controller";
const { getUsers, getUserById } = require("../controllers/User.controller");

// router.post("/", async (request, response) => {

// });
// get user list
router.get("/list", getUsers);

// get user by id
router.get("/:id", getUserById);

module.exports = router;