import React, { useState, useMemo, useEffect, useRef } from 'react';
import SearchAndFilter from '../components/SearchAndFilter';
import LaptopCard from '../components/LaptopCard';
import QuickViewModal from '../components/QuickViewModal';
import { allProducts } from '../data/laptops';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: 'All', priceRange: null, deviceType: 'All' });
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(product.specs).some(spec => 
          String(spec).toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory = filters.category === 'All' || 
        product.category === filters.category;

      const matchesDeviceType = filters.deviceType === 'All' || 
        product.deviceType === filters.deviceType;

      const matchesPrice = !filters.priceRange || 
        (product.price >= filters.priceRange.min && product.price < filters.priceRange.max);

      return matchesSearch && matchesCategory && matchesDeviceType && matchesPrice;
    });
  }, [searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const handleQuickView = (product) => {
    setSelectedLaptop(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLaptop(null);
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-0">
                <div className="flex items-center justify-center lg:justify-start mb-0">
                  <img 
                    src={require('../assets/snl_logo.png')} 
                    alt="SNI Logo" 
                    className="w-40 h-40 md:w-38 md:h-38 object-contain"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(17%) sepia(94%) saturate(7151%) hue-rotate(358deg) brightness(91%) contrast(118%)'
                    }}
                  />
                </div>
                <h1 className="text-3xl md:text-4xl font-light text-gray-600 tracking-tight" style={{ marginTop: '-20px' }}>
                  The future of computing
                </h1>
              </div>
              
              <p className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
                Revolutionary laptops, PCs, and audio devices designed for creators, gamers, and professionals. 
                Experience unmatched performance and premium craftsmanship.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={scrollToProducts}
                  className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 text-lg transform hover:scale-105"
                >
                  Shop Now
                </button>
                <button className="px-8 py-3 text-blue-600 hover:text-blue-700 transition-all duration-300 text-lg border border-blue-600 rounded-full hover:bg-blue-50">
                  Learn more
                </button>
              </div>
            </div>

            {/* Right Content - Laptop Showcase */}
            <div className="relative">
              <div className="relative animate-float">
                <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center overflow-hidden">
                  <img 
                    src={require('../assets/laptop-gaming.jpg')} 
                    alt="SNI Laptop" 
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                
                {/* Floating Specs */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Processor</div>
                  <div className="text-lg font-semibold text-black">Intel Core i9</div>
                </div>
                
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Memory</div>
                  <div className="text-lg font-semibold text-black">32GB RAM</div>
                </div>
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Graphics</div>
                  <div className="text-lg font-semibold text-black">RTX 4080</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Choose Your <span className="text-blue-600">Device</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our range of premium devices designed for every need.
            </p>
          </div>

          {/* Product Carousel */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-50 to-gray-100 group">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* Laptop Slide */}
              <div className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12">
                  <div>
                    <h3 className="text-4xl font-light text-black mb-4">SNI Phantom X1</h3>
                    <p className="text-xl text-gray-600 mb-6">Gaming Beast</p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">Intel Core i9 12th Gen</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">NVIDIA RTX 4080</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">32GB DDR5 RAM</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">1TB NVMe SSD</span>
                      </div>
                    </div>
                    <div className="text-3xl font-light text-black mb-6">From $2,499</div>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                  <div className="relative">
                    <img 
                      src={require('../assets/laptop-gaming.jpg')} 
                      alt="SNI Phantom X1" 
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* PC Slide */}
              <div className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12">
                  <div>
                    <h3 className="text-4xl font-light text-black mb-4">SNI Tower Pro</h3>
                    <p className="text-xl text-gray-600 mb-6">Professional Power</p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">AMD Ryzen 9 7000 Series</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">NVIDIA RTX 4090</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">64GB DDR5 RAM</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">2TB NVMe SSD</span>
                      </div>
                    </div>
                    <div className="text-3xl font-light text-black mb-6">From $3,299</div>
                    <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                  <div className="relative">
                    <img 
                      src={require('../assets/laptop-workstation.jpg')} 
                      alt="SNI Tower Pro" 
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* iPod Slide */}
              <div className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12">
                  <div>
                    <h3 className="text-4xl font-light text-black mb-4">SNI Pod Pro</h3>
                    <p className="text-xl text-gray-600 mb-6">Premium Audio</p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Lossless Audio Quality</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Premium Build Quality</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Long Battery Life</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Wireless Connectivity</span>
                      </div>
                    </div>
                    <div className="text-3xl font-light text-black mb-6">From $399</div>
                    <button className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300">
                      Pre-Order Now
                    </button>
                  </div>
                  <div className="relative">
                    <img 
                      src={require('../assets/laptop-ultrabook.jpg')} 
                      alt="SNI Pod Pro" 
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Colors & Specs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Available <span className="text-blue-600">Finishes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our premium color options and powerful specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Colors */}
            <div>
              <h3 className="text-2xl font-light text-black mb-8">Available Finishes</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { 
                    name: 'Space Gray', 
                    image: require('../assets/laptop-gaming.jpg'), 
                    available: true 
                  },
                  { 
                    name: 'Midnight Black', 
                    image: require('../assets/laptop-workstation.jpg'), 
                    available: true 
                  },
                  { 
                    name: 'Silver', 
                    image: require('../assets/laptop-ultrabook.jpg'), 
                    available: true 
                  },
                  { 
                    name: 'Deep Blue', 
                    image: require('../assets/laptop-business.jpg'), 
                    available: false 
                  }
                ].map((color, index) => (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                      color.available 
                        ? 'border-gray-200 hover:border-blue-300 hover:shadow-xl' 
                        : 'border-gray-100 opacity-50'
                    }`}
                  >
                    <div className="aspect-video relative">
                      <img 
                        src={color.image} 
                        alt={color.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <p className="text-center font-medium text-black">{color.name}</p>
                          {!color.available && (
                            <p className="text-center text-sm text-gray-500 mt-1">Coming Soon</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-center font-medium text-black">{color.name}</p>
                      {!color.available && (
                        <p className="text-center text-sm text-gray-500 mt-1">Coming Soon</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div>
              <h3 className="text-2xl font-light text-black mb-8">Memory & Storage</h3>
              <div className="space-y-4">
                {[
                  { size: '8GB', storage: '256GB SSD', price: '$1,899' },
                  { size: '16GB', storage: '512GB SSD', price: '$2,199', recommended: true },
                  { size: '32GB', storage: '1TB SSD', price: '$2,699' },
                  { size: '64GB', storage: '2TB SSD', price: '$3,199' }
                ].map((spec, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      spec.recommended
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-light text-black">{spec.size} Memory</h4>
                        <p className="text-gray-600">{spec.storage}</p>
                        {spec.recommended && (
                          <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mt-2">
                            Recommended
                          </span>
                        )}
                      </div>
                      <span className="text-xl font-light text-black">{spec.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection - Apple Style Tiles */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Our <span className="text-blue-600">Collection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our range of premium devices designed for every need.
            </p>
          </div>

          {/* Large Product Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Laptops */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="mb-8">
                  <img 
                    src={require('../assets/laptop-gaming.jpg')} 
                    alt="Laptops" 
                    className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-3xl font-light text-black mb-4">Laptops</h3>
                <p className="text-gray-600 mb-6">Powerful mobile computing for work and play</p>
                <div className="flex gap-4 justify-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Learn more</button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Shop</button>
                </div>
              </div>
            </div>

            {/* PCs */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="mb-8">
                  <img 
                    src={require('../assets/laptop-workstation.jpg')} 
                    alt="PCs" 
                    className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-3xl font-light text-black mb-4">PCs</h3>
                <p className="text-gray-600 mb-6">High-performance desktop computing</p>
                <div className="flex gap-4 justify-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Learn more</button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Shop</button>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller Product Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Notebooks */}
            <div className="group cursor-pointer">
              <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="mb-6">
                  <img 
                    src={require('../assets/laptop-ultrabook.jpg')} 
                    alt="Notebooks" 
                    className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-light text-black mb-2">Notebooks</h4>
                <p className="text-gray-600 mb-4">Ultra-portable productivity</p>
                <div className="flex gap-4 justify-center text-sm">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Learn more</button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Shop</button>
                </div>
              </div>
            </div>

            {/* iPods */}
            <div className="group cursor-pointer">
              <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="mb-6">
                  <img 
                    src={require('../assets/laptop-business.jpg')} 
                    alt="iPods" 
                    className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-light text-black mb-2">iPods</h4>
                <p className="text-gray-600 mb-4">Premium audio experience</p>
                <div className="flex gap-4 justify-center text-sm">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Learn more</button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Shop</button>
                </div>
              </div>
            </div>

            {/* Accessories */}
            <div className="group cursor-pointer">
              <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="mb-6">
                  <img 
                    src={require('../assets/laptop-gaming.jpg')} 
                    alt="Accessories" 
                    className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-light text-black mb-2">Accessories</h4>
                <p className="text-gray-600 mb-4">Complete your setup</p>
                <div className="flex gap-4 justify-center text-sm">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Learn more</button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">Shop</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose SNI */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Why Choose <span className="text-blue-600">SNI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to delivering exceptional computing experiences with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-black mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Powered by the latest Intel and AMD processors with cutting-edge graphics for unmatched performance.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-black mb-4">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Every device undergoes rigorous testing to ensure exceptional build quality and long-lasting reliability.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-light text-black mb-4">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated support team is always ready to help you get the most out of your SNI devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apple-style Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              There's never been a better time to upgrade.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's what you get with the new SNI devices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Performance */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-6xl font-light text-blue-600 mb-4">23x</div>
                <h3 className="text-xl font-medium text-black mb-4">Faster Performance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Revolutionary processing power that transforms your computing experience.
                </p>
              </div>
            </div>

            {/* Battery Life */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-6xl font-light text-green-600 mb-4">18h</div>
                <h3 className="text-xl font-medium text-black mb-4">Battery Life</h3>
                <p className="text-gray-600 leading-relaxed">
                  Up to 6 more hours of battery life. Work all day without interruption.
                </p>
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-6xl font-light text-purple-600 mb-4">AI</div>
                <h3 className="text-xl font-medium text-black mb-4">SNI Intelligence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Neural Engine to enable AI features for smarter, more intuitive computing.
                </p>
              </div>
            </div>

            {/* Display */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-6xl font-light text-orange-600 mb-4">2x</div>
                <h3 className="text-xl font-medium text-black mb-4">Brighter Display</h3>
                <p className="text-gray-600 leading-relaxed">
                  A bigger, brighter Liquid Retina display with stunning color accuracy.
                </p>
              </div>
            </div>

            {/* Connectivity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-6xl font-light text-teal-600 mb-4">2</div>
                <h3 className="text-xl font-medium text-black mb-4">External Displays</h3>
                <p className="text-gray-600 leading-relaxed">
                  Support for up to two external displays for enhanced productivity.
                </p>
              </div>
            </div>

            {/* Camera */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="text-6xl font-light text-red-600 mb-4">12MP</div>
                <h3 className="text-xl font-medium text-black mb-4">Center Stage Camera</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced camera with Desk View for professional video calls.
                </p>
              </div>
            </div>
          </div>

          {/* New Laptop Pre-Order Banner */}
          <div className="mt-16">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 text-white">
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-12">
                
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-xl">🚀</span>
                    </div>
                    <h3 className="text-3xl font-light">New Release</h3>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-light mb-6">
                    SNI <span className="font-bold text-blue-300">i11</span>
                    <span className="block text-2xl md:text-3xl font-light text-gray-300 mt-2">
                      Next-Generation Laptop
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Revolutionary design meets cutting-edge performance. 
                    Pre-order now and be among the first to experience the future of computing.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">Intel Core i11 14th Generation</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">NVIDIA RTX 5080 Super</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">64GB DDR6 RAM</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-300">4TB NVMe SSD</span>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-light text-blue-300 mb-8">
                    From $4,999
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                    <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 text-lg font-semibold transform hover:scale-105">
                      Pre-Order Now
                    </button>
                    <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg">
                      Learn More
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start space-x-8 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>5-Year Warranty</span>
                    </div>
                  </div>
                </div>

                {/* Right Content - i11 Image */}
                <div className="relative">
                  <div className="relative">
                    <img 
                      src={require('../assets/i11.jpg')} 
                      alt="SNI i11 Laptop" 
                      className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                    />
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl"></div>
                    
                    {/* Product Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-black font-semibold text-sm">Pre-Order</span>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-4 py-2">
                      <span className="text-white font-semibold">From $4,999</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse"></div>
              <div className="absolute top-16 right-12 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-12 left-16 w-3 h-3 bg-blue-400/40 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-8 right-8 w-5 h-5 bg-blue-400/25 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Get to Know SNI - Horizontal Scroll */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Get to Know <span className="text-blue-600">SNI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes SNI the preferred choice for professionals and creators worldwide.
            </p>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
            {[
              {
                title: "Innovation First",
                description: "We constantly push the boundaries of technology with breakthrough innovations in device design and performance.",
                image: require('../assets/laptop-gaming.jpg'),
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Premium Materials",
                description: "Every SNI device is crafted using the finest materials and undergoes rigorous quality control processes.",
                image: require('../assets/laptop-workstation.jpg'),
                color: "from-gray-500 to-gray-600"
              },
              {
                title: "Global Reach",
                description: "With presence in over 50 countries, SNI delivers world-class technology to customers worldwide.",
                image: require('../assets/laptop-ultrabook.jpg'),
                color: "from-green-500 to-green-600"
              },
              {
                title: "Customer Focus",
                description: "Our customers are at the heart of everything we do. We listen, learn, and continuously improve.",
                image: require('../assets/laptop-business.jpg'),
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Sustainable Future",
                description: "Committed to environmental responsibility with eco-friendly manufacturing and packaging processes.",
                image: require('../assets/laptop-gaming.jpg'),
                color: "from-teal-500 to-teal-600"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 h-96 rounded-3xl overflow-hidden relative group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`}></div>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-light text-white mb-4">{item.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section id="products-section" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Shop All Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of laptops, PCs, and audio devices.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <SearchAndFilter 
              onSearch={handleSearch}
              onFilter={handleFilter}
            />
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
              <h3 className="text-2xl font-light text-black mb-4">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ category: 'All', priceRange: null, deviceType: 'All' });
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">SNI</span>
                </div>
                <span className="text-xl font-light">SNI Technology</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Revolutionizing computing with innovative technology and premium craftsmanship.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-6">Shop</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Laptops</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">PCs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Audio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Accessories</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-6">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Warranty</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Repair</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">News</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Investors</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 SNI Technology. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

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