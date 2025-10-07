import React, { useState } from 'react';

const OrderModal = ({ isOpen, onClose, product }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedRam, setSelectedRam] = useState('16GB');
  const [selectedStorage, setSelectedStorage] = useState('512GB');
  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    mobile: '',
    email: '',
    zipCode: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen || !product) return null;

  const colorOptions = [
    { key: 'black', name: 'Black', image: require('../assets/laptop-gaming.jpg') },
    { key: 'grey', name: 'Grey', image: require('../assets/laptop-ultrabook.jpg') },
    { key: 'darkGreen', name: 'Dark Green', image: require('../assets/laptop-business.jpg') }
  ];

  const ramOptions = [
    { value: '8GB', price: 0 },
    { value: '16GB', price: 200 },
    { value: '32GB', price: 500 },
    { value: '64GB', price: 1000 }
  ];

  const storageOptions = [
    { value: '256GB', price: 0 },
    { value: '512GB', price: 150 },
    { value: '1TB', price: 300 },
    { value: '2TB', price: 600 }
  ];

  const calculatePrice = () => {
    const basePrice = product.price;
    const ramPrice = ramOptions.find(r => r.value === selectedRam)?.price || 0;
    const storagePrice = storageOptions.find(s => s.value === selectedStorage)?.price || 0;
    return basePrice + ramPrice + storagePrice;
  };

  const handlePersonalDetailsChange = (field, value) => {
    setPersonalDetails(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!personalDetails.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!personalDetails.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!personalDetails.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!personalDetails.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!personalDetails.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(personalDetails.mobile.replace(/\s/g, ''))) {
      errors.mobile = 'Please enter a valid mobile number';
    }
    
    if (!personalDetails.zipCode.trim()) {
      errors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(personalDetails.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }
    
    if (personalDetails.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    
    const orderData = {
      product: {
        id: product.id,
        name: product.name,
        basePrice: product.price,
        selectedColor,
        selectedRam,
        selectedStorage,
        finalPrice: calculatePrice()
      },
      customer: personalDetails,
      orderDate: new Date().toISOString()
    };

    try {
      // TODO: Replace with actual Flask API endpoint
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order submitted successfully:', result);
        setOrderSuccess(true);
        setCurrentStep(4);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to submit order`);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert(`Failed to submit order: ${error.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setSelectedColor('black');
    setSelectedRam('16GB');
    setSelectedStorage('512GB');
    setPersonalDetails({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      mobile: '',
      email: '',
      zipCode: ''
    });
    setOrderSuccess(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const renderStep1 = () => (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-light text-black">Customize Your Order</h2>
        <button
          onClick={handleClose}
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-6">
          <div className="relative">
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
              {colorOptions.map((color) => (
                <img
                  key={color.key}
                  src={color.image}
                  alt={`${product.name} - ${color.name}`}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                    selectedColor === color.key ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Choose Color</h3>
            <div className="flex gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.key}
                  onClick={() => setSelectedColor(color.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                    selectedColor === color.key
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${
                    color.key === 'black' ? 'bg-black' :
                    color.key === 'grey' ? 'bg-gray-500' : 'bg-green-900'
                  }`}></div>
                  <span className="text-sm">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium text-black">Total Price</span>
              <span className="text-3xl font-light text-black">${calculatePrice()}</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Including selected upgrades</p>
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 text-lg font-medium"
            >
              Continue to Details
            </button>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-black mb-4">Memory</h3>
            <div className="space-y-2">
              {ramOptions.map((ram) => (
                <button
                  key={ram.value}
                  onClick={() => setSelectedRam(ram.value)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                    selectedRam === ram.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{ram.value} RAM</span>
                    {ram.price > 0 && <span className="text-gray-600">+${ram.price}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-black mb-4">Storage</h3>
            <div className="space-y-2">
              {storageOptions.map((storage) => (
                <button
                  key={storage.value}
                  onClick={() => setSelectedStorage(storage.value)}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-300 ${
                    selectedStorage === storage.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{storage.value} SSD</span>
                    {storage.price > 0 && <span className="text-gray-600">+${storage.price}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-light text-black">Personal Details</h2>
        <button
          onClick={handleClose}
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">First Name *</label>
              <input
                type="text"
                value={personalDetails.firstName}
                onChange={(e) => handlePersonalDetailsChange('firstName', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Last Name *</label>
              <input
                type="text"
                value={personalDetails.lastName}
                onChange={(e) => handlePersonalDetailsChange('lastName', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Full Address *</label>
            <textarea
              value={personalDetails.address}
              onChange={(e) => handlePersonalDetailsChange('address', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                formErrors.address ? 'border-red-500' : 'border-gray-300'
              }`}
              rows="3"
              required
            />
            {formErrors.address && (
              <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">City *</label>
              <input
                type="text"
                value={personalDetails.city}
                onChange={(e) => handlePersonalDetailsChange('city', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.city && (
                <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">ZIP Code *</label>
              <input
                type="text"
                value={personalDetails.zipCode}
                onChange={(e) => handlePersonalDetailsChange('zipCode', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.zipCode ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.zipCode && (
                <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Mobile Number *</label>
              <input
                type="tel"
                value={personalDetails.mobile}
                onChange={(e) => handlePersonalDetailsChange('mobile', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.mobile ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {formErrors.mobile && (
                <p className="text-red-500 text-sm mt-1">{formErrors.mobile}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Address</label>
              <input
                type="email"
                value={personalDetails.email}
                onChange={(e) => handlePersonalDetailsChange('email', e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (validateForm()) {
                  setCurrentStep(3); // Go to review step
                }
              }}
              className="flex-1 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
            >
              Review Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-light text-black">Review Your Order</h2>
        <button
          onClick={handleClose}
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-300"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-medium text-black mb-4">Your Laptop</h3>
              <div className="relative aspect-video bg-white rounded-xl overflow-hidden border">
                <img
                  src={colorOptions.find(c => c.key === selectedColor)?.image}
                  alt={`${product.name} - ${colorOptions.find(c => c.key === selectedColor)?.name}`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-black text-sm px-3 py-1 rounded-full shadow">
                    {colorOptions.find(c => c.key === selectedColor)?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details - Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Configuration */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-medium text-black mb-4">Product Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product</span>
                    <span className="font-medium text-black">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color</span>
                    <span className="font-medium text-black">{colorOptions.find(c => c.key === selectedColor)?.name}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memory</span>
                    <span className="font-medium text-black">{selectedRam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage</span>
                    <span className="font-medium text-black">{selectedStorage}</span>
                  </div>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-semibold">
                  <span className="text-black">Total Price</span>
                  <span className="text-blue-600">${calculatePrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-medium text-black mb-4">Customer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Full Name</span>
                    <p className="font-medium text-black">{personalDetails.firstName} {personalDetails.lastName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Mobile</span>
                    <p className="font-medium text-black">{personalDetails.mobile}</p>
                  </div>
                  {personalDetails.email && (
                    <div>
                      <span className="text-gray-600 text-sm">Email</span>
                      <p className="font-medium text-black">{personalDetails.email}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Address</span>
                    <p className="font-medium text-black">{personalDetails.address}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">City & ZIP</span>
                    <p className="font-medium text-black">{personalDetails.city}, {personalDetails.zipCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            onClick={() => setCurrentStep(2)}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300"
          >
            Back to Details
          </button>
          <button
            onClick={handleSubmitOrder}
            disabled={isSubmitting}
            className="flex-1 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Confirm Order'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-light text-black mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll process it and send you a confirmation email shortly.
        </p>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <h3 className="font-medium text-black mb-2">Order Details</h3>
          <p className="text-sm text-gray-600">{product.name} - {colorOptions.find(c => c.key === selectedColor)?.name}</p>
          <p className="text-sm text-gray-600">{selectedRam} RAM, {selectedStorage} Storage</p>
          <p className="text-lg font-medium text-black mt-2">Total: ${calculatePrice()}</p>
        </div>

        <button
          onClick={handleClose}
          className="w-full py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/50 transition-opacity duration-300" onClick={handleClose} />
      
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
