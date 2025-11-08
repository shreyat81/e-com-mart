const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true
  },
  items: [{
    productId: {
      type: Number,
      required: true
    },
    name: String,
    price: Number,
    qty: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  appliedCoupon: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
