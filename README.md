# 🛒 Vibe Commerce - Full Stack E-Commerce Shopping Cart

A modern, full-stack shopping cart application built for Vibe Commerce screening with Best Buy-inspired design. Features complete product browsing, cart management, checkout flow, and MongoDB persistence.

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/home.png)
*Modern landing page with category navigation and search*

### Products Catalog
![Products Page](./screenshots/products.png)
*12 products with filters, sorting, and search functionality*

### Product Details
![Product Details](./screenshots/product-details.png)
*Detailed product view with specifications, offers, and recommended products*

### Shopping Cart
![Shopping Cart](./screenshots/cart.png)
*Cart with quantity controls, coupon system, and real-time totals*

### Checkout
![Checkout](./screenshots/checkout.png)
*Secure checkout form with order summary*

### Order Confirmation
![Receipt](./screenshots/receipt.png)
*Order confirmation modal with receipt details*

---

## 🎯 Assignment Requirements Checklist

### ✅ Backend APIs (All Implemented)
- ✅ **GET /api/products** - Fetch all products (12 items with full details)
- ✅ **POST /api/cart** - Add items to cart with quantity
- ✅ **DELETE /api/cart/:id** - Remove items from cart
- ✅ **GET /api/cart** - Get cart items with calculated total
- ✅ **POST /api/checkout** - Process checkout and generate receipt

### ✅ Frontend (React)
- ✅ **Products Grid** - Displays all products with "Add to Cart" buttons
- ✅ **Cart View** - Shows items, quantities, totals with update/remove buttons
- ✅ **Checkout Form** - Name & email inputs with validation
- ✅ **Receipt Modal** - Displays order confirmation with total & timestamp
- ✅ **Responsive Design** - Mobile-first, works on all screen sizes

### ✅ Bonus Features (All Implemented)
- ✅ **MongoDB Database Persistence** - All data stored in MongoDB
- ✅ **Mock User System** - User model with cart, wishlist, orders
- ✅ **Error Handling** - Centralized error middleware
- ✅ **Fake Store API Integration** - External API integration route

