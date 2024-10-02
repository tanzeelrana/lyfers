const { Event, EventCategory } = require("../models");
const { body, validationResult } = require("express-validator");

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: {
        model: EventCategory,
        as: "category",
        attributes: ["id", "name"],
      },
      order: [['createdAt', 'DESC']], 
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events", error });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: {
        model: EventCategory,
        as: "category",
        attributes: ["id", "name"],
      },
    });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving event", error });
  }
};

// Create a new event
const createEvent = [
  // Validation rules
  body("title").notEmpty().withMessage("Title is required."),
  body("location").notEmpty().withMessage("Location is required."),
  body("date").isISO8601().withMessage("Date must be a valid date."),
  body("ticketPrice").isFloat({ gt: 0 }).withMessage("Ticket price must be a positive number."),
  body("categoryId").notEmpty().withMessage("Category ID is required."),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, date, description, ticketPrice, categoryId,location } = req.body;

    try {
      const newEvent = await Event.create({
        title,
        date,
        description,
        ticketPrice,
        categoryId,
        location,
        image: req.file ? req.file.filename : null,
      });
      res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
      res.status(500).json({ message: "Error creating event", error });
    }
  },
];

// Update an existing event
const updateEvent = [
  // Validation rules
  body("title").optional().notEmpty().withMessage("Title cannot be empty."),
  body("location").notEmpty().withMessage("Location is required."),
  body("date").optional().isISO8601().withMessage("Date must be a valid date."),
  body("ticketPrice").optional().isFloat({ gt: 0 }).withMessage("Ticket price must be a positive number."),
  body("categoryId").optional().notEmpty().withMessage("Category ID is required."),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params; // Get event ID from the request parameters
    const { title, date, description, ticketPrice, categoryId,location} = req.body;

    try {
      // Find the event by ID
      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Prepare the updated data
      const updatedData = {
        title: title || event.title,
        date: date || event.date,
        description: description || event.description,
        ticketPrice: ticketPrice || event.ticketPrice,
        categoryId: categoryId || event.categoryId,
        location: location || event.location,
      };
      
      // Only add the image field if a new file is provided
      if (req.file) {
        updatedData.image = req.file.filename;
      }
      
      // Update the event
      const updatedEvent = await event.update(updatedData);

      res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
      res.status(500).json({ message: "Error updating event", error });
    }
  },
];

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
