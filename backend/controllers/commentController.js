const { body, param, validationResult } = require('express-validator');
const { Comment, User, Post } = require('../models');

// Middleware to validate input
const validateComment = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Create a new comment
exports.createComment = [
  // Validation rules
  body('postId')
    .isInt().withMessage('Post ID must be an integer'),
  body('userId')
    .isInt().withMessage('User ID must be an integer'),
  body('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 1000 }).withMessage('Content should not exceed 1000 characters'),
  validateComment,
  async (req, res) => {
    try {
      const { postId, userId, content } = req.body;

      const newComment = await Comment.create({
        postId,
        userId,
        content
      });

      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create comment' });
    }
  }
];

// Get all comments for a post
exports.getCommentsByPostId = [
  // Validation rules
  param('postId')
    .isInt().withMessage('Post ID must be an integer'),
  validateComment,
  async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await Comment.findAll({
        where: { postId },
        include: [User]
      });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  }
];

// Update a comment
exports.updateComment = [
  // Validation rules
  param('id')
    .isInt().withMessage('Comment ID must be an integer'),
  body('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ max: 1000 }).withMessage('Content should not exceed 1000 characters'),
  validateComment,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { content } = req.body;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      await comment.update({ content });

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update comment' });
    }
  }
];

// Delete a comment
exports.deleteComment = [
  // Validation rules
  param('id')
    .isInt().withMessage('Comment ID must be an integer'),
  validateComment,
  async (req, res) => {
    try {
      const { id } = req.params;

      const comment = await Comment.findByPk(id);

      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      await comment.destroy();

      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  }
];
