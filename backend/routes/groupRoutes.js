const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Routes for groups
router.post('/', groupController.createGroup);
router.get('/', groupController.getAllGroups);
router.get('/:id', groupController.getGroupById);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

// Route to get all posts in a group
router.get('/:id/posts', groupController.getPostsByGroupId);

module.exports = router;
