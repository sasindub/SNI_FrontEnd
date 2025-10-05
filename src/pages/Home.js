import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import CarouselHeader from '../components/CarouselHeader';
import SearchAndFilter from '../components/SearchAndFilter';
import LaptopCard from '../components/LaptopCard';
import QuickViewModal from '../components/QuickViewModal';
import { allProducts, deviceTypes } from '../data/laptops';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: 'All', priceRange: null, deviceType: 'All' });
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeviceType, setSelectedDeviceType] = useState('All');

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Category filter
      const matchesCategory = filters.category === 'All' || 
        product.category === filters.category;

      // Device type filter
      const matchesDeviceType = filters.deviceType === 'All' || 
        product.deviceType === filters.deviceType;

      // Price range filter
      const matchesPrice = !filters.priceRange || 
        (product.price >= filters.priceRange.min && product.price <= filters.priceRange.max);

      return matchesSearch && matchesCategory && matchesDeviceType && matchesPrice;
    });
  }, [searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCategorySelect = (deviceType) => {
    setSelectedDeviceType(deviceType);
    setFilters(prev => ({ ...prev, deviceType }));
    
    // Scroll to products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickView = (product) => {
    setSelectedLaptop(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLaptop(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      {/* Carousel Header */}
      <CarouselHeader onCategorySelect={handleCategorySelect} />
      
      {/* Search and Filter Section */}
      <div id="products-section">
        <SearchAndFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
        />
      </div>

      {/* Laptops Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Our <span className="text-primary">Premium</span> Collection
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Discover our cutting-edge laptops, PCs, and audio devices designed for gaming, professional work, and content creation. 
              Each device is crafted with precision and powered by the latest technology.
            </p>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-text-secondary">
              Showing {filteredProducts.length} of {allProducts.length} products
              {searchTerm && ` for "${searchTerm}"`}
              {filters.category !== 'All' && ` in ${filters.category}`}
              {filters.deviceType !== 'All' && ` - ${filters.deviceType}s`}
              {filters.priceRange && ` under ${filters.priceRange.label}`}
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <LaptopCard 
                  key={product.id} 
                  laptop={product} 
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">No products found</h3>
              <p className="text-text-secondary mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ category: 'All', priceRange: null, deviceType: 'All' });
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Why Choose <span className="text-primary">SNI Technology</span>?
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              We're committed to delivering the ultimate computing experience with cutting-edge technology and premium craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Lightning Fast Performance</h3>
              <p className="text-text-secondary">
                Powered by the latest Intel and AMD processors with cutting-edge graphics cards for unmatched performance.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Premium Build Quality</h3>
              <p className="text-text-secondary">
                Crafted with precision using premium materials and rigorous quality control for lasting durability.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">24/7 Expert Support</h3>
              <p className="text-text-secondary">
                Our dedicated support team is always ready to help you get the most out of your SNI devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        laptop={selectedLaptop}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;
