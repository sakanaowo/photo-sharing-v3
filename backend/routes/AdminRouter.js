const express = require('express');
const router = express.Router();

const { adminLogin, checkAuth, adminLogout } = require('../controllers/auth.controller');
const { protectRoute } = require("../middleware/auth.middleware");

router.post('/login', adminLogin);
router.post('/logout', protectRoute, adminLogout);
router.get('/check', protectRoute, checkAuth)

module.exports = router;