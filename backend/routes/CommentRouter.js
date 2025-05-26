const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('create', protectRoute, async (req, res) => { });

module.exports = router;