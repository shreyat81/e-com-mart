const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mock session storage (in production, use JWT or sessions)
let currentUser = null;

// POST /api/auth/guest - Create guest user session
router.post('/guest', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if guest user already exists
    let user = await User.findOne({ email, isGuest: true });

    if (!user) {
      // Create new guest user
      user = new User({
        name: name || 'Guest User',
        email: email || `guest_${Date.now()}@ecommart.com`,
        password: 'guest123', // Mock password
        isGuest: true
      });
      await user.save();
    }

    currentUser = user;

    res.json({
      success: true,
      message: 'Guest session created',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isGuest: user.isGuest
      }
    });
  } catch (error) {
    console.error('Error creating guest session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create guest session',
      error: error.message
    });
  }
});

// POST /api/auth/register - Register new user (mock)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user (mock - no password hashing for demo)
    const user = new User({
      name,
      email,
      password, // In production, hash this!
      phone,
      isGuest: false
    });

    await user.save();
    currentUser = user;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isGuest: user.isGuest
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// POST /api/auth/login - Login user (mock)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Mock password check (in production, use bcrypt)
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    currentUser = user;

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isGuest: user.isGuest
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// GET /api/auth/current - Get current user
router.get('/current', async (req, res) => {
  try {
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: 'No active session'
      });
    }

    const user = await User.findById(currentUser._id).select('-password');
    
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
      error: error.message
    });
  }
});

// POST /api/auth/logout - Logout user
router.post('/logout', (req, res) => {
  currentUser = null;
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Export current user getter for other routes
router.getCurrentUser = () => currentUser;

module.exports = router;
