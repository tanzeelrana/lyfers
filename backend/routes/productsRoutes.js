const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");

const productController = require("../controllers/productController");
const {authenticateAdmin,authenticate} = require("../middleware/authMiddleware")

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
router.get("/random", productController.getRamdomProducts);
router.get("/features", productController.getHomePageProducts);


router.get("/:id",authenticate, productController.getProductById);
router.get("/category/:subcategoryId",authenticate, productController.getAllProductsByCategory);

router.put(
  "/:id", authenticateAdmin,
  (req, res, next) => {
    req.folder = "products";
    next();
  },
  upload.array("images"),
  productController.updateProduct
);
router.delete("/:id",authenticateAdmin, productController.deleteProduct);

module.exports = router;
