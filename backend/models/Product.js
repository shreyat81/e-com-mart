const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  specifications: {
    type: Object,
    default: {}
  },
  shipping: {
    estimatedDelivery: String,
    charges: Number,
    returnPolicy: String
  },
  offers: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
