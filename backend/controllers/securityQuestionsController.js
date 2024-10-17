const { SecurityQuestions } = require('../models'); // Adjust the path as needed

const getAllSecurityQuestions = async (req, res) => {
  try {
    const questions = await SecurityQuestions.findAll();
    return res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.error('Error fetching security questions:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createSecurityQuestion = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const newQuestion = await SecurityQuestions.create({ question, answer });
    return res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    console.error('Error creating security question:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getSecurityQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await SecurityQuestions.findByPk(id);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Security question not found' });
    }

    return res.status(200).json({ success: true, data: question });
  } catch (error) {
    console.error('Error fetching security question:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateSecurityQuestionById = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const questionToUpdate = await SecurityQuestions.findByPk(id);

    if (!questionToUpdate) {
      return res.status(404).json({ success: false, message: 'Security question not found' });
    }

    questionToUpdate.question = question || questionToUpdate.question;
    questionToUpdate.answer = answer || questionToUpdate.answer;

    await questionToUpdate.save();
    return res.status(200).json({ success: true, data: questionToUpdate });
  } catch (error) {
    console.error('Error updating security question:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteSecurityQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await SecurityQuestions.findByPk(id);

    if (!question) {
      return res.status(404).json({ success: false, message: 'Security question not found' });
    }

    await question.destroy();
    return res.status(200).json({ success: true, message: 'Security question deleted successfully' });
  } catch (error) {
    console.error('Error deleting security question:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getAllSecurityQuestions,
  createSecurityQuestion,
  getSecurityQuestionById,
  updateSecurityQuestionById,
  deleteSecurityQuestionById,
};
