import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'https://snibackend-production.up.railway.app';

const WarrantyChecker = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [warrantyResult, setWarrantyResult] = useState(null);
  const [showPasscodeField, setShowPasscodeField] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [warrantyStatus, setWarrantyStatus] = useState('');


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

        // Calculate remaining days (positive = days until expiry, negative = days since expired)
        const endDate = new Date(warranty.warranty_end_date);
        const today = new Date();
        const remainingDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

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

  const isValidSerial = serialNumber.length >= 3;

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
            {/* Manual Entry Form */}
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
                    onChange={(e) => setSerialNumber(e.target.value)}
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
          </div>
        </div>
      </section>

      {/* Warranty Result */}
      {warrantyResult && (
        <section className="py-8 bg-gray-50">
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
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        {warrantyResult.remainingDays >= 0 ? 'Days Until Expiry:' : 'Days Since Expired:'}
                      </span>
                      <span className={`font-medium ${
                        warrantyResult.remainingDays >= 0 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {warrantyResult.remainingDays >= 0 
                          ? `${warrantyResult.remainingDays} days` 
                          : `${Math.abs(warrantyResult.remainingDays)} days ago`
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Windows Key Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
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
              <p className="text-gray-600 text-sm mb-1">
                <a href="tel:+94112345678" className="hover:text-primary transition-colors">
                  +94 11 234 5678
                </a>
              </p>
              <p className="text-gray-600 text-sm">
                <a href="mailto:info@sni.lk" className="hover:text-primary transition-colors">
                  info@sni.lk
                </a>
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
