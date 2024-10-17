const { body, param, validationResult } = require('express-validator');
const { Group, Post, User, Comment, PostImage } = require('../models');

exports.createGroup = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 255 }).withMessage('Name should not exceed 255 characters'),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name } = req.body;
      const newGroup = await Group.create({ name });
      res.status(201).json(newGroup);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create group' });
    }
  }
];

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};

exports.getGroupById = [
  param('id').isInt().withMessage('Group ID must be an integer'),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const group = await Group.findByPk(id);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      res.status(200).json(group);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch group' });
    }
  }
];

exports.updateGroup = [
  param('id').isInt().withMessage('Group ID must be an integer'),
  body('name')
    .optional()
    .isLength({ max: 255 }).withMessage('Name should not exceed 255 characters'),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name } = req.body;
      const group = await Group.findByPk(id);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      group.name = name || group.name;
      await group.save();
      res.status(200).json(group);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update group' });
    }
  }
];

exports.deleteGroup = [
  param('id').isInt().withMessage('Group ID must be an integer'),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const group = await Group.findByPk(id);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      await group.destroy();
      res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete group' });
    }
  }
];

exports.getPostsByGroupId = [
  param('id').isInt().withMessage('Group ID must be an integer'),
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const posts = await Post.findAll({
        where: { groupId: id },
        include: [
          { model: PostImage },
          { model: Comment, include: [User] },
          { model: User },
          { model: Group }
        ]
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts for group' });
    }
  }
];
