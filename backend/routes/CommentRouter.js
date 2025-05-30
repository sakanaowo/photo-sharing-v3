const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware');
const { postComment } = require('../controllers/comment.controller');
const router = express.Router();

router.post('/commentsOfPhoto/:photo_id', protectRoute, postComment);

module.exports = router;