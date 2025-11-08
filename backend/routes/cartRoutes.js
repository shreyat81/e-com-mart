const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const Order = require('../models/Order');

// For demo purposes, using a fixed userId. In production, use authentication.
const DEFAULT_USER_ID = 'demo-user';

// Valid coupons (INR amounts)
const coupons = {
  'FLAT10': { type: 'percentage', value: 10, minOrder: 1000 },
  'NEWUSER': { type: 'percentage', value: 15, minOrder: 5000 },
  'SAVE50': { type: 'fixed', value: 500, minOrder: 10000 },
  'FREESHIP': { type: 'shipping', value: 0, minOrder: 0 }
};

// In-memory storage for applied coupon (per user session)
let appliedCoupons = {};

// Calculate totals with coupon
const calculateTotals = (cartItems, userId = DEFAULT_USER_ID) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = 0;

  const appliedCoupon = appliedCoupons[userId];
  if (appliedCoupon) {
    const coupon = coupons[appliedCoupon];
    if (coupon) {
      if (subtotal >= coupon.minOrder) {
        if (coupon.type === 'percentage') {
          discount = (subtotal * coupon.value) / 100;
        } else if (coupon.type === 'fixed') {
          discount = coupon.value;
        }
      }
    }
  }

  const total = subtotal - discount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    appliedCoupon: appliedCoupon || null
  };
};

// POST /api/cart - Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.body.userId || DEFAULT_USER_ID;

    if (!productId || !qty) {
      return res.status(400).json({ 
        success: false, 
        message: 'productId and qty are required' 
      });
    }

    if (qty <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be greater than 0' 
      });
    }

    // Check if product exists
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    // Check if item already exists in cart
    let cartItem = await CartItem.findOne({ 
      productId: product._id, 
      userId 
    });

    if (cartItem) {
      // Update existing cart item
      cartItem.qty += qty;
      await cartItem.save();
      
      return res.json({ 
        success: true, 
        message: 'Cart updated',
        cartItem 
      });
    }

    // Create new cart item
    cartItem = new CartItem({
      productId: product._id,
      qty,
      price: product.price,
      userId
    });

    await cartItem.save();

    res.status(201).json({ 
      success: true, 
      message: 'Item added to cart',
      cartItem 
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding to cart',
      error: error.message 
    });
  }
});

// GET /api/cart - Get all cart items with total price
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || DEFAULT_USER_ID;

    const cartItems = await CartItem.find({ userId })
      .populate('productId', 'id name image price category')
      .sort({ createdAt: -1 });

    // Filter out items with deleted/null products and transform
    const transformedCart = cartItems
      .filter(item => item.productId != null) // Skip if product was deleted
      .map(item => ({
        id: item._id,
        productId: item.productId.id,
        productName: item.productId.name,
        productImage: item.productId.image,
        qty: item.qty,
        price: item.price,
        _id: item._id
      }));

    const totals = calculateTotals(transformedCart, userId);

    res.json({
      success: true,
      cart: transformedCart,
      ...totals,
      itemCount: transformedCart.reduce((sum, item) => sum + item.qty, 0)
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching cart',
      error: error.message 
    });
  }
});

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.body.userId || DEFAULT_USER_ID;

    const cartItem = await CartItem.findOneAndDelete({ 
      _id: itemId, 
      userId 
    });

    if (!cartItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart item not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Item removed from cart',
      removedItem: cartItem 
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error removing from cart',
      error: error.message 
    });
  }
});

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const { qty } = req.body;
    const userId = req.body.userId || DEFAULT_USER_ID;

    if (!qty || qty < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cartItem = await CartItem.findOne({ 
      _id: itemId, 
      userId 
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    cartItem.qty = qty;
    await cartItem.save();

    res.json({
      success: true,
      message: 'Cart updated',
      cartItem
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating cart',
      error: error.message 
    });
  }
});

// POST /api/cart/apply-coupon - Apply coupon code
router.post('/apply-coupon', async (req, res) => {
  try {
    const { couponCode } = req.body;
    const userId = req.body.userId || DEFAULT_USER_ID;

    if (!couponCode) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code is required'
      });
    }

    const coupon = coupons[couponCode.toUpperCase()];

    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coupon code'
      });
    }

    // Get cart items to calculate subtotal
    const cartItems = await CartItem.find({ userId });
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (subtotal < coupon.minOrder) {
      return res.status(400).json({
        success: false,
        message: `Minimum order value of ₹${coupon.minOrder.toLocaleString('en-IN')} required for this coupon`
      });
    }

    appliedCoupons[userId] = couponCode.toUpperCase();

    // Transform cart items for totals calculation
    const transformedCart = cartItems.map(item => ({
      price: item.price,
      qty: item.qty
    }));

    const totals = calculateTotals(transformedCart, userId);

    res.json({
      success: true,
      message: 'Coupon applied successfully',
      couponCode: appliedCoupons[userId],
      ...totals
    });
  } catch (error) {
    console.error('Error applying coupon:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error applying coupon',
      error: error.message 
    });
  }
});

// DELETE /api/cart/coupon - Remove applied coupon
router.delete('/coupon/remove', async (req, res) => {
  try {
    const userId = req.body.userId || DEFAULT_USER_ID;
    
    delete appliedCoupons[userId];

    // Get cart items for totals calculation
    const cartItems = await CartItem.find({ userId });
    const transformedCart = cartItems.map(item => ({
      price: item.price,
      qty: item.qty
    }));

    const totals = calculateTotals(transformedCart, userId);

    res.json({
      success: true,
      message: 'Coupon removed',
      ...totals
    });
  } catch (error) {
    console.error('Error removing coupon:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error removing coupon',
      error: error.message 
    });
  }
});

// POST /api/cart/checkout - Process checkout
router.post('/checkout', async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.body.userId || DEFAULT_USER_ID;

    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required' 
      });
    }

    // Get cart items
    const cartItems = await CartItem.find({ userId })
      .populate('productId', 'id name price');

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }

    // Transform cart items for order
    const orderItems = cartItems.map(item => ({
      productId: item.productId.id,
      name: item.productId.name,
      price: item.price,
      qty: item.qty
    }));

    // Calculate totals
    const transformedCart = cartItems.map(item => ({
      price: item.price,
      qty: item.qty
    }));

    const totals = calculateTotals(transformedCart, userId);

    // Create order in database
    const order = new Order({
      customerName: name,
      customerEmail: email,
      items: orderItems,
      subtotal: totals.subtotal,
      discount: totals.discount,
      total: totals.total,
      appliedCoupon: appliedCoupons[userId] || null,
      status: 'confirmed'
    });

    await order.save();

    // Clear the cart after successful checkout
    await CartItem.deleteMany({ userId });
    delete appliedCoupons[userId];

    res.json({
      success: true,
      message: 'Checkout successful',
      orderId: order._id,
      total: totals.total,
      timestamp: order.createdAt,
      orderDetails: {
        customerName: name,
        customerEmail: email,
        itemCount: cartItems.reduce((sum, item) => sum + item.qty, 0),
        items: orderItems
      }
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing checkout',
      error: error.message 
    });
  }
});

module.exports = router;
