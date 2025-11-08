const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Fake Store API base URL
const FAKE_STORE_API = 'https://fakestoreapi.com';

// GET /api/fakestore/products - Fetch and integrate Fake Store products
router.get('/products', async (req, res) => {
  try {
    const response = await fetch(`${FAKE_STORE_API}/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Fake Store API');
    }

    const fakeStoreProducts = await response.json();

    // Transform Fake Store products to our schema
    const transformedProducts = fakeStoreProducts.map((product, index) => ({
      id: 100 + product.id, // Offset IDs to avoid conflicts
      name: product.title,
      price: Math.round(product.price * 83), // Convert USD to INR (approx)
      image: product.image,
      description: product.description,
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      rating: product.rating.rate,
      reviews: product.rating.count,
      inStock: true
    }));

    res.json({
      success: true,
      count: transformedProducts.length,
      products: transformedProducts
    });
  } catch (error) {
    console.error('Error fetching from Fake Store API:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products from Fake Store API',
      error: error.message
    });
  }
});

// POST /api/fakestore/import - Import Fake Store products to our database
router.post('/import', async (req, res) => {
  try {
    const response = await fetch(`${FAKE_STORE_API}/products`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Fake Store API');
    }

    const fakeStoreProducts = await response.json();

    // Transform and prepare for import
    const productsToImport = fakeStoreProducts.map((product) => ({
      id: 100 + product.id,
      name: product.title,
      price: Math.round(product.price * 83),
      image: product.image,
      description: product.description,
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      rating: product.rating.rate,
      reviews: product.rating.count,
      inStock: true
    }));

    // Remove existing Fake Store products (IDs 100+)
    await Product.deleteMany({ id: { $gte: 100 } });

    // Insert new products
    const imported = await Product.insertMany(productsToImport);

    res.json({
      success: true,
      message: `Successfully imported ${imported.length} products from Fake Store API`,
      count: imported.length,
      products: imported
    });
  } catch (error) {
    console.error('Error importing from Fake Store API:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to import products from Fake Store API',
      error: error.message
    });
  }
});

// GET /api/fakestore/categories - Get categories from Fake Store API
router.get('/categories', async (req, res) => {
  try {
    const response = await fetch(`${FAKE_STORE_API}/products/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categories = await response.json();

    res.json({
      success: true,
      categories: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

// GET /api/fakestore/product/:id - Get single product from Fake Store API
router.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${FAKE_STORE_API}/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Product not found');
    }

    const product = await response.json();

    // Transform to our schema
    const transformedProduct = {
      id: 100 + product.id,
      name: product.title,
      price: Math.round(product.price * 83),
      image: product.image,
      description: product.description,
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      rating: product.rating.rate,
      reviews: product.rating.count,
      inStock: true
    };

    res.json({
      success: true,
      product: transformedProduct
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(404).json({
      success: false,
      message: 'Product not found',
      error: error.message
    });
  }
});

module.exports = router;
