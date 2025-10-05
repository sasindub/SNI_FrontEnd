import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Zap, Star } from 'lucide-react';

const CarouselHeader = ({ onCategorySelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const categories = [
    {
      id: 'laptops',
      name: 'Laptops',
      image: require('../assets/laptop-gaming.jpg'),
      description: 'Powerful laptops for work and play',
      features: ['Gaming Performance', 'Professional Work', 'Portable Design'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'pcs',
      name: 'PCs',
      image: require('../assets/laptop-workstation.jpg'),
      description: 'High-performance desktop computers',
      features: ['Maximum Power', 'Customizable', 'Future-Proof'],
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'ipods',
      name: 'SNI iPods',
      image: require('../assets/laptop-ultrabook.jpg'),
      description: 'Premium portable audio devices',
      features: ['Lossless Audio', 'Long Battery', 'Premium Build'],
      color: 'from-green-500 to-teal-600'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
        setIsAnimating(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [categories.length]);

  const nextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
  };

  const goToSlide = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* Carousel Container */}
      <div className="relative h-full">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentIndex 
                ? 'opacity-100 scale-100' 
                : index === (currentIndex + 1) % categories.length
                ? 'opacity-0 scale-105 translate-x-full'
                : 'opacity-0 scale-95 -translate-x-full'
            }`}
          >
            <div className="relative h-full flex items-center justify-center">
              {/* Background Image - Clean, no overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              
              {/* Subtle Animated Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-1 h-1 bg-primary rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-40 right-32 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-40 left-32 w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
                <div className="absolute bottom-20 right-20 w-1 h-1 bg-green-500 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
                {/* Badge */}
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-black/20 backdrop-blur-sm border border-white/30 mb-8 animate-fade-in hover:bg-black/30 transition-all duration-300">
                  <Sparkles className="w-4 h-4 text-white mr-3" />
                  <span className="text-white text-sm font-semibold tracking-wide uppercase">Premium Collection</span>
                </div>

                {/* Main Title */}
                <h2 className={`text-6xl md:text-8xl font-bold mb-6 animate-slide-up ${isAnimating ? 'opacity-50' : 'opacity-100'} hover:scale-105 transition-transform duration-500`}>
                  {category.name}
                </h2>
                
                {/* Description */}
                <p className="text-2xl md:text-3xl mb-8 text-gray-100 animate-fade-in hover:text-white transition-colors duration-300" style={{animationDelay: '0.3s'}}>
                  {category.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in" style={{animationDelay: '0.6s'}}>
                  {category.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-4 py-2 bg-black/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30 hover:bg-black/40 hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="group relative px-12 py-4 bg-white text-gray-900 font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 animate-slide-up"
                  style={{animationDelay: '0.9s'}}
                >
                  <span className="relative z-10 flex items-center">
                    Explore {category.name}
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-md hover:bg-black/40 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg border border-white/30 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-md hover:bg-black/40 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg border border-white/30 group"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 hover:scale-125 ${
              index === currentIndex 
                ? 'w-8 h-3 bg-black rounded-full shadow-lg' 
                : 'w-3 h-3 bg-black/30 rounded-full hover:bg-black/50'
            }`}
          />
        ))}
      </div>

      {/* Category Labels */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => goToSlide(index)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border hover:scale-105 ${
              index === currentIndex
                ? 'bg-black/80 text-white shadow-lg scale-105'
                : 'bg-black/20 text-white hover:bg-black/40 border-white/30'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-black/5 rounded-full animate-float hover:bg-black/10 transition-all duration-300"></div>
      <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-black/5 rounded-full animate-float hover:bg-black/10 transition-all duration-300" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-black/5 rounded-full animate-float hover:bg-black/10 transition-all duration-300" style={{animationDelay: '4s'}}></div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/10">
        <div 
          className="h-full bg-primary transition-all duration-6000 ease-linear"
          style={{ 
            width: `${((currentIndex + 1) / categories.length) * 100}%`
          }}
        ></div>
      </div>
    </div>
  );
};

export default CarouselHeader;