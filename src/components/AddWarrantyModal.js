import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const AddWarrantyModal = ({ warranty, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    serial_number: '',
    warranty_start_date: '',
    warranty_end_date: '',
    windows_key: '',
    nic_number: '',
    passcode: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (warranty) {
      setFormData({
        serial_number: warranty.serial_number || '',
        warranty_start_date: warranty.warranty_start_date ? warranty.warranty_start_date.split('T')[0] : '',
        warranty_end_date: warranty.warranty_end_date ? warranty.warranty_end_date.split('T')[0] : '',
        windows_key: warranty.windows_key || '',
        nic_number: warranty.nic_number || '',
        passcode: warranty.passcode || ''
      });
    }
  }, [warranty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    setGeneralError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.serial_number.trim()) {
      newErrors.serial_number = 'Serial number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setLoading(true);
    setGeneralError('');

    try {
      const url = warranty
        ? `http://localhost:5000/api/warranties/${warranty._id}`
        : 'http://localhost:5000/api/warranties';
      
      const method = warranty ? 'PUT' : 'POST';

      // Prepare data with ISO format dates
      const dataToSend = {
        ...formData,
        warranty_start_date: formData.warranty_start_date ? new Date(formData.warranty_start_date).toISOString() : '',
        warranty_end_date: formData.warranty_end_date ? new Date(formData.warranty_end_date).toISOString() : ''
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(dataToSend)
      });

      const data = await response.json();

      if (data.success) {
        onSave();
      } else {
        setGeneralError(data.error || 'Failed to save warranty');
      }
    } catch (error) {
      console.error('Error saving warranty:', error);
      setGeneralError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {warranty ? 'Edit Warranty' : 'Add New Warranty'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {generalError && (
            <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {generalError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Serial Number */}
            <div className="md:col-span-2">
              <label htmlFor="serial_number" className="block text-sm font-medium text-gray-700 mb-1">
                Serial Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="serial_number"
                name="serial_number"
                value={formData.serial_number}
                onChange={handleChange}
                className={`block w-full px-3 py-2 border ${
                  errors.serial_number ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                placeholder="e.g., SNI-LP-2024-001"
              />
              {errors.serial_number && (
                <p className="mt-1 text-sm text-red-600">{errors.serial_number}</p>
              )}
            </div>

            {/* Warranty Start Date */}
            <div>
              <label htmlFor="warranty_start_date" className="block text-sm font-medium text-gray-700 mb-1">
                Warranty Start Date
              </label>
              <input
                type="date"
                id="warranty_start_date"
                name="warranty_start_date"
                value={formData.warranty_start_date}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Warranty End Date */}
            <div>
              <label htmlFor="warranty_end_date" className="block text-sm font-medium text-gray-700 mb-1">
                Warranty End Date
              </label>
              <input
                type="date"
                id="warranty_end_date"
                name="warranty_end_date"
                value={formData.warranty_end_date}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Windows Key */}
            <div className="md:col-span-2">
              <label htmlFor="windows_key" className="block text-sm font-medium text-gray-700 mb-1">
                Windows Key
              </label>
              <input
                type="text"
                id="windows_key"
                name="windows_key"
                value={formData.windows_key}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono"
                placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
              />
            </div>

            {/* NIC Number */}
            <div>
              <label htmlFor="nic_number" className="block text-sm font-medium text-gray-700 mb-1">
                NIC Number
              </label>
              <input
                type="text"
                id="nic_number"
                name="nic_number"
                value={formData.nic_number}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 199512345678"
              />
            </div>

            {/* Passcode */}
            <div>
              <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-1">
                Passcode
              </label>
              <input
                type="text"
                id="passcode"
                name="passcode"
                value={formData.passcode}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter passcode"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Saving...' : warranty ? 'Update Warranty' : 'Add Warranty'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWarrantyModal;



