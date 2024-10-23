const express = require('express');
const router = express.Router();
const { EventCategory } = require('../models'); // Adjust the path as needed
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../../backend/controllers/eventCategoryController');


// Get all event categories
router.get('/', getAllCategories);

// Get a single event category by ID
router.get('/:id', getCategoryById);

// Create a new event category
router.post('/', createCategory);

// Update an existing event category
router.put('/:id', updateCategory);

// Delete an event category
router.delete('/:id', deleteCategory);



module.exports = router;
