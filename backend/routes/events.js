const express = require('express');
const router = express.Router();
const { Event, EventCategory } = require('../models');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.findAll({
            include: {
              model: EventCategory,
              as: 'category', // Must match the alias used in the association
              attributes: ['id', 'name'] // Adjust as needed
            }
          });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
});

// Get a single event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event', error });
    }
});

// Create a new event
router.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
});

// Update an existing event
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Event.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedEvent = await Event.findByPk(req.params.id);
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error });
    }
});

// Delete an event
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Event.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Event deleted' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
});

module.exports = router;
