const Product = require('../models/Product');
const deleteImage = require('../utils/imageCleaner');

const ProductService = {
  createProduct: async (userId, imageUrls, data) => {
    try {
      const newProduct = new Product({ creator: userId, imageUrls, ...data });
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw error;
    }
  },

  updateProduct: async (id, files, data) => {
    try {
      const product = await Product.findById(id);
      if (files.length > 0) {
        const newImageUrls = files.map(file => file.filename);
        product.imageUrls?.map(imageUrl => {
          deleteImage(imageUrl);
        });
        product.imageUrls = newImageUrls;
      }
      product.name = data.name;
      product.descprice = data.descp;
      product.price = data.price;
      product.stock = data.stock;
      product.isActive = data.isActive;
      product.categoryId = data.categoryId;
      const updatedProduct = await product.save();
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      const imageUrlsToDelete = [...product.imageUrls];

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        throw new Error('Product could not be deleted');
      }
      imageUrlsToDelete.map((imageUrl) => {
        deleteImage(imageUrl);
      });
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  },

  getProduct: async (id) => {
    try {
      const product = await Product.findById(id);

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      throw error;
    }
  },

  getAllProducts: async () => {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  },

  getAllPaginatedProducts: async (page, limit) => {
    try {
      const startIndex = (page - 1) * limit;

      const [products, totalCount] = await Promise.all([
        Product.find().limit(parseInt(limit)).skip(startIndex),
        Product.countDocuments(),
      ]);

      const results = {
        products,
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

module.exports = ProductService;
