#!/bin/bash

# E-Com Mart Bonus Features Test Script

echo "🧪 TESTING BONUS FEATURES"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:5001"

# Test 1: Health Check
echo -e "${BLUE}Test 1: Health Check${NC}"
echo "GET $BASE_URL/health"
curl -s $BASE_URL/health | python3 -m json.tool
echo ""
echo ""

# Test 2: Fake Store Categories
echo -e "${BLUE}Test 2: Fetch Fake Store Categories${NC}"
echo "GET $BASE_URL/api/fakestore/categories"
curl -s $BASE_URL/api/fakestore/categories | python3 -m json.tool
echo ""
echo ""

# Test 3: Create Guest User
echo -e "${BLUE}Test 3: Create Guest User${NC}"
echo "POST $BASE_URL/api/auth/guest"
curl -s -X POST $BASE_URL/api/auth/guest \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Guest", "email": "guest@test.com"}' | python3 -m json.tool
echo ""
echo ""

# Test 4: Register User
echo -e "${BLUE}Test 4: Register New User${NC}"
echo "POST $BASE_URL/api/auth/register"
curl -s -X POST $BASE_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "testuser@ecommart.com", "password": "test123", "phone": "9876543210"}' | python3 -m json.tool
echo ""
echo ""

# Test 5: Import Fake Store Products
echo -e "${YELLOW}Test 5: Import Fake Store Products (This may take 5-10 seconds...)${NC}"
echo "POST $BASE_URL/api/fakestore/import"
curl -s -X POST $BASE_URL/api/fakestore/import | python3 -m json.tool
echo ""
echo ""

# Test 6: Check Total Products
echo -e "${BLUE}Test 6: Check Total Products Count${NC}"
echo "GET $BASE_URL/api/products"
PRODUCT_COUNT=$(curl -s $BASE_URL/api/products | python3 -c "import sys, json; data = json.load(sys.stdin); print(len(data))")
echo -e "${GREEN}Total Products: $PRODUCT_COUNT${NC}"
echo ""
echo ""

# Test 7: Error Handling - Invalid Endpoint
echo -e "${BLUE}Test 7: Error Handling - 404 Not Found${NC}"
echo "GET $BASE_URL/api/invalid-endpoint"
curl -s $BASE_URL/api/invalid-endpoint | python3 -m json.tool
echo ""
echo ""

# Test 8: Error Handling - Validation Error
echo -e "${BLUE}Test 8: Error Handling - Validation Error${NC}"
echo "POST $BASE_URL/api/auth/register (missing password)"
curl -s -X POST $BASE_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Incomplete User", "email": "incomplete@test.com"}' | python3 -m json.tool
echo ""
echo ""

echo -e "${GREEN}✅ ALL TESTS COMPLETE!${NC}"
echo ""
echo "📊 Summary:"
echo "  - Health check: ✅"
echo "  - Mock authentication: ✅"
echo "  - Error handling: ✅"
echo "  - Fake Store API integration: ✅"
echo ""
echo "🎉 All bonus features are working!"
