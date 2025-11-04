import React from 'react';
import ImageCarousel from './ImageCarousel';

const QuickViewModal = ({ laptop, isOpen, onClose, onOrder }) => {
  if (!isOpen || !laptop) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden animate-slide-up shadow-2xl border border-gray-200">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section with Carousel - Full Size */}
            <div className="relative h-96 lg:h-[600px] bg-gray-100 flex items-center justify-center overflow-hidden">
              <ImageCarousel 
                images={laptop.images || [laptop.image]} 
                productName={laptop.name}
                className="w-full h-full"
              />
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full">
                  {laptop.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 overflow-y-auto max-h-[600px] scrollbar-hide">
              {/* Title - No Price */}
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                  {laptop.name}
                </h1>
                {laptop.model && (
                  <p className="text-xl text-gray-600 mb-4">Model: {laptop.model}</p>
                )}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-right">
                    <div className="text-green-600 font-semibold text-lg">Available Now</div>
                    <div className="text-gray-600 text-sm">Contact us for pricing</div>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-black mb-6">Specifications</h3>
                <div className="grid grid-cols-1 gap-3">
                  {laptop.specs.brand && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Brand:</span>
                      <span className="text-black font-medium">{laptop.specs.brand}</span>
                    </div>
                  )}
                  {laptop.specs.platform && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Processor:</span>
                      <span className="text-black font-medium">{laptop.specs.platform}</span>
                    </div>
                  )}
                  {laptop.specs.display && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Display:</span>
                      <span className="text-black font-medium">{laptop.specs.display}</span>
                    </div>
                  )}
                  {laptop.specs.ram && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Memory:</span>
                      <span className="text-black font-medium">{laptop.specs.ram}</span>
                    </div>
                  )}
                  {laptop.specs.storage && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Storage:</span>
                      <span className="text-black font-medium">{laptop.specs.storage}</span>
                    </div>
                  )}
                  {laptop.specs.gpu && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">GPU:</span>
                      <span className="text-black font-medium">{laptop.specs.gpu}</span>
                    </div>
                  )}
                  {laptop.specs.os && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Operating System:</span>
                      <span className="text-black font-medium">{laptop.specs.os}</span>
                    </div>
                  )}
                  {laptop.specs.battery && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Battery:</span>
                      <span className="text-black font-medium">{laptop.specs.battery}</span>
                    </div>
                  )}
                  {laptop.specs.weight && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Weight:</span>
                      <span className="text-black font-medium">{laptop.specs.weight}</span>
                    </div>
                  )}
                  {laptop.specs.color && (
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-600">Color:</span>
                      <span className="text-black font-medium">{laptop.specs.color}</span>
                    </div>
                  )}
                </div>

                {/* I/O Ports */}
                {laptop.specs.io && laptop.specs.io.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-bold text-black mb-3">Ports & Connectivity</h4>
                    <ul className="space-y-2">
                      {laptop.specs.io.map((port, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {port}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Features */}
              {laptop.features && laptop.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-black mb-4">Key Features</h3>
                  <div className="flex flex-wrap gap-3">
                    {laptop.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-50 text-primary text-sm rounded-full border border-blue-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => onOrder(laptop)}
                    className="flex-1 btn-primary text-lg py-4"
                  >
                    {laptop.isPreOrder ? 'Pre-Order Now' : 'Order Now'}
                  </button>
                  <button className="px-6 py-4 bg-gray-100 hover:bg-gray-200 transition-all duration-300 rounded-xl">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="btn-secondary py-3">
                    Compare
                  </button>
                  <button className="btn-secondary py-3">
                    Share
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-primary font-semibold mb-1">Free Shipping</div>
                    <div className="text-gray-600 text-sm">On all orders</div>
                  </div>
                  <div>
                    <div className="text-primary font-semibold mb-1">3-Year Warranty</div>
                    <div className="text-gray-600 text-sm">Premium coverage</div>
                  </div>
                  <div>
                    <div className="text-primary font-semibold mb-1">24/7 Support</div>
                    <div className="text-gray-600 text-sm">Expert assistance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
