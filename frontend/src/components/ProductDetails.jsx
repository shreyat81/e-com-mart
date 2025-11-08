import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { cartAPI } from '../utils/api';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5001/api/products/${id}`);
      const { relatedProducts: related, ...productData } = response.data;
      setProduct(productData);
      setRelatedProducts(related || []);
      setError(null);
    } catch (err) {
      setError('Failed to load product details.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await cartAPI.addItem(product.id, quantity);
      setNotification({ type: 'success', message: `Added ${quantity} item(s) to cart!` });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to add to cart.' });
      setTimeout(() => setNotification(null), 3000);
      console.error('Error adding to cart:', err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    setTimeout(() => navigate('/cart'), 500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0046BE] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
          {error || 'Product not found'}
        </div>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 text-[#0046BE] hover:underline font-semibold"
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } text-white animate-slideIn`}>
          {notification.message}
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/products" className="text-[#0046BE] hover:underline">Products</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><span className="text-gray-600">{product.category}</span></li>
            <li><span className="text-gray-400">/</span></li>
            <li><span className="text-gray-800 font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</span></li>
          </ol>
        </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
            <div className="aspect-square rounded-lg overflow-hidden bg-white mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            {product.inStock ? (
              <div className="flex items-center gap-2 text-green-700 font-semibold bg-green-50 px-3 py-2 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                In Stock
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-700 font-semibold bg-red-50 px-3 py-2 rounded">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Out of Stock
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded">
                {product.brand}
              </span>
            </div>

            {/* Price */}
            <div className="bg-[#F4F4F4] p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Price</p>
              <p className="text-3xl sm:text-4xl font-bold text-[#0046BE]">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">About this product</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 sm:px-4 py-2 bg-white hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 sm:w-16 text-center py-2 border-x-2 border-gray-300 outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 sm:px-4 py-2 bg-white hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addingToCart}
                  className={`flex-1 py-3 px-6 rounded-lg font-bold text-base transition-all ${
                    !product.inStock || addingToCart
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#FFF200] text-[#0046BE] hover:bg-yellow-300 shadow-md hover:shadow-lg'
                  }`}
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock || addingToCart}
                  className={`flex-1 py-3 px-6 rounded-lg font-bold text-base transition-all ${
                    !product.inStock || addingToCart
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#0046BE] text-white hover:bg-[#003D99] shadow-md hover:shadow-lg'
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Offers */}
            {product.offers && product.offers.length > 0 && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="text-sm font-bold text-green-800 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  Special Offers
                </h3>
                <ul className="space-y-1 text-sm text-green-700">
                  {product.offers.map((offer, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{offer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#0046BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Specifications
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="bg-[#F4F4F4] p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping & Returns */}
        {product.shipping && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-[#0046BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Shipping & Returns
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-[#F4F4F4] p-4 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold mb-1">Delivery Time</p>
                <p className="text-sm font-medium text-gray-900">{product.shipping.estimatedDelivery}</p>
              </div>
              <div className="bg-[#F4F4F4] p-4 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold mb-1">Shipping Charges</p>
                <p className="text-sm font-medium text-gray-900">
                  {product.shipping.charges === 0 ? 'FREE' : `₹${product.shipping.charges}`}
                </p>
              </div>
              <div className="bg-[#F4F4F4] p-4 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold mb-1">Return Policy</p>
                <p className="text-sm font-medium text-gray-900">{product.shipping.returnPolicy}</p>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#0046BE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all transform hover:scale-105 overflow-hidden"
                >
                  <div className="aspect-square bg-white overflow-hidden p-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 sm:p-4 border-t border-gray-200">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-[#0046BE]">
                      ₹{relatedProduct.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
