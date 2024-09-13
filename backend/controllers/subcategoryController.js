const { Subcategory, Category } = require('../models');

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      include: [{ model: Category,as: 'category' }] 
    });
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategories' });
  }
};

// Get subcategory by ID
exports.getSubcategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategory = await Subcategory.findOne({
      where: { id },
      include: [{ model: Category,as: 'category' }]
    });
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subcategory' });
  }
};

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const subcategory = await Subcategory.create({ name, categoryId });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subcategory' });
  }
};

// Update a subcategory by ID
exports.updateSubcategory = async (req, res) => {
  const { id } = req.params;
  const { name, categoryId } = req.body;
  try {
    const subcategory = await Subcategory.findOne({ where: { id } });
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    subcategory.name = name || subcategory.name;
    subcategory.categoryId = categoryId || subcategory.categoryId;
    await subcategory.save();
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subcategory' });
  }
};

// Delete a subcategory by ID
exports.deleteSubcategory = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategory = await Subcategory.findOne({ where: { id } });
    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    await subcategory.destroy();
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subcategory' });
  }
};
