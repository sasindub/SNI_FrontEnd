import React, { useState } from 'react';

const WarrantyChecker = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [warrantyResult, setWarrantyResult] = useState(null);
  const [activeTab, setActiveTab] = useState('manual');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      setSerialNumber(''); // Clear manual entry when image is uploaded
    }
  };

  const handleSerialNumberChange = (event) => {
    setSerialNumber(event.target.value);
    setUploadedImage(null); // Clear image when manual entry is used
  };

  const checkWarranty = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          serialNumber: 'SNI2024P001',
          model: 'SNI Phantom X1',
          purchaseDate: '2024-01-15',
          warrantyExpiry: '2027-01-15',
          status: 'Active',
          coverage: '3-Year Premium Warranty',
          remainingDays: 892
        },
        {
          serialNumber: 'SNI2024V002',
          model: 'SNI Velocity V2',
          purchaseDate: '2024-03-22',
          warrantyExpiry: '2027-03-22',
          status: 'Active',
          coverage: '3-Year Premium Warranty',
          remainingDays: 793
        },
        {
          serialNumber: 'SNI2023W003',
          model: 'SNI WorkStation Pro',
          purchaseDate: '2023-11-08',
          warrantyExpiry: '2026-11-08',
          status: 'Active',
          coverage: '3-Year Professional Warranty',
          remainingDays: 456
        }
      ];

      // Find matching result or create a default one
      const result = mockResults.find(r => 
        r.serialNumber.toLowerCase() === serialNumber.toLowerCase()
      ) || {
        serialNumber: serialNumber || 'Detected from image',
        model: 'SNI Laptop',
        purchaseDate: '2024-06-01',
        warrantyExpiry: '2027-06-01',
        status: 'Active',
        coverage: '3-Year Standard Warranty',
        remainingDays: 365
      };

      setWarrantyResult(result);
      setIsLoading(false);
    }, 2000);
  };

  const isValidSerial = serialNumber.length >= 8 || uploadedImage;

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Warranty <span className="text-primary">Checker</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Verify your SNI device warranty status instantly. Upload an image of your serial number 
              or enter it manually to check your coverage and remaining warranty period.
            </p>
          </div>
        </div>
      </section>

      {/* Warranty Checker Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'manual'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                Manual Entry
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'upload'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-black hover:bg-gray-200'
                }`}
              >
                Upload Image
              </button>
            </div>

            {/* Manual Entry Tab */}
            {activeTab === 'manual' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-black font-semibold mb-3">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={handleSerialNumberChange}
                    placeholder="Enter your SNI device serial number (e.g., SNI2024P001)"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  />
                  <p className="text-gray-600 text-sm mt-2">
                    Your serial number can be found on the bottom of your device or in the system information.
                  </p>
                </div>

                <button
                  onClick={checkWarranty}
                  disabled={!isValidSerial || isLoading}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Checking Warranty...
                    </div>
                  ) : (
                    'Check Warranty Status'
                  )}
                </button>
              </div>
            )}

            {/* Upload Image Tab */}
            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-black font-semibold mb-3">
                    Upload Serial Number Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {uploadedImage ? (
                        <div>
                          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-black font-medium mb-2">Image Uploaded Successfully!</p>
                          <p className="text-gray-600 text-sm">{uploadedImage.name}</p>
                        </div>
                      ) : (
                        <div>
                          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-black font-medium mb-2">Click to upload image</p>
                          <p className="text-gray-600 text-sm">
                            Upload a clear photo of your device's serial number
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                  <p className="text-gray-600 text-sm mt-3">
                    Supported formats: JPG, PNG, GIF. Maximum file size: 10MB
                  </p>
                </div>

                <button
                  onClick={checkWarranty}
                  disabled={!uploadedImage || isLoading}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Processing Image...
                    </div>
                  ) : (
                    'Check Warranty Status'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Warranty Result */}
      {warrantyResult && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 animate-slide-up shadow-xl border border-gray-200">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black mb-2">Warranty Found!</h2>
                <p className="text-gray-600">
                  Your SNI device warranty information has been successfully retrieved.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-black font-semibold mb-4">Product Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Serial Number:</span>
                      <span className="text-black font-medium">{warrantyResult.serialNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model:</span>
                      <span className="text-black font-medium">{warrantyResult.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Purchase Date:</span>
                      <span className="text-black font-medium">{warrantyResult.purchaseDate}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-black font-semibold mb-4">Warranty Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-medium">{warrantyResult.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coverage:</span>
                      <span className="text-black font-medium">{warrantyResult.coverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span className="text-black font-medium">{warrantyResult.warrantyExpiry}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warranty Progress */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-black font-semibold mb-4">Warranty Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining Coverage</span>
                    <span className="text-black font-medium">{warrantyResult.remainingDays} days</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(10, (warrantyResult.remainingDays / 1095) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0 days</span>
                    <span>3 years</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary px-8 py-3">
                  Download Warranty Certificate
                </button>
                <button className="btn-secondary px-8 py-3">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Need <span className="text-primary">Help</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Can't find your serial number or having trouble with the warranty checker? 
              Our support team is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-black font-semibold mb-2">Find Serial Number</h3>
              <p className="text-gray-600 text-sm">
                Learn where to locate your device's serial number
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-black font-semibold mb-2">Contact Support</h3>
              <p className="text-gray-600 text-sm">
                Get help from our expert support team
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-black font-semibold mb-2">Warranty Guide</h3>
              <p className="text-gray-600 text-sm">
                Understand your warranty coverage and benefits
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WarrantyChecker;
