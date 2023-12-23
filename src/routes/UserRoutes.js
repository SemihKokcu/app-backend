const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/UserController'); 
const { fileFilter, fileStorage } = require('../utils/multer/imageSettings');
const multer = require('multer');

router.post(
    '/add',
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'),
    userController.add
  );

router.put('/update/:id',  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'),userController.update);

router.delete('/delete/:id', userController.delete);

router.get('/get/:id', userController.get);

router.get('/getAll', userController.getAll);

router.get('/getAllPaginated', userController.getAllPaginated);


module.exports = router;