const express = require('express');
const router = express.Router();
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

const commentController = require('../controllers/commentController');

// Routes for Comment CRUD operations
router.post('/',authenticate, commentController.createComment);
router.get('/post/:postId', commentController.getCommentsByPostId);
router.put('/:id',authenticate, commentController.updateComment);
router.delete('/:id',authenticateAdmin, commentController.deleteComment);

module.exports = router;
