const express = require("express");
const router = express.Router();
const { restoreUser } = require("../../utils/auth.js");
const { validateQueries, validateProduct } = require("../../utils/validation.js");
const productController = require("../../controllers/productController.js");

// router.use(restoreUser);
router.get("/count", productController.getProductCount);
router.post("/", productController.createProduct)
router.get("/", validateQueries, productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProductById);

module.exports = router;