### ✅ Additional Features (Beyond Requirements)
- ✅ **Product Details Page** - Full specifications, shipping info, related products
- ✅ **Filters & Search** - Category, type, price range, search functionality
- ✅ **Coupon System** - 4 working coupons (FLAT10, NEWUSER, SAVE50, FREESHIP)
- ✅ **Quantity Controls** - +/- buttons in cart for easy updates
- ✅ **Best Buy Theme** - Professional blue (#0046BE) and yellow (#FFF200) design
- ✅ **Indian Rupees (₹)** - Currency formatting throughout
- ✅ **Local Images** - 6 WebP product images in public folder
- ✅ **Order History** - Orders saved to database with timestamps

---

## 🚀 Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **React Router** 6.20.0 - Client-side routing
- **Axios** 1.6.2 - HTTP client for API calls
- **TailwindCSS** 3.3.6 - Utility-first CSS framework
- **Vite** 5.0.8 - Build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 8.0.3 - MongoDB ODM
- **CORS** 2.8.5 - Cross-origin resource sharing
- **dotenv** 16.3.1 - Environment variables

---

## 📁 Project Structure

```
e-com-mart/
├── backend/
│   ├── models/
│   │   ├── Product.js          # Product schema
│   │   ├── CartItem.js         # Cart item schema
│   │   ├── Order.js            # Order schema
│   │   └── User.js             # User schema (bonus)
│   ├── routes/
│   │   ├── productRoutes.js    # Product APIs
│   │   ├── cartRoutes.js       # Cart & checkout APIs
│   │   ├── authRoutes.js       # Auth APIs (bonus)
│   │   └── fakeStoreRoutes.js  # External API (bonus)
│   ├── middleware/
│   │   └── errorHandler.js     # Error handling (bonus)
│   ├── seed.js                 # Database seeding script
│   ├── cleanup-cart.js         # Cart cleanup utility
│   ├── server.js               # Express server
│   ├── .env                    # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── Products.jsx    # Products grid
│   │   │   ├── ProductDetails.jsx  # Product detail view
│   │   │   ├── Cart.jsx        # Shopping cart
│   │   │   ├── Checkout.jsx    # Checkout form
│   │   │   ├── ReceiptModal.jsx    # Order receipt
│   │   │   ├── FiltersSidebar.jsx  # Product filters
│   │   │   └── PriceRangeSlider.jsx    # Price filter
│   │   ├── utils/
│   │   │   └── api.js          # API client functions
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # React entry point
│   ├── public/
│   │   └── *.webp              # Product images (6 files)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/                 # App screenshots (create this)
├── README.md                    # This file
└── HOW_TO_RUN.md               # Detailed setup guide
```

---

## 🗄️ Database Schema

### Products Collection
```javascript
{
  id: Number,              // Unique product ID
  name: String,            // Product name
  price: Number,           // Price in INR
  image: String,           // Image URL
  category: String,        // Category (Electronics, Accessories)
  brand: String,           // Brand name
  rating: Number,          // Rating (0-5)
  reviews: Number,         // Number of reviews
  inStock: Boolean,        // Availability
  description: String,     // Product description
  specifications: Object,  // Technical specs
  shipping: Object,        // Shipping details
  offers: [String]         // Available offers
}
```

### Cart Items Collection
```javascript
{
  productId: ObjectId,     // Reference to Product
  qty: Number,             // Quantity
  price: Number,           // Price snapshot
  userId: String,          // User identifier
  createdAt: Date
}
```

### Orders Collection
```javascript
{
  customerName: String,
  customerEmail: String,
  items: [{
    productId: Number,
    name: String,
    price: Number,
    qty: Number
  }],
  subtotal: Number,
  discount: Number,
  total: Number,
  appliedCoupon: String,
  status: String,
  createdAt: Date
}
```

---

## 🔧 Setup Instructions

### Prerequisites
- **Node.js** 18+ installed
- **MongoDB** installed and running locally
- **Git** for cloning the repository

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/e-com-mart.git
cd e-com-mart
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in `backend/` folder:
```env
MONGODB_URI=mongodb://localhost:27017/ecommart
PORT=5001
```

Seed the database with products:
```bash
npm run seed
```

Start backend server:
```bash
npm run dev
```
Backend will run at: **http://localhost:5001**

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Frontend will run at: **http://localhost:5173**

### 4. MongoDB Setup
Ensure MongoDB is running:
```bash
# macOS
brew services start mongodb-community

# Or manually
mongod --dbpath /path/to/data
```

Verify database connection using MongoDB Compass:
- Connection String: `mongodb://localhost:27017`
- Database: `ecommart`
- Collections: `products`, `cartitems`, `orders`

---

## 🎮 How to Use

### 1. Browse Products
- Visit homepage at `http://localhost:5173`
- Click "Shop Now" or navigate to Products page
- Use filters (category, price range, search) to find products
- Sort by price, rating, or popularity

### 2. Add to Cart
- Click on any product to view details
- View specifications, shipping info, and offers
- Set quantity and click "Add to Cart"
- Click cart icon in header to view cart

### 3. Manage Cart
- Update quantities using +/- buttons
- Remove items with "Remove" button
- Apply coupon codes:
  - **FLAT10** - 10% off on orders ₹1,000+
  - **NEWUSER** - 15% off on orders ₹5,000+
  - **SAVE50** - ₹500 off on orders ₹10,000+
  - **FREESHIP** - Free shipping (any order)

### 4. Checkout
- Click "Proceed to Checkout"
- Fill in name and email
- Review order summary
- Click "Complete Purchase"
- View receipt modal with order confirmation

### 5. View Order History
- Orders are saved to MongoDB `orders` collection
- Each order includes timestamp, items, totals

---

## 🌐 API Endpoints

### Products
```http
GET    /api/products              # Get all products
GET    /api/products/:id          # Get single product with related products
GET    /api/products/category/:category   # Get products by category
```

### Cart
```http
POST   /api/cart                  # Add item to cart
       Body: { productId, qty }
       
GET    /api/cart                  # Get cart items & total
       
PUT    /api/cart/:id              # Update item quantity
       Body: { qty }
       
DELETE /api/cart/:id              # Remove item from cart

POST   /api/cart/apply-coupon     # Apply coupon code
       Body: { couponCode }
       
DELETE /api/cart/coupon/remove    # Remove applied coupon
```

### Checkout
```http
POST   /api/cart/checkout         # Process checkout
       Body: { name, email, cartItems }
       Response: { orderId, total, timestamp, orderDetails }
```

### Bonus: Authentication (Mock)
```http
POST   /api/auth/register         # Register user
POST   /api/auth/login            # Login user
GET    /api/auth/profile          # Get user profile
```

### Bonus: Fake Store API
```http
GET    /api/fakestore/products    # Fetch from external API
```

---

## 🎨 Design Features

### Best Buy Theme
- **Primary Blue**: `#0046BE` - Headers, buttons, links
- **Accent Yellow**: `#FFF200` - Highlights, CTAs
- **Clean Whites & Grays**: Professional layout

### Responsive Design
- **Mobile First**: Optimized for phones (320px+)
- **Tablet**: Adapted layouts (768px+)
- **Desktop**: Full features (1024px+)
- **Touch-friendly**: Large buttons, proper spacing

### User Experience
- **Loading States**: Spinners during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client & server-side validation
- **Visual Feedback**: Hover effects, active states
- **Smooth Animations**: Tailwind transitions

---

## 🧪 Testing the Application

### Test Products
12 products across categories:
- **Electronics**: Headphones, Smartwatches, Laptops, Speakers, Mice, Webcams, Smartphones
- **Accessories**: Cables, Power Banks, Phone Stands

### Test Coupons
```
FLAT10   - 10% off (min order: ₹1,000)
NEWUSER  - 15% off (min order: ₹5,000)
SAVE50   - ₹500 off (min order: ₹10,000)
FREESHIP - Free shipping (any order)
```

### Test Scenarios
1. **Empty Cart**: Navigate to cart → See empty state
2. **Add Products**: Add 3-4 products → Verify cart updates
3. **Update Quantity**: Use +/- buttons → Total recalculates
4. **Apply Coupon**: Enter "FLAT10" → Discount applied
5. **Checkout**: Fill form → Submit → See receipt
6. **Order Saved**: Check MongoDB `orders` collection

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Ensure MongoDB is running
brew services list | grep mongodb

# Start MongoDB
brew services start mongodb-community

# Or manually
mongod --dbpath /path/to/data
```

### Port Already in Use
```bash
# Kill process on port 5001 (backend)
lsof -ti:5001 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Cart Shows 500 Error
```bash
# Clean up cart with orphaned products
cd backend
node cleanup-cart.js
```

### Products Not Showing
```bash
# Re-seed database
cd backend
npm run seed
```

---

## 🚀 Deployment Ready

This project is ready for GitHub deployment:

### ✅ Production Checklist
- [x] Clean, organized code structure
- [x] Environment variables configured
- [x] Error handling implemented
- [x] Database persistence working
- [x] Responsive design tested
- [x] No console errors
- [x] README documentation complete
- [x] Screenshots prepared
- [x] Git repository initialized

### Deployment Notes
- Frontend: Can be deployed to **Vercel**, **Netlify**, **GitHub Pages**
- Backend: Can be deployed to **Heroku**, **Railway**, **Render**
- Database: Use **MongoDB Atlas** for cloud hosting

---

## 📝 What I Built

### Core Features (Assignment Requirements)
1. **Full-Stack Architecture**: Separate React frontend + Express backend
2. **RESTful APIs**: All required endpoints implemented
3. **MongoDB Integration**: Persistent data storage
4. **Shopping Cart**: Add, remove, update quantities
5. **Checkout Flow**: Form validation + order confirmation
6. **Mock Checkout**: Generates receipt without real payments

### Beyond Requirements
1. **Product Details Page**: Full specs, shipping, related products
2. **Advanced Filters**: Category, type, price range, search
3. **Coupon System**: 4 working discount codes
4. **Quantity Controls**: Intuitive +/- buttons
5. **Best Buy Design**: Professional, branded UI
6. **Indian Market**: ₹ currency, local pricing
7. **Error Handling**: Centralized middleware
8. **Mock Authentication**: User registration/login
9. **External API**: Fake Store API integration
10. **Order History**: Saved in database

### Technical Highlights
- **React Hooks**: useState, useEffect, useNavigate
- **Axios Interceptors**: API client configuration
- **MongoDB Queries**: Population, filtering, sorting
- **TailwindCSS**: Utility-first styling, responsive design
- **Express Middleware**: CORS, JSON parsing, error handling
- **Mongoose Models**: Schema validation, references

---

## 👨‍💻 Developer

**Your Name**  
Full Stack Developer

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 📄 License

This project is created for Vibe Commerce screening assignment.

---

## 🙏 Acknowledgments

- **Best Buy Canada** - Design inspiration
- **MongoDB** - Database solution
- **React Team** - Frontend framework
- **Express.js** - Backend framework
- **TailwindCSS** - Styling framework

---

**Note**: This is a screening assignment project demonstrating full-stack development skills. All product data is mock/dummy data for demonstration purposes.
