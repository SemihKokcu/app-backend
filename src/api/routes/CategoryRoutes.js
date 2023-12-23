const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoriesController');
const {categoryValidationRules}  = require('./validators/validationRules');
const validate = require('../../middleware/ValidatorMiddleWare');

router.post('/add',categoryValidationRules,validate, categoryController.addCategory);

router.put('/update/:categoryId', categoryValidationRules,validate,categoryController.updateCategory);

router.delete('/delete/:categoryId', categoryController.deleteCategory);

router.get('/get/:categoryId', categoryController.getCategory);

router.get('/getAll', categoryController.getAllCategories);

router.get('/getAllPaginated', categoryController.getAllPaginatedCategories);

module.exports = router;
