import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../utils/api';
import ReceiptModal from './ReceiptModal.jsx';

function Checkout() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [receiptData, setReceiptData] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
      
      // Redirect if cart is empty
      if (response.data.cart.length === 0) {
        navigate('/products');
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      alert('Failed to load cart data.');
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!cartData || cartData.cart.length === 0) {
      alert('Your cart is empty.');
      navigate('/products');
      return;
    }

    try {
      setSubmitting(true);
      const response = await cartAPI.checkout(
        cartData.cart,
        formData.name,
        formData.email
      );

      // Show receipt modal with response data
      setReceiptData(response.data);
      setShowModal(true);
    } catch (err) {
      console.error('Error during checkout:', err);
      alert('Checkout failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Close modal and navigate to products
  const handleCloseModal = () => {
    setShowModal(false);
    setReceiptData(null);
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] sm:min-h-[70vh] bg-gradient-to-br from-blue-50/50 to-indigo-100/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-sm sm:text-base">Preparing checkout...</p>
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
            Checkout
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Complete your purchase securely</p>
          <div className="mt-3 sm:mt-4 h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto sm:mx-0"></div>
        </div>

        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-3 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100 order-2 lg:order-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Customer Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-800 text-sm sm:text-base ${
                  formErrors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter your full name"
              />
              {formErrors.name && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-800 text-sm sm:text-base ${
                  formErrors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
                }`}
                placeholder="your.email@example.com"
              />
              {formErrors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-blue-800">Secure Checkout</p>
                  <p className="text-[10px] sm:text-xs text-blue-600 mt-1">Your information is encrypted and protected</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg text-white transition-all duration-300 transform active:scale-95 touch-manipulation ${
                submitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-3 border-white border-t-transparent"></div>
                  <span>Processing Order...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Complete Purchase</span>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary - Sticky */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-100 lg:sticky lg:top-24">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Order Summary
            </h2>
          
          {/* Cart Items */}
          <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 max-h-48 sm:max-h-64 overflow-y-auto custom-scrollbar">
            {cartData?.cart.map((item) => (
              <div key={item.id} className="flex justify-between items-start p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 block truncate">
                    Product {item.productId}
                  </span>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                    ₹{item.price.toLocaleString('en-IN')} × {item.qty}
                  </p>
                </div>
                <span className="font-bold text-blue-600 text-sm sm:text-base ml-2 flex-shrink-0">
                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-200 my-3 sm:my-4"></div>

          {/* Total Items */}
          <div className="flex justify-between mb-2 sm:mb-3 text-gray-700">
            <span className="font-medium text-sm sm:text-base">Total Items:</span>
            <span className="font-bold bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-lg text-sm sm:text-base">
              {cartData?.itemCount}
            </span>
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center pt-3 sm:pt-4 border-t-2 border-gray-200 mb-3 sm:mb-4">
            <span className="text-lg sm:text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              ₹{cartData?.total.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Payment Info */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-xl border border-green-200">
            <p className="text-[10px] sm:text-xs text-green-800 text-center font-medium">
              💳 Secure payment processing
            </p>
          </div>
          </div>
        </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showModal && receiptData && (
        <ReceiptModal
          receiptData={receiptData}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Checkout;
