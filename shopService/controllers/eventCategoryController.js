const { EventCategory } = require('../models');

// Get all event categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await EventCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event categories', error });
    }
};

// Get a single event category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await EventCategory.findByPk(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Event category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event category', error });
    }
};

// Create a new event category
const createCategory = async (req, res) => {
    try {
        const newCategory = await EventCategory.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event category', error });
    }
};

// Update an existing event category
const updateCategory = async (req, res) => {
    try {
        const [updated] = await EventCategory.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedCategory = await EventCategory.findByPk(req.params.id);
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Event category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating event category', error });
    }
};

// Delete an event category
const deleteCategory = async (req, res) => {
    try {
        const deleted = await EventCategory.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Event category deleted' });
        } else {
            res.status(404).json({ message: 'Event category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event category', error });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
