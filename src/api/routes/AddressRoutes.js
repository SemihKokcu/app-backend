const express = require('express');
const router = express.Router();
const addressController = require('../controllers/AddressController');
const {addressValidationRules}  = require('./validators/validationRules');
const validate = require('../../middleware/ValidatorMiddleWare');


router.post('/add', addressValidationRules, validate, addressController.addAddress);

router.put('/update/:addressId', addressValidationRules, validate,addressController.updateAddress);

router.delete('/delete/:addressId', addressController.deleteAddress);

router.get('/get/:addressId', addressController.getAddress);

router.get('/getAll', addressController.getAllAddresses);

router.get('/getAllPaginated', addressController.getAllPaginatedAddresses);

module.exports = router;
