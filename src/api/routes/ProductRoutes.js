const express = require("express");
const router = express.Router();
const multer = require("multer");
const { fileFilter, fileStorage } = require("../../utils/multer/imageSettings");
const productController = require("../controllers/ProductController");
const { authMiddleware } = require("../../middleware/AuthMiddleware");
const {
  create_product,
  update_product,
  delete_product,
} = require("./claims/ClaimsNames");

router.use( multer({ storage: fileStorage, fileFilter: fileFilter }).array("images"))

router.post(
  "/add",
  // authMiddleware([`${create_product}`]),
  productController.createProduct
);

router.put(
  "/update/:id",
  // authMiddleware([`${update_product}`]),
  productController.updateProduct
);

router.delete(
  "/delete/:id",
  // authMiddleware([`${delete_product}`]),
  productController.deleteProduct
);

router.get("/getAll", productController.getAllProducts);
router.get("/get/:id", productController.getProduct);
router.get("/getAllPaginated", productController.getAllPaginatedProducts);

module.exports = router;
