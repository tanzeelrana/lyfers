const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");

const productController = require("../controllers/productController");

// Handle multiple image uploads
router.post(
  "/",
  (req, res, next) => {
    req.folder = "products";
    next();
  },
  upload.array("images"),
  productController.createProduct
);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  (req, res, next) => {
    req.folder = "products";
    next();
  },
  upload.array("images"),
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
