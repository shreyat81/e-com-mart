import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home.jsx';
import Products from './components/Products.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navbar - Best Buy Style */}
        <nav className="bg-[#0046BE] shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 sm:py-3.5">
              {/* Logo/Brand */}
              <Link to="/" className="flex items-center group flex-shrink-0">
                <div className="bg-[#FFF200] p-2 sm:p-2.5 rounded transform group-hover:scale-105 transition-transform duration-300">
                  <svg
                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#0046BE]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-white block">
                    E-Com Mart
                  </span>
                  <p className="text-[10px] sm:text-xs text-[#FFF200] font-medium hidden sm:block">Your trusted tech store</p>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-4 lg:px-5 py-2 rounded font-semibold transition-all duration-200 flex items-center gap-2 text-sm lg:text-base ${
                      isActive
                        ? 'bg-white text-[#0046BE]'
                        : 'text-white hover:bg-[#003D99]'
                    }`
                  }
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `px-4 lg:px-5 py-2 rounded font-semibold transition-all duration-200 flex items-center gap-2 text-sm lg:text-base ${
                      isActive
                        ? 'bg-white text-[#0046BE]'
                        : 'text-white hover:bg-[#003D99]'
                    }`
                  }
                >
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="hidden lg:inline">Shop All</span>
                  <span className="lg:hidden">Shop</span>
                </NavLink>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `px-4 lg:px-5 py-2 rounded font-semibold transition-all duration-200 flex items-center gap-2 text-sm lg:text-base ${
                      isActive
                        ? 'bg-white text-[#0046BE]'
                        : 'text-white hover:bg-[#003D99]'
                    }`
                  }
                >
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Cart
                </NavLink>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded hover:bg-[#003D99] transition-all duration-200"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4 space-y-2 border-t border-[#003D99] mt-2 pt-2">
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-[#0046BE]'
                        : 'text-white hover:bg-[#003D99]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Home
                  </div>
                </NavLink>
                <NavLink
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-[#0046BE]'
                        : 'text-white hover:bg-[#003D99]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Shop All
                  </div>
                </NavLink>
                <NavLink
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-[#0046BE]'
                        : 'text-white hover:bg-[#003D99]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Cart
                  </div>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>

        {/* Footer - Best Buy Style */}
        <footer className="bg-[#F4F4F4] border-t border-gray-200 mt-12 sm:mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Brand Section */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3 sm:mb-4">
                  <div className="bg-[#FFF200] p-2 rounded shadow-sm">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-[#0046BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-[#0046BE]">E-Com Mart</span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Your trusted online shopping destination for quality products at great prices.
                </p>
              </div>

              {/* Quick Links */}
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#0046BE]">Quick Links</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>
                    <Link to="/products" className="hover:text-[#0046BE] transition-colors duration-200">
                      Shop All Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="hover:text-[#0046BE] transition-colors duration-200">
                      Shopping Cart
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#0046BE] transition-colors duration-200">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#0046BE] transition-colors duration-200">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#0046BE]">Contact Us</h3>
                <ul className="space-y-2 text-gray-600 text-xs sm:text-sm">
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 flex-shrink-0 text-[#0046BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">support@ecommart.com</span>
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <svg className="w-4 h-4 flex-shrink-0 text-[#0046BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    1-800-ECOM-MART
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-300 pt-4 sm:pt-6 text-center">
              <p className="text-gray-500 text-xs sm:text-sm">
                © 2025 E-Com Mart. All rights reserved. Built with ❤️ using React & Node.js
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
