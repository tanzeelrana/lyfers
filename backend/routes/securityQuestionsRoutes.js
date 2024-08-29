const express = require('express');
const router = express.Router();
const securityQuestionsController = require('../controllers/securityQuestionsController');

// GET all security questions
router.get('/', securityQuestionsController.getAllSecurityQuestions);

// POST a new security question
router.post('/', securityQuestionsController.createSecurityQuestion);

// GET a specific security question by ID
router.get('/:id', securityQuestionsController.getSecurityQuestionById);

// PUT (update) a specific security question by ID
router.put('/:id', securityQuestionsController.updateSecurityQuestionById);

// DELETE a specific security question by ID
router.delete('/:id', securityQuestionsController.deleteSecurityQuestionById);

module.exports = router;
