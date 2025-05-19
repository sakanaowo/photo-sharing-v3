const express = require("express");
const User = require("../db/userModel");
const router = express.Router();
// import { getUsers, getUserById } from "../controllers/user.controller";
const { getUsers, getUserById, addUser } = require("../controllers/user.controller");

// router.post("/", async (request, response) => {

// });
// get user list
router.get("/list", getUsers);

// get user by id
router.get("/:id", getUserById);

router.put("/addUser", addUser)

module.exports = router;