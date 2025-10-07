import React, { useState } from 'react';

const LaptopCard = ({ laptop, onQuickView, onOrder }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden card-hover cursor-pointer shadow-lg border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={laptop.image}
          alt={laptop.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        {/* Fallback for missing images */}
        <div className="hidden w-full h-full bg-gradient-to-br from-sni-navy/50 to-sni-blue/50 items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-16 bg-gradient-to-br from-sni-cyan/20 to-sni-purple/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">💻</span>
            </div>
            <p className="text-gray-400 text-sm">Laptop Image</p>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
            {laptop.category}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-900 text-xs font-medium">{laptop.rating}</span>
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(laptop);
              }}
              className="w-full btn-primary text-sm py-2"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="mb-4">
          <h3 className="text-text-primary font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
            {laptop.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${laptop.price.toLocaleString()}
            </span>
            <span className="text-text-secondary text-sm">
              {laptop.reviews} reviews
            </span>
          </div>
        </div>

        {/* Specs */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">CPU:</span>
            <span className="text-text-primary">{laptop.specs.cpu}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">GPU:</span>
            <span className="text-text-primary">{laptop.specs.gpu}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">RAM:</span>
            <span className="text-text-primary">{laptop.specs.ram}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Storage:</span>
            <span className="text-text-primary">{laptop.specs.storage}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {laptop.features.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onOrder(laptop);
            }}
            className="flex-1 btn-primary text-sm py-2"
          >
            {laptop.isPreOrder ? 'Pre-Order' : 'Order Now'}
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-all duration-300 rounded-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
