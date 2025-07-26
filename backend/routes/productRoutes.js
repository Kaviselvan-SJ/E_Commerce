import express from 'express';
import { getAllProducts, addProduct } from '../controllers/productController.js';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);

// GET /api/products/:id - Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
