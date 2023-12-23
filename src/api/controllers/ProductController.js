const productService = require('../../services/ProductService');

const ProductController = {
  createProduct: async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const imageUrls = req.files.map(file => file.filename);
      const newProduct = await productService.createProduct(userId, imageUrls, req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedProduct = await productService.updateProduct(id, req.files, req.body);
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProduct = await productService.deleteProduct(id);
      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  },

  getProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.getProduct(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  getAllProducts: async (req, res, next) => {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  getAllPaginatedProducts: async (req, res, next) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const results = await productService.getAllPaginatedProducts(page, limit);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ProductController;
