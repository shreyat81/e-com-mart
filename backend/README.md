# E-Commerce Cart Backend

A REST API backend for an e-commerce shopping cart application built with Node.js and Express.

## Features

- Get list of products
- Add items to cart
- View cart with total price calculation
- Remove items from cart
- Checkout process

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **MongoDB Models** (optional) - Database schemas for future persistence

## Project Structure

```
backend/
├── server.js                 # Main application entry point
├── package.json             # Project dependencies
├── routes/
│   ├── productRoutes.js    # Product endpoints
│   └── cartRoutes.js       # Cart endpoints
└── models/                  # MongoDB schemas (optional)
    ├── Product.js
    └── CartItem.js
```

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Products

#### Get All Products
```
GET /api/products
```
Returns an array of 10 mock products with id, name, price, and image.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 79.99,
    "image": "https://..."
  }
]
```

### Cart

#### Add Item to Cart
```
POST /api/cart
```
**Body:**
```json
{
  "productId": 1,
  "qty": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Item added to cart",
  "cartItem": {
    "id": 1,
    "productId": 1,
    "qty": 2,
    "price": 79.99
  }
}
```

#### Get Cart
```
GET /api/cart
```

**Response:**
```json
{
  "success": true,
  "cart": [...],
  "total": 159.98,
  "itemCount": 2
}
```

#### Remove Item from Cart
```
DELETE /api/cart/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Item removed from cart",
  "removedItem": {...}
}
```

#### Checkout
```
POST /api/cart/checkout
```

**Body:**
```json
{
  "cartItems": [...],
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "total": 159.98,
  "timestamp": "2025-11-06T...",
  "message": "Checkout successful",
  "orderDetails": {
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "itemCount": 2
  }
}
```

## Notes

- Currently uses in-memory storage for cart items
- Cart is cleared after successful checkout
- MongoDB models are included for future database integration
- Product prices are validated against a mock price list

## Future Enhancements

- Connect to MongoDB for persistence
- User authentication
- Order history
- Inventory management
- Payment gateway integration
