const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const fakeStoreRoutes = require('./routes/fakeStoreRoutes');

const { notFound, errorHandler, requestLogger } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommart';

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger); // Log all requests

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/fakestore', fakeStoreRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'E-Commerce Cart API with Fake Store Integration',
    version: '2.0.0',
    endpoints: {
      products: '/api/products',
      cart: '/api/cart',
      auth: '/api/auth',
      fakestore: '/api/fakestore',
      health: '/health'
    }
  });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📦 API Documentation: http://localhost:${PORT}/`);
});
