// multerConfig.js
const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine folder based on a property in the request
    const folder = req.folder || 'uploads'; // Default to 'default' if not specified
    const uploadPath = path.join(__dirname, `../uploads/images/${folder}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Create Multer instance with storage configuration
const upload = multer({ storage });

module.exports = upload;
