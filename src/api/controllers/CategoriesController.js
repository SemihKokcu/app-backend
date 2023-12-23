const categoryService = require('../../services/CategoryService');

const categoryController = {
  addCategory: async (req, res, next) => {
    try {
      const { name } = req.body;
      const savedCategory = await categoryService.addCategory(name);
      res.status(201).json(savedCategory);
    } catch (error) {
      next(error);
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;
      const updatedCategory = await categoryService.updateCategory(categoryId, name);
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const deletedCategory = await categoryService.deleteCategory(categoryId);
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  getCategory: async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await categoryService.getCategory(categoryId);
      res.json(category);
    } catch (error) {
      next(error);
    }
  },

  getAllCategories: async (req, res, next) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  },

  getAllPaginatedCategories: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await categoryService.getAllPaginatedCategories(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryController;
