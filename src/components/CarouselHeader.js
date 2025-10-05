import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselHeader = ({ onCategorySelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const categories = [
    {
      id: 'laptops',
      name: 'Laptops',
      image: require('../assets/laptop-gaming.jpg'),
      description: 'Powerful laptops for work and play'
    },
    {
      id: 'pcs',
      name: 'PCs',
      image: require('../assets/laptop-workstation.jpg'),
      description: 'High-performance desktop computers'
    },
    {
      id: 'ipods',
      name: 'SNI iPods',
      image: require('../assets/laptop-ultrabook.jpg'),
      description: 'Premium portable audio devices'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [categories.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden bg-white">
      {/* Carousel Container */}
      <div className="relative h-full">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full flex items-center justify-center">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content */}
              <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
                <h2 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
                  {category.name}
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in">
                  {category.description}
                </p>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className="btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform duration-300"
                >
                  Explore {category.name}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Category Labels */}
      <div className="absolute top-4 left-4 flex space-x-2">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => setCurrentIndex(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white text-gray-900'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarouselHeader;
