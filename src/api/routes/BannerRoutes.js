const express = require('express');
const router = express.Router();
const multer = require('multer');
const { fileFilter, fileStorage } = require('../../utils/multer/imageSettings');
const bannerController = require('../controllers/BannerController');
const {bannerValidationRules}  = require('./validators/validationRules');
const {create_banner,update_banner,delete_banner} = require('../routes/claims/ClaimsNames');
const { authMiddleware } = require('../../middleware/AuthMiddleware');
const validate = require('../../middleware/ValidatorMiddleWare');

router.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

router.post(
  '/add',
  authMiddleware([`${create_banner}`]),
  bannerValidationRules,
  validate,
  bannerController.addBanner
);

router.put(
  '/update/:bannerId',
  authMiddleware([`${update_banner}`]),
  bannerController.updateBanner
);

router.delete(
  '/delete/:bannerId',
  authMiddleware([`${delete_banner}`]),
  bannerController.deleteBanner
);

router.get('/get/:bannerId', bannerController.getBanner);
router.get('/getAll', bannerController.getAllBanners);
router.get('/getAllPaginated', bannerController.getAllPaginatedBanners);

module.exports = router;
