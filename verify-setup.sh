#!/bin/bash

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🔍 Verifying E-Commerce Project Setup..."
echo "=========================================="
echo ""

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 18+"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} Found: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check MongoDB
echo -n "Checking MongoDB... "
if command -v mongod &> /dev/null; then
    MONGO_VERSION=$(mongod --version | head -n 1)
    echo -e "${GREEN}✓${NC} Found"
else
    echo -e "${YELLOW}⚠${NC} MongoDB not found in PATH"
fi

echo ""
echo "📁 Checking Project Structure..."
echo "--------------------------------"

# Check backend
echo -n "Backend folder... "
if [ -d "backend" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check frontend
echo -n "Frontend folder... "
if [ -d "frontend" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check backend package.json
echo -n "Backend package.json... "
if [ -f "backend/package.json" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check frontend package.json
echo -n "Frontend package.json... "
if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check backend .env
echo -n "Backend .env... "
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC} Missing (copy from .env.example)"
fi

# Check README
echo -n "README.md... "
if [ -f "README.md" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC}"
fi

echo ""
echo "📦 Checking Dependencies..."
echo "---------------------------"

# Check backend node_modules
echo -n "Backend dependencies... "
if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}⚠${NC} Run 'cd backend && npm install'"
fi

# Check frontend node_modules
echo -n "Frontend dependencies... "
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Installed"
else
    echo -e "${YELLOW}⚠${NC} Run 'cd frontend && npm install'"
fi

echo ""
echo "🗄️ Checking Database..."
echo "-----------------------"

# Try to connect to MongoDB
echo -n "MongoDB connection... "
if nc -z localhost 27017 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Running on localhost:27017"
else
    echo -e "${YELLOW}⚠${NC} Not running. Start with: brew services start mongodb-community"
fi

echo ""
echo "📝 Assignment Requirements Check..."
echo "-----------------------------------"

# Check backend routes
echo -n "Product routes... "
if [ -f "backend/routes/productRoutes.js" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "Cart routes... "
if [ -f "backend/routes/cartRoutes.js" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

# Check frontend components
echo -n "Products component... "
if [ -f "frontend/src/components/Products.jsx" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "Cart component... "
if [ -f "frontend/src/components/Cart.jsx" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "Checkout component... "
if [ -f "frontend/src/components/Checkout.jsx" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo ""
echo "🎁 Bonus Features Check..."
echo "--------------------------"

echo -n "MongoDB models... "
if [ -f "backend/models/Product.js" ] && [ -f "backend/models/CartItem.js" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "Error handling... "
if [ -f "backend/middleware/errorHandler.js" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC}"
fi

echo -n "Fake Store API... "
if [ -f "backend/routes/fakeStoreRoutes.js" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC}"
fi

echo ""
echo "📸 Documentation Check..."
echo "-------------------------"

echo -n "README.md... "
if [ -f "README.md" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
fi

echo -n "HOW_TO_RUN.md... "
if [ -f "HOW_TO_RUN.md" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC}"
fi

echo -n "Screenshots folder... "
if [ -d "screenshots" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC} Create with: mkdir screenshots"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Verification Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. If MongoDB is not running: brew services start mongodb-community"
echo "2. If dependencies missing: cd backend && npm install && cd ../frontend && npm install"
echo "3. Seed database: cd backend && npm run seed"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend: cd frontend && npm run dev"
echo "6. Create screenshots and add to screenshots/ folder"
echo "7. Push to GitHub!"
echo ""
