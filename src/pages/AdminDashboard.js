import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Search, Calendar } from 'lucide-react';
import AddWarrantyModal from '../components/AddWarrantyModal';

const AdminDashboard = () => {
  const [warranties, setWarranties] = useState([]);
  const [filteredWarranties, setFilteredWarranties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingWarranty, setEditingWarranty] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    filterWarranties();
  }, [searchTerm, statusFilter, warranties]);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/check-auth', {
        credentials: 'include'
      });
      const data = await response.json();

      if (!data.authenticated) {
        navigate('/admin');
      } else {
        setUser(data.user);
        fetchWarranties();
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      navigate('/admin');
    }
  };

  const fetchWarranties = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/warranties', {
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        setWarranties(data.warranties);
        setFilteredWarranties(data.warranties);
      } else {
        console.error('Error fetching warranties:', data.message);
      }
    } catch (error) {
      console.error('Error fetching warranties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterWarranties = () => {
    let filtered = warranties;

    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(w => w.warranty_status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(w =>
        w.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (w.nic_number && w.nic_number.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredWarranties(filtered);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleAddWarranty = () => {
    setEditingWarranty(null);
    setShowModal(true);
  };

  const handleEditWarranty = (warranty) => {
    setEditingWarranty(warranty);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingWarranty(null);
  };

  const handleWarrantySaved = () => {
    setShowModal(false);
    setEditingWarranty(null);
    fetchWarranties();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Expired':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Inactive':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const stats = {
    total: warranties.length,
    active: warranties.filter(w => w.warranty_status === 'Active').length,
    expired: warranties.filter(w => w.warranty_status === 'Expired').length,
    inactive: warranties.filter(w => w.warranty_status === 'Inactive').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Warranty Management</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome, {user?.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500">Total Warranties</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500">Active</div>
            <div className="mt-2 text-3xl font-bold text-green-600">{stats.active}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500">Expired</div>
            <div className="mt-2 text-3xl font-bold text-red-600">{stats.expired}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-sm font-medium text-gray-500">Inactive</div>
            <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.inactive}</div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by serial or NIC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddWarranty}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Plus size={20} />
              Add Warranty
            </button>
          </div>
        </div>

        {/* Warranties Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serial Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NIC Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Windows Key
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWarranties.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No warranties found
                    </td>
                  </tr>
                ) : (
                  filteredWarranties.map((warranty) => (
                    <tr key={warranty._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{warranty.serial_number}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(warranty.warranty_status)}`}>
                          {warranty.warranty_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(warranty.warranty_start_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(warranty.warranty_end_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {warranty.nic_number || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {warranty.windows_key || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleEditWarranty(warranty)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddWarrantyModal
          warranty={editingWarranty}
          onClose={handleModalClose}
          onSave={handleWarrantySaved}
        />
      )}
    </div>
  );
};

export default AdminDashboard;



