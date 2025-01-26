const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Set up multer to handle image uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Upload endpoint
router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',  // Optional: Store in specific folder
    });

    res.status(200).json({
      imageUrl: result.secure_url,  // This URL can be stored in your database
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image' });
  }
});

module.exports = router;
