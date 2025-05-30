const express = require("express");
const { protectRoute } = require("../middleware/auth.middleware");
const router = express.Router();
const { register, login, logout, checkAuth } = require("../controllers/auth.controller");

router.get("/check", protectRoute, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;