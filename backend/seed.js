const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommart';

const products = [
  {
    id: 1,
    name: 'Sony WH-1000XM4 Wireless Noise-Canceling Headphones',
    price: 29990,
    category: 'Audio',
    brand: 'Sony',
    image: '/black-headphones-pink_94046-1948.webp',
    description: 'Industry-leading noise cancellation with premium sound quality',
    rating: 4.8,
    reviews: 1234,
    inStock: true,
    specifications: {
      brand: 'Sony',
      model: 'WH-1000XM4',
      connectivity: 'Bluetooth 5.0, 3.5mm Jack',
      batteryLife: '30 hours',
      noiseCancellation: 'Active Noise Cancellation',
      weight: '254g',
      color: 'Black'
    },
    shipping: {
      estimatedDelivery: '2-3 business days',
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
    name: 'Apple Watch Series 9 GPS 42mm',
    price: 41900,
    category: 'Wearables',
    brand: 'Apple',
    image: '/apple-watch-sport-42mm-silver-aluminum-case-with-black-band.webp',
    description: 'Advanced fitness tracking with heart rate monitoring',
    rating: 4.7,
    reviews: 892,
    inStock: true,
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
    name: 'USB-C 3.0 Data Cable with 100W PD & Ethernet',
    price: 1299,
    category: 'Accessories',
    brand: 'Anker',
    image: '/usb-c-3-0-data-100w-pd-with-1000m-ethernet-rj45-multiport-original-imahap4hvqwyvhfj.webp',
    description: 'High-speed data transfer with power delivery',
    rating: 4.3,
    reviews: 456,
    inStock: true,
    specifications: {
      brand: 'Anker',
      model: 'PowerLine III',
      length: '6ft / 1.8m',
      connector: 'USB-C to USB-C',
      powerDelivery: '100W',
      dataSpeed: '10Gbps',
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
    name: 'Dell XPS 15 Laptop - Intel i7, 16GB RAM, 512GB SSD',
    price: 52990,
    category: 'Laptops',
    brand: 'Dell',
    image: '/laptop-promo-above-dell-pro.webp',
    description: 'Powerful laptop for professionals and creators',
    rating: 4.6,
    reviews: 678,
    inStock: true,
    specifications: {
      brand: 'Dell',
      model: 'XPS 15 9530',
      processor: 'Intel Core i7-13700H',
      ram: '16GB DDR5',
      storage: '512GB NVMe SSD',
      display: '15.6" FHD+ (1920x1200)',
      graphics: 'NVIDIA GeForce RTX 4050',
      weight: '1.86kg'
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
    name: 'Baseus Free2Pull 10000mAh 30W Power Bank',
    price: 2999,
    category: 'Accessories',
    brand: 'Baseus',
    image: '/eng_pl_Baseus-Free2Pull-10000mAh-30W-powerbank-with-USB-C-port-and-retractable-USB-C-cable-black-168911_4_533x.webp',
    description: 'Portable charger with retractable cable',
    rating: 4.4,
    reviews: 523,
    inStock: true,
    specifications: {
      brand: 'Baseus',
      model: 'Free2Pull',
      capacity: '10000mAh',
      output: 'USB-C 30W PD',
      input: 'USB-C 18W',
      cable: 'Retractable USB-C',
      weight: '215g'
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
    category: 'Audio',
    brand: 'JBL',
    image: '/portable-bluetooth-speaker-with-silicone-handle-isolated-on-white-background.webp',
    description: 'Waterproof speaker with powerful sound',
    rating: 4.5,
    reviews: 789,
    inStock: true,
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
    name: 'Samsung Galaxy Buds Pro',
    price: 599,
    category: 'Audio',
    brand: 'Samsung',
    image: '/black-headphones-pink_94046-1948.webp',
    description: 'True wireless earbuds with active noise cancellation',
    rating: 4.6,
    reviews: 912,
    inStock: true,
    specifications: {
      brand: 'Samsung',
      model: 'Galaxy Buds Pro',
      bluetooth: 'Bluetooth 5.0',
      batteryLife: '5 hours (ANC on)',
      noiseCancellation: 'Active Noise Cancellation',
      waterResistance: 'IPX7',
      driver: '11mm + 6.5mm'
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
    id: 8,
    name: 'Fitbit Charge 5 Fitness Tracker',
    price: 8999,
    category: 'Wearables',
    brand: 'Fitbit',
    image: '/apple-watch-sport-42mm-silver-aluminum-case-with-black-band.webp',
    description: 'Advanced health tracking with built-in GPS',
    rating: 4.4,
    reviews: 634,
    inStock: true,
    specifications: {
      brand: 'Fitbit',
      model: 'Charge 5',
      display: '1.04" AMOLED',
      sensors: 'Heart Rate, GPS, SpO2',
      batteryLife: '7 days',
      waterResistance: '50m',
      compatibility: 'iOS & Android'
    },
    shipping: {
      estimatedDelivery: '2-3 business days',
      charges: 0,
      returnPolicy: '30-day return policy'
    },
    offers: [
      '6 months Fitbit Premium free',
      'Free delivery',
      'No-cost EMI available'
    ]
  },
  {
    id: 9,
    name: 'Anker PowerLine III USB-C Cable (6ft)',
    price: 19999,
    category: 'Accessories',
    brand: 'Anker',
    image: '/usb-c-3-0-data-100w-pd-with-1000m-ethernet-rj45-multiport-original-imahap4hvqwyvhfj.webp',
    description: 'Durable fast-charging cable with lifetime warranty',
    rating: 4.7,
    reviews: 1456,
    inStock: true,
    specifications: {
      brand: 'Anker',
      model: 'PowerLine III',
      length: '6ft / 1.8m',
      connector: 'USB-C to Lightning',
      certification: 'MFi Certified',
      durability: '35000+ bend lifespan',
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
    id: 10,
    name: 'HP Pavilion 14 - AMD Ryzen 5, 8GB RAM',
    price: 6499,
    category: 'Laptops',
    brand: 'HP',
    image: '/laptop-promo-above-dell-pro.webp',
    description: 'Affordable laptop for everyday computing',
    rating: 4.3,
    reviews: 345,
    inStock: true,
    specifications: {
      brand: 'HP',
      model: 'Pavilion 14-ec1000',
      processor: 'AMD Ryzen 5 5625U',
      ram: '8GB DDR4',
      storage: '512GB SSD',
      display: '14" FHD (1920x1080)',
      graphics: 'AMD Radeon',
      weight: '1.41kg'
    },
    shipping: {
      estimatedDelivery: '3-5 business days',
      charges: 0,
      returnPolicy: '10-day replacement'
    },
    offers: [
      'Exchange offer up to ₹5,000',
      'No-cost EMI available',
      '1-year warranty'
    ]
  },
  {
    id: 11,
    name: 'Anker PowerCore 20000mAh Power Bank',
    price: 1299,
    category: 'Accessories',
    brand: 'Anker',
    image: '/eng_pl_Baseus-Free2Pull-10000mAh-30W-powerbank-with-USB-C-port-and-retractable-USB-C-cable-black-168911_4_533x.webp',
    description: 'High-capacity portable charger for multiple devices',
    rating: 4.5,
    reviews: 2341,
    inStock: true,
    specifications: {
      brand: 'Anker',
      model: 'PowerCore 20000',
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
    id: 12,
    name: 'Bose SoundLink Revolve+ Bluetooth Speaker',
    price: 13990,
    category: 'Audio',
    brand: 'Bose',
    image: '/portable-bluetooth-speaker-with-silicone-handle-isolated-on-white-background.webp',
    description: '360-degree sound with water-resistant design',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    specifications: {
      brand: 'Bose',
      model: 'SoundLink Revolve+',
      bluetooth: 'Bluetooth 4.2',
      batteryLife: '16 hours',
      waterResistance: 'IPX4',
      weight: '910g',
      sound: '360-degree coverage'
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
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    const inserted = await Product.insertMany(products);
    console.log(`✅ Inserted ${inserted.length} products`);

    console.log('\n📦 Products in database:');
    inserted.forEach(product => {
      console.log(`  - ${product.name} (₹${product.price.toLocaleString('en-IN')})`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
