const express = require('express');
const { protectRoute } = require('../middleware/auth.middleware');
const { postComment, updateComment, deleteComment } = require('../controllers/comment.controller');
const router = express.Router();

router.post('/commentsOfPhoto/:photo_id', protectRoute, postComment);

router.put('/:id', protectRoute, updateComment)
router.delete('/:id', protectRoute, deleteComment);

module.exports = router;