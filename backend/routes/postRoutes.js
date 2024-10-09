const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');

const postController = require('../controllers/postController');
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

// Routes for Post CRUD operations
router.post('/',authenticate, upload.array('images'), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id',authenticate, upload.array('images'), postController.updatePost);
router.delete('/:id',authenticateAdmin, postController.deletePost);

module.exports = router;
