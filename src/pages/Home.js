import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import SearchAndFilter from '../components/SearchAndFilter';
import LaptopCard from '../components/LaptopCard';
import QuickViewModal from '../components/QuickViewModal';
import { laptops } from '../data/laptops';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: 'All', priceRange: null });
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter laptops based on search and filters
  const filteredLaptops = useMemo(() => {
    return laptops.filter(laptop => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Category filter
      const matchesCategory = filters.category === 'All' || 
        laptop.category === filters.category;

      // Price range filter
      const matchesPrice = !filters.priceRange || 
        (laptop.price >= filters.priceRange.min && laptop.price <= filters.priceRange.max);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleQuickView = (laptop) => {
    setSelectedLaptop(laptop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLaptop(null);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Search and Filter Section */}
      <SearchAndFilter 
        onSearch={handleSearch}
        onFilter={handleFilter}
      />

      {/* Laptops Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="gradient-text">Premium</span> Collection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our cutting-edge laptops designed for gaming, professional work, and content creation. 
              Each device is crafted with precision and powered by the latest technology.
            </p>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-400">
              Showing {filteredLaptops.length} of {laptops.length} laptops
              {searchTerm && ` for "${searchTerm}"`}
              {filters.category !== 'All' && ` in ${filters.category}`}
              {filters.priceRange && ` under ${filters.priceRange.label}`}
            </p>
          </div>

          {/* Laptops Grid */}
          {filteredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLaptops.map((laptop) => (
                <LaptopCard 
                  key={laptop.id} 
                  laptop={laptop} 
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-sni-cyan/20 to-sni-purple/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No laptops found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ category: 'All', priceRange: null });
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
      <section className="py-20 bg-gradient-to-r from-sni-dark/50 to-sni-navy/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">SNI Laptops</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're committed to delivering the ultimate computing experience with cutting-edge technology and premium craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sni-cyan/20 to-sni-purple/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-sni-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Lightning Fast Performance</h3>
              <p className="text-gray-400">
                Powered by the latest Intel and AMD processors with cutting-edge graphics cards for unmatched performance.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sni-cyan/20 to-sni-purple/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-sni-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Premium Build Quality</h3>
              <p className="text-gray-400">
                Crafted with precision using premium materials and rigorous quality control for lasting durability.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-sni-cyan/20 to-sni-purple/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-sni-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">24/7 Expert Support</h3>
              <p className="text-gray-400">
                Our dedicated support team is always ready to help you get the most out of your SNI laptop.
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
