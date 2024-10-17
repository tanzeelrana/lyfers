const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

// Routes for testimonials CRUD
router.post('/',authenticateAdmin, testimonialController.createTestimonial); 
router.get('/', testimonialController.getTestimonials); 
router.get('/:id', testimonialController.getTestimonialById); 
router.put('/:id',authenticateAdmin, testimonialController.updateTestimonial); 
router.delete('/:id',authenticateAdmin, testimonialController.deleteTestimonial); 

module.exports = router;
