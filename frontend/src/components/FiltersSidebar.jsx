import { useState } from 'react';
import PriceRangeSlider from './PriceRangeSlider';

function FiltersSidebar({ filters, onFilterChange, onClearFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ['Electronics', 'Accessories'];
  const types = ['Audio', 'Wearables', 'Cables', 'Power Banks', 'Phone Accessories', 'Computer Accessories', 'Laptops', 'Smartphones'];
  const brands = ['Sony', 'Apple', 'Anker', 'JBL', 'Logitech', 'OnePlus', 'Samsung', 'Dell', 'boAt', 'Lamicall'];

  const handleCategoryChange = (category) => {
    onFilterChange({ category: filters.category === category ? '' : category });
  };

  const handleTypeChange = (type) => {
    onFilterChange({ type: filters.type === type ? '' : type });
  };

  const handleBrandChange = (brand) => {
    onFilterChange({ brand: filters.brand === brand ? '' : brand });
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange({ priceRange });
  };

  const activeFiltersCount = [
    filters.category,
    filters.type,
    filters.brand,
    filters.priceRange?.min > 0 || filters.priceRange?.max < 60000
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-300 hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="font-semibold text-gray-900">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filters Panel */}
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'} bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </h2>
            {activeFiltersCount > 0 && (
              <button
                onClick={onClearFilters}
                className="text-xs text-red-600 hover:text-red-700 font-medium hover:underline"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        <div className="p-4 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          {/* Category Filter */}
          <div>
            <h3 className="text-xs font-semibold text-gray-700 mb-2.5 uppercase tracking-wide">Category</h3>
            <div className="space-y-1.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm ${
                    filters.category === category
                      ? 'bg-blue-600 text-white font-medium'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <h3 className="text-xs font-semibold text-gray-700 mb-2.5 uppercase tracking-wide">Product Type</h3>
            <div className="space-y-1.5 max-h-52 overflow-y-auto custom-scrollbar pr-1">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm ${
                    filters.type === type
                      ? 'bg-blue-600 text-white font-medium'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="text-xs font-semibold text-gray-700 mb-2.5 uppercase tracking-wide">Brand</h3>
            <div className="space-y-1.5 max-h-44 overflow-y-auto custom-scrollbar pr-1">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-all text-sm ${
                    filters.brand === brand
                      ? 'bg-blue-600 text-white font-medium'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wide">Price Range</h3>
            <PriceRangeSlider
              min={0}
              max={60000}
              value={filters.priceRange}
              onChange={handlePriceChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FiltersSidebar;
