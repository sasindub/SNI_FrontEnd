import React from 'react';

const QuickViewModal = ({ laptop, isOpen, onClose }) => {
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
        <div className="relative w-full max-w-6xl glass rounded-3xl overflow-hidden animate-slide-up">
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
            {/* Image Section */}
            <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-sni-navy/50 to-sni-blue/50 flex items-center justify-center overflow-hidden">
              <img
                src={laptop.image}
                alt={laptop.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Fallback for missing images */}
              <div className="hidden w-full h-full items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-20 bg-gradient-to-br from-sni-cyan/20 to-sni-purple/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">💻</span>
                  </div>
                  <p className="text-gray-400">{laptop.name}</p>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-gradient-to-r from-sni-cyan to-sni-purple text-white text-sm font-semibold rounded-full">
                  {laptop.category}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute top-6 right-6">
                <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white font-medium">{laptop.rating}</span>
                  <span className="text-gray-400 text-sm">({laptop.reviews})</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12">
              {/* Title and Price */}
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  {laptop.name}
                </h1>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl font-bold gradient-text">
                    ${laptop.price.toLocaleString()}
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">Starting from</div>
                    <div className="text-green-400 font-semibold">In Stock</div>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Processor:</span>
                    <span className="text-white font-medium">{laptop.specs.cpu}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Graphics:</span>
                    <span className="text-white font-medium">{laptop.specs.gpu}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Memory:</span>
                    <span className="text-white font-medium">{laptop.specs.ram}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Storage:</span>
                    <span className="text-white font-medium">{laptop.specs.storage}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Display:</span>
                    <span className="text-white font-medium">{laptop.specs.display}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-gray-400">Battery:</span>
                    <span className="text-white font-medium">{laptop.specs.battery}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                <div className="flex flex-wrap gap-3">
                  {laptop.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white/10 text-white text-sm rounded-full border border-white/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button className="flex-1 btn-primary text-lg py-4">
                    Add to Cart - ${laptop.price.toLocaleString()}
                  </button>
                  <button className="px-6 py-4 glass hover:bg-white/20 transition-all duration-300 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sni-cyan font-semibold mb-1">Free Shipping</div>
                    <div className="text-gray-400 text-sm">On all orders</div>
                  </div>
                  <div>
                    <div className="text-sni-cyan font-semibold mb-1">3-Year Warranty</div>
                    <div className="text-gray-400 text-sm">Premium coverage</div>
                  </div>
                  <div>
                    <div className="text-sni-cyan font-semibold mb-1">24/7 Support</div>
                    <div className="text-gray-400 text-sm">Expert assistance</div>
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
