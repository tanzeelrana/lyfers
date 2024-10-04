const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Routes for testimonials CRUD
router.post('/', testimonialController.createTestimonial); 
router.get('/', testimonialController.getTestimonials); 
router.get('/:id', testimonialController.getTestimonialById); 
router.put('/:id', testimonialController.updateTestimonial); 
router.delete('/:id', testimonialController.deleteTestimonial); 

module.exports = router;
