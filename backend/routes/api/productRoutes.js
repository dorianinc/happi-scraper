const express = require("express");
const router = express.Router();
const { restoreUser } = require("../../utils/auth.js");
const { validateQueries, validateProduct } = require("../../utils/validation.js");
const productController = require("../../controllers/productController.js");

router.use(restoreUser);

router.get("/", validateQueries, productController.getAllProducts);
router.post("/", validateProduct, productController.createProduct)
router.get("/count", productController.getProductCount);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProductById);

module.exports = router;

