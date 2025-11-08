const mongoose = require('mongoose');
require('dotenv').config();
const CartItem = require('./models/CartItem');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommart';

async function cleanupCart() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all cart items (fresh start)
    const result = await CartItem.deleteMany({});
    console.log(`🗑️  Cleared ${result.deletedCount} cart items`);

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Cart cleanup completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning cart:', error);
    process.exit(1);
  }
}

cleanupCart();
