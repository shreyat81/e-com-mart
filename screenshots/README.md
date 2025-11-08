# Screenshots Guide

## How to Add Screenshots

1. **Run both servers**:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm run dev`

2. **Open app**: Navigate to `http://localhost:5173`

3. **Take screenshots** (Use macOS screenshot tool: `Cmd + Shift + 4`):
   
   ### Required Screenshots:
   
   **1. home.png**
   - Navigate to: `http://localhost:5173`
   - Capture: Full landing page with hero section
   
   **2. products.png**
   - Navigate to: `http://localhost:5173/products`
   - Capture: Products grid with filters visible
   
   **3. product-details.png**
   - Click on any product
   - Capture: Product details page showing specifications and related products
   
   **4. cart.png**
   - Add 2-3 products to cart
   - Navigate to: `http://localhost:5173/cart`
   - Capture: Cart with items, quantities, and totals
   
   **5. checkout.png**
   - Click "Proceed to Checkout"
   - Navigate to: `http://localhost:5173/checkout`
   - Capture: Checkout form with order summary
   
   **6. receipt.png**
   - Fill checkout form and submit
   - Capture: Receipt modal showing order confirmation

4. **Save images**:
   - Save all screenshots to `screenshots/` folder
   - Use exact filenames: `home.png`, `products.png`, etc.

5. **Verify**:
   ```bash
   ls screenshots/
   # Should show: cart.png checkout.png home.png product-details.png products.png receipt.png
   ```

## Screenshot Checklist
- [ ] home.png - Landing page
- [ ] products.png - Products catalog
- [ ] product-details.png - Single product view
- [ ] cart.png - Shopping cart
- [ ] checkout.png - Checkout form
- [ ] receipt.png - Order confirmation

Once all screenshots are added, the project is 100% ready for GitHub submission!
