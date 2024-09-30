const { body, param, validationResult } = require("express-validator");
const {
  Product,
  Subcategory,
  Category,
  Color,
  ProductImage,
} = require("../models");
const fs = require("fs-extra");
const path = require("path");

// Middleware for validating input
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Create a new product
exports.createProduct = [
  // Validation rules
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
  body("subcategoryId").notEmpty().withMessage("subcategoryId is required"),
  validateRequest,
  async (req, res) => {
    try {
      const {
        title,
        description,
        quantity,
        price,
        sizes,
        colorIds,
        subcategoryId,
      } = req.body;
      const imageFiles = req.files;

      const parsedSize = Array.isArray(sizes) ? sizes : JSON.parse(sizes);
      const newProduct = await Product.create({
        title,
        description,
        quantity,
        price,
        size:parsedSize,
        subcategoryId,
      });
      const parsedColorIds = colorIds ? JSON.parse(colorIds) : [];

      if (Array.isArray(parsedColorIds)) {
        await newProduct.setColors(parsedColorIds);
      }

      if (imageFiles && imageFiles.length > 0) {
        const images = imageFiles.map((file) => ({
          productId: newProduct.id,
          image: file.filename,
        }));

        await ProductImage.bulkCreate(images);
      }

      res.status(201).json({ message: "Product created successfully" ,product:newProduct});

    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  },
];

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Subcategory,
          as: "subcategory",
          include: [
            {
              model: Category,
              as: "category",
            },
          ],
        },
        {
          model: Color,
          as: "colors",
        },
        {
          model: ProductImage,
          as: "images",
        },
      ],
      order: [['createdAt', 'DESC']], 
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get a product by ID
exports.getProductById = [
  param("id").isInt().withMessage("Product ID must be an integer"),
  validateRequest,
  async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Subcategory,
            as: "subcategory",
            include: [
              {
                model: Category,
                as: "category",
              },
            ],
          },
          {
            model: Color,
            as: "colors",
          },
          {
            model: ProductImage,
            as: "images",
          },
        ],
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  },
];

// Update a product
exports.updateProduct = [
  param("id").isInt().withMessage("Product ID must be an integer"),
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
  body("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive number"),
  body("subcategoryId")
    .isInt()
    .withMessage("Subcategory ID must be an integer"),
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        quantity,
        price,
        sizes,
        colorIds,
        subcategoryId,
        removedImageIds,
      } = req.body;
      const imageFiles = req.files;

      const product = await Product.findByPk(id, {
        include: [
          {
            model: ProductImage,
            as: "images",
          },
        ],
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (removedImageIds) {
        const existingImages = await ProductImage.findAll({
          where: {
            id: JSON.parse(removedImageIds),
          },
        });
        existingImages.forEach((image) => {
          const imagePath = path.join(
            __dirname,
            "..",
            "uploads/images/products",
            image.image
          );

          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${imagePath}`, err);
            } else {
              console.log(`Deleted file: ${imagePath}`);
            }
          });
        });
        await ProductImage.destroy({
          where: {
            id: JSON.parse(removedImageIds),
          },
        });
      }

      const parsedSize = Array.isArray(sizes) ? sizes : JSON.parse(sizes);

      await product.update({
        title,
        description,
        quantity,
        price,
        size:parsedSize,
        subcategoryId,
      });
      const parsedColorIds = colorIds ? JSON.parse(colorIds) : [];

      if (parsedColorIds && Array.isArray(parsedColorIds)) {
        const colors = await Color.findAll({
          where: { id: parsedColorIds },
        });
        await product.setColors(colors);
      }

      if (imageFiles && imageFiles.length > 0) {
        const images = imageFiles.map((file) => ({
          productId: product.id,
          image: file.filename,
        }));

        await ProductImage.bulkCreate(images);
      }
      const updatedProduct = await Product.findByPk(id, {
        include: [
          {
            model: ProductImage,
            as: "images",
          },
        ],
      });

      res.status(200).json({ message: "Product updated successfully" ,product:updatedProduct});
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  },
];

// Delete a product
exports.deleteProduct = [
  param("id").isInt().withMessage("Product ID must be an integer"),
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.image) {
        await fs.remove(path.join("uploads", product.image));
      }

      await product.destroy();
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  },
];
