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
    getUpcomingEvents,
} = require('../controllers/eventController');
const upload = require("../middleware/multerConfig");
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")


router.post(
    "/", authenticateAdmin,
    (req, res, next) => {
      req.folder = "events";
      next();
    },
    upload.single("image"),
    createEvent
  );

// Get all events
router.get('/', getAllEvents);
router.get('/upcoming', getUpcomingEvents);


// Get a single event by ID
router.get('/:id',authenticate, getEventById);


// Update an existing event
router.put('/:id' ,authenticateAdmin,(req, res, next) => {
    req.folder = "events";
    next();
  },
  upload.single("image"), updateEvent);

// Delete an event
router.delete('/:id',authenticateAdmin, deleteEvent);

module.exports = router;
