const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer setup for Cloudinary storage
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Upload a post
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const newPost = new Post({
      userId: req.user,
      imageUrl: result.secure_url,
      caption: req.body.caption,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.userId.toString() !== req.user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    await post.deleteOne();
    res.json({ msg: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
