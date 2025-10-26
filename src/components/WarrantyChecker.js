import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'https://snibackend-production.up.railway.app';

const WarrantyChecker = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [warrantyResult, setWarrantyResult] = useState(null);
  const [activeTab, setActiveTab] = useState('manual');
  const [showPasscodeField, setShowPasscodeField] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [warrantyStatus, setWarrantyStatus] = useState('');

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
    setError('');
    setWarrantyResult(null);
    setShowPasscodeField(false);
    
    try {
      const response = await fetch(`${API_URL}/api/warranty/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serial_number: serialNumber.trim()
        })
      });

      const data = await response.json();

      if (data.success && data.requires_passcode) {
        // Warranty found (active or expired) - show passcode field
        setShowPasscodeField(true);
        setWarrantyStatus(data.status); // Store the status
        setError('');
      } else if (!data.found) {
        // Serial number not found
        setError('Serial number not found. Please check and try again.');
      } else if (!data.requires_passcode) {
        // Warranty found but not active/expired (inactive)
        setError(data.message || `Warranty is not active for serial number ${serialNumber}`);
      }
    } catch (error) {
      console.error('Error checking warranty:', error);
      setError('An error occurred while checking warranty. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPasscode = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/api/warranty/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serial_number: serialNumber.trim(),
          passcode: passcode
        })
      });

      const data = await response.json();

      if (data.success) {
        // Format dates
        const warranty = data.warranty;
        const formatDate = (dateStr) => {
          if (!dateStr) return 'N/A';
          const date = new Date(dateStr);
          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        };

        // Calculate remaining days
        const endDate = new Date(warranty.warranty_end_date);
        const today = new Date();
        const remainingDays = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));

        setWarrantyResult({
          serialNumber: warranty.serial_number,
          windowsKey: warranty.windows_key,
          purchaseDate: formatDate(warranty.warranty_start_date),
          warrantyExpiry: formatDate(warranty.warranty_end_date),
          status: warranty.warranty_status,
          nicNumber: warranty.nic_number,
          remainingDays: remainingDays,
          coverage: '3-Year Premium Warranty'
        });
        setShowPasscodeField(false);
      } else {
        setError(data.message || 'Invalid passcode. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying passcode:', error);
      setError('An error occurred while verifying passcode. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                {/* Serial Number Field */}
                <div>
                  <label className="block text-black font-semibold mb-3">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    value={serialNumber}
                    onChange={handleSerialNumberChange}
                    disabled={showPasscodeField}
                    placeholder="Enter your SNI device serial number (e.g., SNI-LP-2024-001)"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                  <p className="text-gray-600 text-sm mt-2">
                    Your serial number can be found on the bottom of your device or in the system information.
                  </p>
                </div>

                {/* Passcode Field - Shows for active or expired warranties */}
                {showPasscodeField && (
                  <div className="animate-slide-up">
                    <div className={`border rounded-xl p-4 mb-4 ${
                      warrantyStatus === 'Active' 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-orange-50 border-orange-200'
                    }`}>
                      <p className={`font-medium ${
                        warrantyStatus === 'Active' ? 'text-green-700' : 'text-orange-700'
                      }`}>
                        ✓ Warranty Found {warrantyStatus === 'Active' ? '(Active)' : '(Expired)'}!
                      </p>
                      <p className={`text-sm mt-1 ${
                        warrantyStatus === 'Active' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        Please enter your passcode to view warranty details.
                      </p>
                    </div>
                    <label className="block text-black font-semibold mb-3">
                      Passcode
                    </label>
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter your passcode"
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    />
                    <p className="text-gray-600 text-sm mt-2">
                      Enter the passcode provided when you purchased your device.
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                {!showPasscodeField ? (
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
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setShowPasscodeField(false);
                        setPasscode('');
                        setError('');
                        setWarrantyStatus('');
                      }}
                      className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={verifyPasscode}
                      disabled={!passcode || isLoading}
                      className="flex-1 btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                          Verifying...
                        </div>
                      ) : (
                        'Verify Passcode'
                      )}
                    </button>
                  </div>
                )}
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
                      <span className="text-gray-600">Start Date:</span>
                      <span className="text-black font-medium">{warrantyResult.purchaseDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">NIC Number:</span>
                      <span className="text-black font-medium">{warrantyResult.nicNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-black font-semibold mb-4">Warranty Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`font-medium ${
                        warrantyResult.status === 'Active' 
                          ? 'text-green-600' 
                          : warrantyResult.status === 'Expired' 
                          ? 'text-orange-600' 
                          : 'text-gray-600'
                      }`}>
                        {warrantyResult.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Date:</span>
                      <span className="text-black font-medium">{warrantyResult.warrantyExpiry}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Windows Key Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
                <h3 className="text-black font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Windows Activation Key
                </h3>
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="text-center text-2xl font-mono font-bold text-blue-900 tracking-wider">
                    {warrantyResult.windowsKey}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Keep this key safe for Windows reinstallation
                </p>
              </div>

              {/* Contact Support Section */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-black font-semibold mb-4 text-center">Need Help? Contact Support</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <a href="tel:+94112345678" className="text-black font-medium hover:text-primary transition-colors">
                        +94 11 234 5678
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <a href="mailto:info@sni.lk" className="text-black font-medium hover:text-primary transition-colors">
                        info@sni.lk
                      </a>
                    </div>
                  </div>
                </div>
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
