const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

// Routes for Color CRUD operations
router.post('/',authenticateAdmin, colorController.createColor);
router.get('/', colorController.getAllColors);
router.get('/:id', colorController.getColorById);
router.put('/:id',authenticateAdmin, colorController.updateColor);
router.delete('/:id',authenticateAdmin, colorController.deleteColor);

module.exports = router;
