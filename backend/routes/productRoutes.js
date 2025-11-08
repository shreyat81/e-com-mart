const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ id: 1 });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching products',
      error: error.message 
    });
  }
});

// GET /api/products/:id - Get product by ID with related products
router.get('/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findOne({ id: productId });
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    // Get related products (same category, exclude current product, limit 4)
    const relatedProducts = await Product.find({ 
      category: product.category,
      id: { $ne: productId }
    })
    .limit(4)
    .select('id name price image rating reviews');
    
    // Return product with related products
    res.json({
      ...product.toObject(),
      relatedProducts
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching product',
      error: error.message 
    });
  }
});

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ 
      category: { $regex: new RegExp(category, 'i') } 
    }).sort({ id: 1 });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching products by category',
      error: error.message 
    });
  }
});

module.exports = router;

// Enhanced mock product data with full details (Prices in INR)
const products = [
  {
    id: 1,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    price: 29990,
    image: '/black-headphones-pink_94046-1948.webp',
    category: 'Electronics',
    type: 'Audio',
    brand: 'Sony',
    rating: 4.8,
    reviews: 245,
    inStock: true,
    description: 'Industry-leading noise cancellation with premium sound quality. 30-hour battery life with quick charging support.',
    specifications: {
      brand: 'Sony',
      model: 'WH-1000XM5',
      connectivity: 'Bluetooth 5.2, 3.5mm Jack',
      batteryLife: '30 hours',
      noiseCancellation: 'Active Noise Cancellation',
      weight: '250g',
      color: 'Black'
    },
    shipping: {
      estimatedDelivery: '3-5 business days',
      charges: 0,
      returnPolicy: '30-day return policy'
    },
    offers: [
      '10% instant discount with HDFC Credit Card',
      'No-cost EMI available',
      'Free delivery'
    ]
  },
  {
    id: 2,
    name: 'Apple Watch Series 9 GPS 41mm',
    price: 41900,
    image: '/apple-watch-sport-42mm-silver-aluminum-case-with-black-band.webp',
    category: 'Electronics',
    type: 'Wearables',
    brand: 'Apple',
    rating: 4.9,
    reviews: 892,
    inStock: true,
    description: 'Advanced health and fitness tracking. Always-on Retina display with S9 chip for peak performance.',
    specifications: {
      brand: 'Apple',
      model: 'Series 9',
      display: '1.9" Retina LTPO OLED',
      processor: 'S9 SiP',
      storage: '32GB',
      waterResistance: '50m',
      batteryLife: '18 hours'
    },
    shipping: {
      estimatedDelivery: '2-4 business days',
      charges: 0,
      returnPolicy: '14-day return policy'
    },
    offers: [
      '5% cashback on Amazon Pay ICICI Card',
      'Free engraving',
      '1-year warranty included'
    ]
  },
  {
    id: 3,
    name: 'Anker USB-C to Lightning Cable (6ft)',
    price: 1299,
    image: '/usb-c-3-0-data-100w-pd-with-1000m-ethernet-rj45-multiport-original-imahap4hvqwyvhfj.webp',
    category: 'Accessories',
    type: 'Cables',
    brand: 'Anker',
    rating: 4.5,
    reviews: 1560,
    inStock: true,
    description: 'MFi certified fast charging cable. Durable braided design with 10000+ bend lifespan.',
    specifications: {
      brand: 'Anker',
      model: 'PowerLine II',
      length: '6ft / 1.8m',
      connector: 'USB-C to Lightning',
      certification: 'MFi Certified',
      color: 'Black',
      warranty: 'Lifetime warranty'
    },
    shipping: {
      estimatedDelivery: '2-3 business days',
      charges: 0,
      returnPolicy: '30-day return policy'
    },
    offers: [
      'Buy 2 Get 10% off',
      'Free delivery'
    ]
  },
  {
    id: 4,
    name: 'Dell Inspiron 15 Laptop (i5, 8GB, 512GB SSD)',
    price: 52990,
    image: '/61DcTof0gkL.webp',
    category: 'Electronics',
    type: 'Laptops',
    brand: 'Dell',
    rating: 4.4,
    reviews: 543,
    inStock: true,
    description: '15.6" FHD display with 11th Gen Intel Core i5 processor. Perfect for work and entertainment.',
    specifications: {
      brand: 'Dell',
      model: 'Inspiron 15 3511',
      processor: 'Intel Core i5-1135G7',
      ram: '8GB DDR4',
      storage: '512GB SSD',
      display: '15.6" FHD',
      graphics: 'Intel Iris Xe'
    },
    shipping: {
      estimatedDelivery: '3-5 business days',
      charges: 0,
      returnPolicy: '10-day return policy'
    },
    offers: [
      '₹2000 instant discount with ICICI Cards',
      'No-cost EMI available',
      '1-year warranty'
    ]
  },
  {
    id: 5,
    name: 'Anker PowerCore 20000mAh Power Bank',
    price: 2999,
    image: '/eng_pl_Baseus-Free2Pull-10000mAh-30W-powerbank-with-USB-C-port-and-retractable-USB-C-cable-black-168911_4_533x.webp',
    category: 'Accessories',
    type: 'Power Banks',
    brand: 'Anker',
    rating: 4.6,
    reviews: 724,
    inStock: true,
    description: 'Ultra-high-capacity portable charger with dual USB ports. Fast charging support.',
    specifications: {
      brand: 'Anker',
      model: 'PowerCore 20K',
      capacity: '20000mAh',
      output: 'Dual USB (2.4A each)',
      input: 'Micro USB / USB-C',
      weight: '356g',
      rechargeTime: '10 hours'
    },
    shipping: {
      estimatedDelivery: '2-3 business days',
      charges: 0,
      returnPolicy: '18-month warranty'
    },
    offers: [
      '10% off on prepaid orders',
      'Free delivery',
      'Exchange offer available'
    ]
  },
  {
    id: 6,
    name: 'JBL Flip 6 Portable Bluetooth Speaker',
    price: 9999,
    image: '/portable-bluetooth-speaker-with-silicone-handle-isolated-on-white-background.webp',
    category: 'Electronics',
    type: 'Audio',
    brand: 'JBL',
    rating: 4.7,
    reviews: 438,
    inStock: true,
    description: 'Waterproof portable speaker with powerful sound. 12-hour playtime with deep bass.',
    specifications: {
      brand: 'JBL',
      model: 'Flip 6',
      bluetooth: 'Bluetooth 5.1',
      batteryLife: '12 hours',
      waterproof: 'IP67',
      weight: '550g',
      output: '30W'
    },
    shipping: {
      estimatedDelivery: '2-4 business days',
      charges: 0,
      returnPolicy: '30-day return policy'
    },
    offers: [
      '15% cashback on Amazon Pay',
      'Free carrying case',
      'No-cost EMI for 3 months'
    ]
  },
  {
    id: 7,
    name: 'Lamicall Adjustable Phone Stand',
    price: 599,
    image: '/apple-watch-sport-42mm-silver-aluminum-case-with-black-band.webp',
    category: 'Accessories',
    type: 'Phone Accessories',
    brand: 'Lamicall',
    rating: 4.4,
    reviews: 267,
    inStock: true,
    description: 'Multi-angle aluminum phone stand for desk. Compatible with all smartphones and tablets.',
    specifications: {
      brand: 'Lamicall',
      model: 'S1',
      material: 'Aluminum alloy',
      compatibility: '4-13 inch devices',
      adjustableAngles: 'Yes',
      weight: '180g',
      color: 'Silver'
    },
    shipping: {
      estimatedDelivery: '3-4 business days',
      charges: 0,
      returnPolicy: '30-day return policy'
    },
    offers: [
      'Buy 2 Get 15% off',
      'Free delivery'
    ]
  },
  {
    id: 8,
    name: 'Logitech MX Master 3S Wireless Mouse',
    price: 8999,
    image: '/usb-c-3-0-data-100w-pd-with-1000m-ethernet-rj45-multiport-original-imahap4hvqwyvhfj.webp',
    category: 'Electronics',
    type: 'Computer Accessories',
    brand: 'Logitech',
    rating: 4.8,
    reviews: 1243,
    inStock: true,
    description: 'Advanced wireless mouse with ultra-fast scrolling. Ergonomic design for productivity.',
    specifications: {
      brand: 'Logitech',
      model: 'MX Master 3S',
      connectivity: 'Bluetooth, USB Receiver',
      sensor: '8000 DPI',
      batteryLife: '70 days',
      buttons: '7 programmable',
      weight: '141g'
    },
    shipping: {
      estimatedDelivery: '2-3 business days',
      charges: 0,
      returnPolicy: '30-day return policy'
    },
    offers: [
      '10% instant discount with bank cards',
      'Free delivery',
      '1-year warranty'
    ]
  },
  {
    id: 9,
    name: 'OnePlus Nord CE 3 Lite 5G (8GB, 128GB)',
    price: 19999,
    image: '/61DcTof0gkL.webp',
    category: 'Electronics',
    type: 'Smartphones',
    brand: 'OnePlus',
    rating: 4.3,
    reviews: 534,
    inStock: true,
    description: '6.72" FHD+ display with 108MP camera. Snapdragon 695 5G processor for smooth performance.',
    specifications: {
      brand: 'OnePlus',
      model: 'Nord CE 3 Lite',
      display: '6.72" FHD+ 120Hz',
      processor: 'Snapdragon 695',
      ram: '8GB',
      storage: '128GB',
      camera: '108MP + 2MP + 2MP'
    },
    shipping: {
      estimatedDelivery: '2-3 business days',
      charges: 0,
      returnPolicy: '10-day replacement'
    },
    offers: [
      'Exchange offer up to ₹15,000',
      'No-cost EMI available',
      '1-year warranty'
    ]
  },
  {
    id: 10,
    name: 'Logitech C920 HD Pro Webcam',
    price: 6499,
    image: '/portable-bluetooth-speaker-with-silicone-handle-isolated-on-white-background.webp',
    category: 'Electronics',
    type: 'Computer Accessories',
    brand: 'Logitech',
    rating: 4.5,
    reviews: 892,
    inStock: true,
    description: 'Full HD 1080p webcam with auto-focus. Built-in stereo microphones for clear audio.',
    specifications: {
      brand: 'Logitech',
      model: 'C920',
      resolution: '1080p at 30fps',
      fieldOfView: '78 degrees',
      autofocus: 'Yes',
      microphone: 'Dual stereo',
      mounting: 'Universal clip'
    },
    shipping: {
      estimatedDelivery: '3-5 business days',
      charges: 0,
      returnPolicy: '30-day return policy'
    },
    offers: [
      '15% off on prepaid orders',
      'Free tripod stand worth ₹499',
      'Free shipping'
    ]
  },
  {
    id: 11,
    name: 'boAt Airdopes 131 TWS Earbuds',
    price: 1299,
    image: '/black-headphones-pink_94046-1948.webp',
    category: 'Electronics',
    type: 'Audio',
    brand: 'boAt',
    rating: 4.1,
    reviews: 8456,
    inStock: true,
    description: 'True wireless earbuds with 60-hour playback. IPX4 water resistant with BEAST mode for gaming.',
    specifications: {
      brand: 'boAt',
      model: 'Airdopes 131',
      bluetooth: 'Bluetooth 5.3',
      playback: '60 hours',
      waterResistance: 'IPX4',
      charging: 'Type-C fast charging',
      driver: '13mm'
    },
    shipping: {
      estimatedDelivery: '2-3 business days',
      charges: 0,
      returnPolicy: '7-day replacement'
    },
    offers: [
      '10% instant discount on HDFC Cards',
      'Free delivery',
      '1-year warranty'
    ]
  },
  {
    id: 12,
    name: 'Samsung Galaxy M14 5G (6GB, 128GB)',
    price: 13990,
    image: '/eng_pl_Baseus-Free2Pull-10000mAh-30W-powerbank-with-USB-C-port-and-retractable-USB-C-cable-black-168911_4_533x.webp',
    category: 'Electronics',
    type: 'Smartphones',
    brand: 'Samsung',
    rating: 4.2,
    reviews: 1567,
    inStock: true,
    description: '6.6" FHD+ display with 50MP triple camera. 6000mAh battery with Exynos 1330 processor.',
    specifications: {
      brand: 'Samsung',
      model: 'Galaxy M14 5G',
      display: '6.6" FHD+ 90Hz',
      processor: 'Exynos 1330',
      ram: '6GB',
      storage: '128GB',
      camera: '50MP + 2MP + 2MP',
      battery: '6000mAh'
    },
    shipping: {
      estimatedDelivery: '2-3 business days',
      charges: 0,
      returnPolicy: '10-day replacement'
    },
    offers: [
      'Exchange offer up to ₹10,500',
      'No-cost EMI available',
      '1-year warranty'
    ]
  }
];

// GET /api/products - Get all products with filtering, sorting, and search
router.get('/', (req, res) => {
  const {
    category,
    type,
    minPrice,
    maxPrice,
    sort,
    search,
    brand
  } = req.query;

  let filteredProducts = [...products];

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by type
  if (type) {
    filteredProducts = filteredProducts.filter(p => 
      p.type.toLowerCase() === type.toLowerCase()
    );
  }

  // Filter by brand
  if (brand) {
    filteredProducts = filteredProducts.filter(p => 
      p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => 
      p.price >= parseFloat(minPrice)
    );
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => 
      p.price <= parseFloat(maxPrice)
    );
  }

  // Search by name or brand
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort products
  if (sort) {
    switch (sort) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filteredProducts.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }
  }

  res.json(filteredProducts);
});

// GET /api/products/:id - Get single product details
router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ 
      success: false, 
      message: 'Product not found' 
    });
  }

  // Get related products (same category, exclude current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  res.json({
    ...product,
    relatedProducts
  });
});

module.exports = router;
