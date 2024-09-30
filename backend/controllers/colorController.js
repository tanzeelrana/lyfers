const { Color } = require('../models');
const { body, validationResult } = require('express-validator');

// Validation for creating/updating color
const validateColor = [
  body('name').notEmpty().withMessage('Name is required'),
  body('code')
    .notEmpty().withMessage('Code is required')
];

// Middleware for checking validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Create a new color
exports.createColor = [
  validateColor,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, code } = req.body;
      const color = await Color.create({ name, code });
      res.status(200).json({ message: "Color Added successfully" ,color:color});

      res.status(201).json(color);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create color' });
    }
  }
];

// Get all colors
exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.findAll({
      order: [['createdAt', 'DESC']],
    });    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch colors' });
  }
};

// Get color by ID
exports.getColorById = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const color = await Color.findByPk(id);
      if (!color) {
        return res.status(404).json({ message: 'Color not found' });
      }
      res.status(200).json(color);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch color' });
    }
  }
];

// Update a color
exports.updateColor = [
  validateColor,
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    const { name, code } = req.body;
    try {
      const color = await Color.findByPk(id);
      if (!color) {
        return res.status(404).json({ message: 'Color not found' });
      }
      color.name = name || color.name;
      color.code = code || color.code;
      await color.save();
      res.status(200).json({ message: "Color updated successfully" ,color:color});
    } catch (error) {
      res.status(500).json({ error: 'Failed to update color' });
    }
  }
];

// Delete a color
exports.deleteColor = [
  async (req, res) => {
    const { id } = req.params;
    try {
      const color = await Color.findByPk(id);
      if (!color) {
        return res.status(404).json({ message: 'Color not found' });
      }
      await color.destroy();
      res.status(200).json({ message: 'Color deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete color' });
    }
  }
];
