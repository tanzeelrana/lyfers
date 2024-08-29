const { Event, EventCategory } = require('../models');

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.findAll({
            include: {
                model: EventCategory,
                as: 'category',
                attributes: ['id', 'name'],
            },
        });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving events', error });
    }
};

// Get a single event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id, {
            include: {
                model: EventCategory,
                as: 'category',
                attributes: ['id', 'name'],
            },
        });
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving event', error });
    }
};

// Create a new event
const createEvent = async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : null,
        };

        // Create new event
        const newEvent = await Event.create(eventData);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error });
    }
};

// Update an existing event
const updateEvent = async (req, res) => {
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
};

// Delete an event
const deleteEvent = async (req, res) => {
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
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};
