import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const topBrands = [
    { name: 'Sony', logo: '🎧', type: 'Audio' },
    { name: 'Apple', logo: '⌚', type: 'Wearables' },
    { name: 'Samsung', logo: '📱', type: 'Smartphones' },
    { name: 'Anker', logo: '🔋', category: 'Accessories' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Sony WH-1000XM5',
      price: 29990,
      image: '/black-headphones-pink_94046-1948.webp',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Apple Watch Series 9',
      price: 41900,
      image: '/apple-watch-sport-42mm-silver-aluminum-case-with-black-band.webp',
      badge: 'New'
    },
    {
      id: 4,
      name: 'Dell Inspiron 15',
      price: 52990,
      image: '/61DcTof0gkL.webp',
      badge: 'Deal'
    },
    {
      id: 6,
      name: 'JBL Flip 6',
      price: 9999,
      image: '/portable-bluetooth-speaker-with-silicone-handle-isolated-on-white-background.webp',
      badge: 'Popular'
    }
  ];

  const categories = [
    {
      name: 'Audio',
      filterType: 'type',
      filterValue: 'Audio',
      image: '/black-headphones-pink_94046-1948.webp',
      description: 'Headphones & Speakers',
      icon: '🎧'
    },
    {
      name: 'Wearables',
      filterType: 'type',
      filterValue: 'Wearables',
      image: '/apple-watch-sport-42mm-silver-aluminum-case-with-black-band.webp',
      description: 'Smartwatches',
      icon: '⌚'
    },
    {
      name: 'Smartphones',
      filterType: 'type',
      filterValue: 'Smartphones',
      image: '/61DcTof0gkL.webp',
      description: '5G Phones',
      icon: '📱'
    },
    {
      name: 'Laptops',
      filterType: 'type',
      filterValue: 'Laptops',
      image: '/61DcTof0gkL.webp',
      description: 'Work & Gaming',
      icon: '💻'
    },
    {
      name: 'Accessories',
      filterType: 'category',
      filterValue: 'Accessories',
      image: '/usb-c-3-0-data-100w-pd-with-1000m-ethernet-rj45-multiport-original-imahap4hvqwyvhfj.webp',
      description: 'Cables & More',
      icon: '🔌'
    },
    {
      name: 'Gaming',
      filterType: 'type',
      filterValue: 'Computer Accessories',
      image: '/usb-c-3-0-data-100w-pd-with-1000m-ethernet-rj45-multiport-original-imahap4hvqwyvhfj.webp',
      description: 'Mouse & Gear',
      icon: '🎮'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/products');
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?${category.filterType}=${encodeURIComponent(category.filterValue)}`);
  };

  const handleBrandClick = (brand) => {
    if (brand.type) {
      navigate(`/products?type=${encodeURIComponent(brand.type)}`);
    } else {
      navigate(`/products?category=${encodeURIComponent(brand.category)}`);
    }
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Best Buy Style */}
      <section className="bg-gradient-to-r from-[#0046BE] to-[#003D99] text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#FFF200] text-[#0046BE] px-4 py-1.5 rounded-full font-bold text-sm mb-4 shadow-lg">
              🔥 EARLY BLACK FRIDAY DEALS
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
              Save Big on Electronics
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100">
              Shop the latest tech with unbeatable prices and fast delivery across India
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/products')}
                className="bg-[#FFF200] text-[#0046BE] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-yellow-300 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 w-full sm:w-auto"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/products')}
                className="bg-white text-[#0046BE] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 w-full sm:w-auto"
              >
                View Deals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Brands - Best Buy Style */}
      <section className="py-8 sm:py-12 bg-[#F4F4F4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-900">
            Shop by Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {topBrands.map((brand) => (
              <button
                key={brand.name}
                onClick={() => handleBrandClick(brand)}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-105 group"
              >
                <div className="text-4xl sm:text-5xl mb-3">{brand.logo}</div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#0046BE]">
                  {brand.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category - Best Buy Style */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-900">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105 border border-gray-200"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 sm:p-4 bg-white">
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#0046BE] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Best Buy Style */}
      <section className="py-8 sm:py-12 bg-[#F4F4F4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Hottest Offers</h2>
            <button
              onClick={handleShopNow}
              className="text-[#0046BE] font-semibold text-sm sm:text-base hover:underline"
            >
              See All →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden transform hover:scale-105 border border-gray-200"
              >
                {product.badge && (
                  <div className="bg-[#0046BE] text-white px-3 py-1 text-xs font-bold rounded-br-lg inline-block">
                    {product.badge}
                  </div>
                )}
                <div className="aspect-square overflow-hidden bg-white p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 group-hover:text-[#0046BE] transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-[#0046BE] mb-3">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                  <button className="w-full bg-[#FFF200] text-[#0046BE] py-2 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Best Buy Style */}
      <section className="py-8 sm:py-12 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-[#0046BE] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Quick & Easy Store Pickup</h3>
              <p className="text-gray-600 text-sm">Pick up your order at your convenience</p>
            </div>
            <div className="text-center">
              <div className="bg-[#0046BE] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over ₹2,000</p>
            </div>
            <div className="text-center">
              <div className="bg-[#0046BE] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">Low Price Guarantee</h3>
              <p className="text-gray-600 text-sm">We'll match any competitor's price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products - Best Buy Style */}
      <section className="py-8 sm:py-12 bg-[#F4F4F4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-900">
            Trending Now
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.slice(0, 4).map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105 group border border-gray-200"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#0046BE] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
