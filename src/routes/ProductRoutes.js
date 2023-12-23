const express = require("express");
const router = express.Router();
const multer = require("multer");
const { fileFilter, fileStorage } = require("../utils/multer/imageSettings");
const productController = require("../api/controllers/ProductController");
const { authMiddleware } = require("../middleware/AuthMiddleware");
const {
  create_product,
  update_product,
  delete_product,
} = require("../common/ClaimsNames");

router.post(
  "/add",
  authMiddleware([`${create_product}`]),
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("images"),
  productController.createProduct
);

router.put(
  "/update/:id",
  authMiddleware([`${update_product}`]),
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("images"),
  productController.updateProduct
);

router.delete(
  "/delete/:id",
  authMiddleware([`${delete_product}`]),
  productController.deleteProduct
);

router.get("/getAll", productController.getAllProducts);
router.get("/get/:id", productController.getProduct);
router.get("/getAllPaginated", productController.getAllPaginatedProducts);

module.exports = router;
