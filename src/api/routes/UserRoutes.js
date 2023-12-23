const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/UserController'); 
const { fileFilter, fileStorage } = require('../../utils/multer/imageSettings');
const {userValidationRules}  = require('./validators/validationRules');


const validate  = require('../../middleware/ValidatorMiddleWare');
router.post(
  '/add',
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'),
  userValidationRules,
  validate,
  userController.add
);

router.put(
  '/update/:id',
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'),
  userValidationRules,
  validate,
  userController.update
);

router.delete('/delete/:id', userController.delete);

router.get('/get/:id', userController.get);

router.get('/getAll', userController.getAll);

router.get('/getAllPaginated', userController.getAllPaginated);


module.exports = router;