const Category = require('../models/Category');

const categoryService = {
  addCategory: async (name) => {
    try {
      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (categoryId, name) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true }
      );
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      return deletedCategory;
    } catch (error) {
      throw error;
    }
  },

  getCategory: async (categoryId) => {
    try {
      const category = await Category.findById(categoryId);
      return category;
    } catch (error) {
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const categories = await Category.find();
      return categories;
    } catch (error) {
      throw error;
    }
  },

  getAllPaginatedCategories: async (page = 1, limit = 10) => {
    try {
      const startIndex = (page - 1) * limit;
      const [categories, totalCount] = await Promise.all([
        Category.find().limit(parseInt(limit)).skip(startIndex),
        Category.countDocuments(),
      ]);

      const results = {
        categories,
        pagination: {
          totalCount,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
        },
      };
      return results;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = categoryService;
