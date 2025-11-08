import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../utils/api';

function Cart() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState({});
  const [updating, setUpdating] = useState({});
  const navigate = useNavigate();

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCartData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load cart. Please try again later.');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (itemId) => {
    try {
      setRemoving(prev => ({ ...prev, [itemId]: true }));
      await cartAPI.removeItem(itemId);
      
      // Refresh cart after removal
      await fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item from cart.');
    } finally {
      setRemoving(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // Update item quantity
  const handleUpdateQuantity = async (item, newQty) => {
    if (newQty < 1) return;
    
    try {
      setUpdating(prev => ({ ...prev, [item.id]: true }));
      
      // Remove the old item
      await cartAPI.removeItem(item.id);
      
      // Add with new quantity
      await cartAPI.addItem(item.productId, newQty);
      
      // Refresh cart
      await fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Failed to update quantity.');
    } finally {
      setUpdating(prev => ({ ...prev, [item.id]: false }));
    }
  };

  // Navigate to checkout
  const handleProceedToCheckout = () => {
    if (cartData && cartData.cart.length > 0) {
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] sm:min-h-[70vh] bg-gradient-to-br from-blue-50/50 to-indigo-100/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-sm sm:text-base">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 sm:px-6 py-4 rounded-r-lg shadow-md">
          <div className="flex items-center">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium text-sm sm:text-base">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2 sm:mb-3 leading-tight">
            Shopping Cart
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Review and manage your items</p>
          <div className="mt-3 sm:mt-4 h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto sm:mx-0"></div>
        </div>

      {/* Empty Cart */}
      {cartData && cartData.cart.length === 0 ? (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-8 sm:p-12 text-center border border-gray-100 max-w-2xl mx-auto">
          <div className="mb-4 sm:mb-6">
            <svg
              className="mx-auto h-24 w-24 sm:h-32 sm:w-32 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
            Discover our amazing products and start shopping!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 transition-all duration-300 text-sm sm:text-base touch-manipulation"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartData?.cart.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-6 border border-gray-100 hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 truncate sm:mb-2">
                      Product ID: {item.productId}
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                      <p className="text-sm sm:text-base text-gray-600">
                        Price: <span className="font-semibold text-blue-600">₹{item.price.toLocaleString('en-IN')}</span>
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        Subtotal: <span className="font-bold text-green-600 text-base sm:text-lg">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span className="text-sm sm:text-base text-gray-700 font-medium">Quantity:</span>
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => handleUpdateQuantity(item, item.qty - 1)}
                          disabled={updating[item.id] || item.qty <= 1}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-gray-700 text-base sm:text-lg touch-manipulation"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-10 sm:w-12 text-center font-bold text-gray-800 text-sm sm:text-base">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item, item.qty + 1)}
                          disabled={updating[item.id]}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white rounded-lg hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold text-gray-700 text-base sm:text-lg touch-manipulation"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-3 sm:gap-3">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={removing[item.id]}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base touch-manipulation ${
                        removing[item.id]
                          ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                          : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      {removing[item.id] ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                          <span>Removing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="hidden sm:inline">Remove</span>
                          <span className="sm:hidden">Delete</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 lg:sticky lg:top-24">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-gray-100">
                Order Summary
              </h2>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="text-base sm:text-lg">Total Items:</span>
                  <span className="text-base sm:text-lg font-bold bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-lg">
                    {cartData?.itemCount}
                  </span>
                </div>
                
                <div className="pt-3 sm:pt-4 border-t-2 border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg sm:text-xl font-semibold text-gray-800">Total:</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                      ₹{cartData?.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 transition-all duration-300 touch-manipulation"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Proceed to Checkout</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>

              <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default Cart;
