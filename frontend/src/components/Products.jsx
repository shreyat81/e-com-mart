import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productAPI, cartAPI } from '../utils/api';
import FiltersSidebar from './FiltersSidebar';

function Products() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});
  const [notification, setNotification] = useState(null);
  
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    brand: '',
    priceRange: { min: 0, max: 60000 },
    sort: '',
    search: ''
  });

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam || searchParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam || '',
        search: searchParam || ''
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.type) params.append('type', filters.type);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.priceRange.min > 0) params.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max < 60000) params.append('maxPrice', filters.priceRange.max);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.search) params.append('search', filters.search);

      const queryString = params.toString();
      const url = `/api/products${queryString ? `?${queryString}` : ''}`;
      
      const response = await productAPI.getAll(url);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      type: '',
      brand: '',
      priceRange: { min: 0, max: 60000 },
      sort: '',
      search: ''
    });
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sort: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCart(prev => ({ ...prev, [productId]: true }));
      await cartAPI.addItem(productId, 1);
      
      setNotification({ type: 'success', message: 'Item added to cart!' });
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to add item to cart.' });
      setTimeout(() => setNotification(null), 3000);
      console.error('Error adding to cart:', err);
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] sm:min-h-[70vh] bg-gradient-to-br from-blue-50/50 to-indigo-100/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-sm sm:text-base">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        {notification && (
          <div className={`fixed top-20 right-4 z-50 px-5 py-3 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          } text-white text-sm`}>
            {notification.message}
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Discover quality electronics and accessories
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={filters.search}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-56">
              <select
                value={filters.sort}
                onChange={handleSortChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
              >
                <option value="">Sort by</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="lg:col-span-1">
            <FiltersSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="lg:col-span-3">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {products.length === 0 ? (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                <svg
                  className="mx-auto h-20 w-20 sm:h-24 sm:w-24 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
                  No products found
                </h2>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{products.length}</span> {products.length === 1 ? 'product' : 'products'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-200"
                    >
                      <Link to={`/product/${product.id}`} className="block relative h-52 bg-gray-50 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="bg-red-600 text-white px-3 py-1.5 rounded-md font-medium text-sm">
                              Out of Stock
                            </span>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                          {product.category}
                        </div>
                      </Link>

                      <div className="p-4">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors min-h-[2.5rem]">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>

                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={addingToCart[product.id] || !product.inStock}
                            className={`flex-1 py-2.5 px-3 rounded-md font-medium text-sm transition-all ${
                              addingToCart[product.id] || !product.inStock
                                ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {addingToCart[product.id] ? 'Adding...' : 'Add to Cart'}
                          </button>
                          <Link
                            to={`/product/${product.id}`}
                            className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center justify-center"
                          >
                            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
