const express = require('express');
const router = express.Router();

const { adminLogin, checkAuth } = require('../controllers/auth.controller');
const { protectRoute } = require("../middleware/auth.middleware");

router.post('/login', adminLogin);
router.get('/check', protectRoute, checkAuth)

module.exports = router;