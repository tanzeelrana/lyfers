const { body, param, validationResult } = require("express-validator");
const { Post, PostImage, Comment, User, Group ,PostLike} = require("../models");
const { Sequelize } = require('sequelize');

const { Op } = require("sequelize");

// Middleware to validate input
const validatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Create a new post
exports.createPost = [
  // Validation rules
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 255 })
    .withMessage("Title should not exceed 255 characters"),
  body("description").notEmpty().withMessage("Description is required"),
  body("groupId").isInt().withMessage("Group ID must be an integer"),
  validatePost,
  async (req, res) => {
    try {
      const { title, description, groupId, userId } = req.body;
      const imageFiles = req.files;

      const newPost = await Post.create({
        title,
        description,
        groupId,
        userId,
      });

      if (imageFiles && imageFiles.length > 0) {
        const images = imageFiles.map((file) => ({
          postId: newPost.id,
          image: file.filename,
        }));
        await PostImage.bulkCreate(images);
      }
      res.status(201).json({ message: "Post Created successfully" ,newPost:newPost});

    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  },
];

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: PostImage },
        { model: Comment, include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }] },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        { model: Group },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.getAllPostsByAuthor = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.findAll({
      where: { userId },
      include: [
        { model: PostImage },
        { model: Comment, include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }] },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        { model: Group },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
// Get a post by ID
exports.getPostById = [
  // Validation rules
  // param("id").isInt().withMessage("Post ID must be an integer"),
  // validatePost,
  async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id, {
        include: [
          { model: PostImage },
          { model: Comment, include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }] },
          {
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastName", "email"],
          },
          { model: Group },
        ],
        order: [["createdAt", "DESC"]],

      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch post" });
    }
  },
];

// Update a post
exports.updatePost = [
  // Validation rules
  param("id").isInt().withMessage("Post ID must be an integer"),
  body("title")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Title should not exceed 255 characters"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  body("groupId").optional().isInt().withMessage("Group ID must be an integer"),
  body("userId").optional().isInt().withMessage("User ID must be an integer"),
  validatePost,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, groupId, userId } = req.body;
      const imageFiles = req.files;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      await post.update({
        title,
        description,
        groupId,
        userId,
      });

      if (imageFiles && imageFiles.length > 0) {
        // Delete old images
        await PostImage.destroy({ where: { postId: id } });

        const images = imageFiles.map((file) => ({
          postId: id,
          image: file.filename,
        }));
        await PostImage.bulkCreate(images);
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  },
];

// Delete a post
exports.deletePost = [
  // Validation rules
  param("id").isInt().withMessage("Post ID must be an integer"),
  validatePost,
  async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Delete associated images
      await PostImage.destroy({ where: { postId: id } });

      // Delete the post
      await post.destroy();

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  },
];



exports.likePost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const existingLike = await PostLike.findOne({ where: { userId, postId } });

    if (existingLike) {
      // If already liked, remove the like
      await existingLike.destroy();
      return res.status(200).json({ message: 'Post unliked' });
    } else {
      // Add a new like
      await PostLike.create({ userId, postId });
      return res.status(201).json({ message: 'Post liked' });
    }
  } catch (error) {
    console.error("Error liking the post", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get post likes
exports.getPostLikes = async (req, res) => {
  const { postId } = req.params;

  try {
    const likes = await PostLike.findAll({
      where: { postId },
      include: [{ model: User, attributes: ['id', 'email'] }], // Include user details if needed
    });

    return res.status(200).json(likes);
  } catch (error) {
    console.error("Error fetching post likes", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Check if a user has liked a post
exports.hasUserLikedPost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const existingLike = await PostLike.findOne({ where: { userId, postId } });

    return res.status(200).json({ liked: !!existingLike });
  } catch (error) {
    console.error("Error checking if user liked the post", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.searchByKeyword = async (req, res) => {
  const { keyword } = req.params; 

  try {
    // Search for groups where name matches the keyword
    const groups = await Group.findAll({
      where: {
        name: {
          [Op.like]: `%${keyword}%`, // Case-insensitive partial match
        },
      },
      include: [
        {
          model: Post,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("Posts.id")), "postsCount"],
          [
            Sequelize.fn("MAX", Sequelize.col("Posts.createdAt")),
            "lastActivity",
          ],
        ],
      },
      group: ["Group.id"],
    });

    // Search for posts where title matches the keyword
    const posts = await Post.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`, // Case-insensitive partial match
        },
      },
      include: [
        { model: PostImage },
        { model: Comment, include: [User] },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        { model: Group },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Return both groups and posts in the response
    res.status(200).json({ groups, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search by keyword" });
  }
};