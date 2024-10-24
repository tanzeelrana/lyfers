const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');

const postController = require('../controllers/postController');
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

// Routes for Post CRUD operations
router.post('/',authenticate,  (req, res, next) => {
    req.folder = "posts";
    next();
  },
  upload.array("images"), postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/user/:userId', postController.getAllPostsByAuthor);
router.get("/search/:keyword", postController.searchByKeyword);
router.get('/:id', postController.getPostById);
router.put('/:id',authenticate, upload.array('images'), postController.updatePost);
router.delete('/:id',authenticateAdmin, postController.deletePost);
router.post('/like',authenticate, postController.likePost);

// Get likes for a post
router.get('/:postId/likes', postController.getPostLikes);

// Check if a user has liked a post
router.post('/hasLiked', postController.hasUserLikedPost);

module.exports = router;
