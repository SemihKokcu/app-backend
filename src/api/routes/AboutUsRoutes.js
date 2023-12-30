const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/AboutUsController');
const { authMiddleware } = require('../../middleware/AuthMiddleware');
const { create_aboutUs, update_aboutUs, delete_aboutUs } = require('./claims/ClaimsNames');
const { aboutUsValidationRules } = require('./validators/validationRules');
const validate = require('../../middleware/ValidatorMiddleWare');

router.post('/add', authMiddleware([`${create_aboutUs}`]), aboutUsValidationRules, validate, aboutUsController.addAboutUs);
router.put('/update/:aboutUsId', authMiddleware([`${update_aboutUs}`]), aboutUsValidationRules, validate, aboutUsController.updateAboutUs);
router.delete('/delete/:aboutUsId', authMiddleware([`${delete_aboutUs}`]), aboutUsController.deleteAboutUs);
router.get('/get/:aboutUsId', aboutUsController.getAboutUs);
router.get('/getAll', aboutUsController.getAllAboutUs);

module.exports = router;
