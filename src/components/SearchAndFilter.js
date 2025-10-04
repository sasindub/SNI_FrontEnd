import React, { useState } from 'react';

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories = ["All", "Gaming", "Professional", "Content Creation"];
  const priceRanges = [
    { label: "Under $1,500", min: 0, max: 1500 },
    { label: "$1,500 - $2,000", min: 1500, max: 2000 },
    { label: "$2,000 - $2,500", min: 2000, max: 2500 },
    { label: "$2,500+", min: 2500, max: Infinity }
  ];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter({ category, priceRange: selectedPriceRange });
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
    onFilter({ category: selectedCategory, priceRange });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedPriceRange(null);
    onSearch('');
    onFilter({ category: 'All', priceRange: null });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="glass rounded-2xl p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search laptops by name, specs, or features..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sni-cyan focus:border-transparent transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                onSearch('');
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center space-x-2 text-white hover:text-sni-cyan transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
            <span className="font-medium">Filters</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                isFiltersOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {(selectedCategory !== 'All' || selectedPriceRange) && (
            <button
              onClick={clearFilters}
              className="text-sm text-sni-cyan hover:text-white transition-colors duration-300"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Filters */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isFiltersOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-white font-semibold mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-sni-cyan to-sni-purple text-white'
                        : 'glass text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-white font-semibold mb-3">Price Range</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handlePriceRangeChange(range)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 text-sm ${
                      selectedPriceRange?.label === range.label
                        ? 'bg-gradient-to-r from-sni-cyan to-sni-purple text-white'
                        : 'glass text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
