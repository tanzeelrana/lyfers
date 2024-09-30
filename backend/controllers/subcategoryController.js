const { Subcategory, Category } = require('../models');
const { body, param, validationResult } = require('express-validator');

// Validation for creating/updating subcategory
const validateSubcategory = [
  body('name').notEmpty().withMessage('Name is required'),
  body('categoryId')
    .notEmpty().withMessage('Category ID is required')
    .isInt().withMessage('Category ID must be an integer')
    .custom(async (value) => {
      const category = await Category.findByPk(value);
      if (!category) {
        return Promise.reject('Invalid category ID');
      }
    })
];

// Validation for ID param
const validateIdParam = [
  param('id')
    .isInt().withMessage('ID must be an integer')
    .toInt()
];

// Middleware for checking validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      include: [{ model: Category, as: 'category' }]
    });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};

// Get subcategory by ID
exports.getSubcategoryById = [
  validateIdParam,
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const subcategory = await Subcategory.findOne({
        where: { id },
        include: [{ model: Category, as: 'category' }]
      });
      if (!subcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      res.status(200).json(subcategory);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch subcategory' });
    }
  }
];

// Create a new subcategory
exports.createSubcategory = [
  validateSubcategory,
  handleValidationErrors,
  async (req, res) => {
    const { name, categoryId } = req.body;
    try {
      const subcategory = await Subcategory.create({ name, categoryId });
      res.status(201).json({ message: "Category created successfully" ,subcategory:subcategory});

    } catch (error) {
      res.status(500).json({ error: 'Failed to create subcategory' });
    }
  }
];

// Update a subcategory by ID
exports.updateSubcategory = [
  validateIdParam,
  validateSubcategory,
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    try {
      const subcategory = await Subcategory.findOne({ where: { id } });
      if (!subcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      subcategory.name = name || subcategory.name;
      subcategory.categoryId = categoryId || subcategory.categoryId;
      await subcategory.save();
      res.status(200).json({ message: "Category updated successfully" ,subcategory:subcategory});
    } catch (error) {
      res.status(500).json({ error: 'Failed to update subcategory' });
    }
  }
];

// Delete a subcategory by ID
exports.deleteSubcategory = [
  validateIdParam,
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const subcategory = await Subcategory.findOne({ where: { id } });
      if (!subcategory) {
        return res.status(404).json({ error: 'Subcategory not found' });
      }
      await subcategory.destroy();
      res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete subcategory' });
    }
  }
];
