const express = require("express");
const router = express.Router();
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { validateQueries } = require("../../utils/validation.js");
const productController = require("../../controllers/productController");

router.get("/", validateQueries, productController.getAllProducts);
router.get("/:id", validateQueries, productController.getProductById);
// router.post('/', userController.createUser);
// router.put('/:id', userController.updateUser);
router.delete("/:id", productController.deleteProductById);
router.get("/count", validateQueries, productController.getProductCount);

module.exports = router;

// const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
