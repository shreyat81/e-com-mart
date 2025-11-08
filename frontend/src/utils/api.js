import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const productAPI = {
  // Get all products (with optional query string for filtering)
  getAll: (url) => api.get(url || '/api/products'),
  
  // Get single product by ID
  getById: (id) => api.get(`/api/products/${id}`),
};

export const cartAPI = {
  // Get cart items
  getCart: () => api.get('/api/cart'),
  
  // Add item to cart
  addItem: (productId, qty) => api.post('/api/cart', { productId, qty }),
  
  // Update item quantity
  updateQuantity: (id, qty) => api.put(`/api/cart/${id}`, { qty }),
  
  // Remove item from cart
  removeItem: (id) => api.delete(`/api/cart/${id}`),
  
  // Apply coupon
  applyCoupon: (couponCode) => api.post('/api/cart/apply-coupon', { couponCode }),
  
  // Remove coupon
  removeCoupon: () => api.delete('/api/cart/coupon/remove'),
  
  // Checkout
  checkout: (cartItems, name, email) => 
    api.post('/api/cart/checkout', { cartItems, name, email }),
};

export default api;
