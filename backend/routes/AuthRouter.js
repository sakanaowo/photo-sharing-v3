const express = require("express");
const { protectRoute } = require("../middleware/auth.middleware");
console.log(typeof protectRoute); // Debugging line to check if the function is defined
const router = express.Router();
const { register, login, logout, checkAuth } = require("../controllers/auth.controller");

router.get("/check", protectRoute, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;