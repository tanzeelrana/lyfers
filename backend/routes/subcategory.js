const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

// Get all subcategories
router.get('/', subcategoryController.getAllSubcategories);

// Get subcategory by ID
router.get('/:id', subcategoryController.getSubcategoryById);

// Create a new subcategory
router.post('/', subcategoryController.createSubcategory);

// Update a subcategory by ID
router.put('/:id', subcategoryController.updateSubcategory);

// Delete a subcategory by ID
router.delete('/:id', subcategoryController.deleteSubcategory);

module.exports = router;
