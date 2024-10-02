const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');
const upload = require("../middleware/multerConfig");


router.post(
    "/",
    (req, res, next) => {
      req.folder = "events";
      next();
    },
    upload.single("image"),
    createEvent
  );

// Get all events
router.get('/', getAllEvents);

// Get a single event by ID
router.get('/:id', getEventById);


// Update an existing event
router.put('/:id',(req, res, next) => {
    req.folder = "events";
    next();
  },
  upload.single("image"), updateEvent);

// Delete an event
router.delete('/:id', deleteEvent);

module.exports = router;
