const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

// Get all subcategories
router.get('/', subcategoryController.getAllSubcategories);
router.get('/categories', subcategoryController.getAllCategories);


// Get subcategory by ID
router.get('/:id', subcategoryController.getSubcategoryById);

// Create a new subcategory
router.post('/',authenticateAdmin, subcategoryController.createSubcategory);

// Update a subcategory by ID
router.put('/:id',authenticateAdmin, subcategoryController.updateSubcategory);

// Delete a subcategory by ID
router.delete('/:id',authenticateAdmin, subcategoryController.deleteSubcategory);

module.exports = router;
