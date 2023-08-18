const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Product = require('../models/Product');


const storage = multer.diskStorage({
  destination: path.join(__dirname, '../static/img'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.json({ error: 'Server error' });
  }
});

// Add a product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file;

    if (!name || !price || !image) {
      return res.json({ error: 'Missing required fields' });
    }

    const newProduct = new Product({ name, price, image: image.filename });
    await newProduct.save();
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.json({ error: 'Server error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.json({ error: 'Server error' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { name, price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true }
    );
    if (!updatedProduct) {
      return res.json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.json({ error: 'Server error' });
  }
});

module.exports = router;
