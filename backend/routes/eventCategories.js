const express = require('express');
const router = express.Router();
const { EventCategory } = require('../models'); // Adjust the path as needed

// Get all event categories
router.get('/', async (req, res) => {
    try {
        const categories = await EventCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event categories', error });
    }
});

// Get a single event category by ID
router.get('/:id', async (req, res) => {
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
});

// Create a new event category
router.post('/', async (req, res) => {
    try {
        const newCategory = await EventCategory.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event category', error });
    }
});

// Update an existing event category
router.put('/:id', async (req, res) => {
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
});

// Delete an event category
router.delete('/:id', async (req, res) => {
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
});

module.exports = router;
