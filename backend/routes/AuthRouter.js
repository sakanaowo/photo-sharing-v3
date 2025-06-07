const express = require("express");
const { protectRoute } = require("../middleware/auth.middleware");
const router = express.Router();
const { register, login, logout, checkAuth, updateProfile } = require("../controllers/auth.controller");

router.get("/check", protectRoute, checkAuth);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update", protectRoute, updateProfile);

module.exports = router;