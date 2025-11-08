import React, { useState } from 'react';

const LaptopCard = ({ laptop, onQuickView, onOrder }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden card-hover cursor-pointer shadow-lg border border-gray-100 flex flex-col h-full"
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


        {/* Hover Overlay - Desktop Only */}
        <div
          className={`hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
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

        {/* Quick View Link - Mobile Only (Always Visible) */}
        <div className="md:hidden absolute bottom-3 left-1/2 transform -translate-x-1/2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(laptop);
            }}
            className="px-4 py-1.5 bg-white/95 backdrop-blur-sm text-blue-600 text-xs font-medium rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 border border-blue-600"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-text-primary font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
            {laptop.name}
          </h3>
          {laptop.model && (
            <p className="text-text-secondary text-sm mb-2">Model: {laptop.model}</p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Contact for pricing
            </span>
            {laptop.reviews > 0 && (
              <span className="text-text-secondary text-sm">
                {laptop.reviews} reviews
              </span>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="space-y-2 mb-4 flex-1">
          {laptop.specs.platform && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Processor:</span>
              <span className="text-text-primary text-right">{laptop.specs.platform}</span>
            </div>
          )}
          {laptop.specs.display && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Display:</span>
              <span className="text-text-primary text-right">{laptop.specs.display}</span>
            </div>
          )}
          {laptop.specs.ram && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">RAM:</span>
              <span className="text-text-primary text-right">{laptop.specs.ram}</span>
            </div>
          )}
          {laptop.specs.storage && (
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Storage:</span>
              <span className="text-text-primary text-right">{laptop.specs.storage}</span>
            </div>
          )}
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
