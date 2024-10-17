const { Testimonial, User } = require("../models");
const { body, validationResult } = require("express-validator");

// Create a new testimonial
exports.createTestimonial = [
  // Validation rules
  body("title").isString().withMessage("Title must be a string").notEmpty().withMessage("Title is required"),
  body("description").isString().withMessage("Description must be a string").notEmpty().withMessage("Description is required"),
  body("userId").isNumeric().withMessage("User ID must be a number").notEmpty().withMessage("User ID is required"),

  // Handle request
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, userId, image } = req.body;
      const testimonial = await Testimonial.create({
        title,
        description,
        userId,
        image,
      });
      res
        .status(201)
        .json({ message: "Testimonial created successfully", testimonial });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create testimonial", details: error.message });
    }
  },
];

// Get all testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(testimonials);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch testimonials", details: error.message });
  }
};

// Get a single testimonial by ID
exports.getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch testimonial", details: error.message });
  }
};

// Update a testimonial
exports.updateTestimonial = [
  // Validation rules
  body("title").optional().isString().withMessage("Title must be a string"),
  body("description").optional().isString().withMessage("Description must be a string"),
  body("userId").optional().isNumeric().withMessage("User ID must be a number"),

  // Handle request
  async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { title, description, userId, image } = req.body;
      const testimonial = await Testimonial.findByPk(id);

      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }

      await testimonial.update({ title, description, userId, image });
      res
        .status(200)
        .json({ message: "Testimonial updated successfully", testimonial });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update testimonial", details: error.message });
    }
  },
];

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    await testimonial.destroy();
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete testimonial", details: error.message });
  }
};
