const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');

// Routes for Color CRUD operations
router.post('/', colorController.createColor);
router.get('/', colorController.getAllColors);
router.get('/:id', colorController.getColorById);
router.put('/:id', colorController.updateColor);
router.delete('/:id', colorController.deleteColor);

module.exports = router;
