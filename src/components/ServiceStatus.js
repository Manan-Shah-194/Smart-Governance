import React, { useState } from 'react';
import { Search, FileText, Clock, CheckCircle, AlertCircle, XCircle, Eye, Download } from 'lucide-react';

const ServiceStatus = ({ user, addNotification }) => {
  const [searchId, setSearchId] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const mockServices = [
    {
      id: 'COMP-123456789',
      type: 'Complaint',
      title: 'Water supply issue in Sector 5',
      status: 'In Progress',
      submittedDate: '2024-01-10',
      lastUpdated: '2024-01-15',
      assignedTo: 'Water Department',
      priority: 'High',
      description: 'No water supply for the past 3 days in Sector 5 area',
      location: 'Sector 5, City Center',
      estimatedResolution: '2024-01-20',
      updates: [
        {
          date: '2024-01-15',
          status: 'In Progress',
          message: 'Field inspection completed. Issue identified as broken pipeline.',
          officer: 'Rajesh Kumar'
        },
        {
          date: '2024-01-12',
          status: 'Under Review',
          message: 'Complaint assigned to Water Department for investigation.',
          officer: 'System'
        },
        {
          date: '2024-01-10',
          status: 'Submitted',
          message: 'Complaint submitted successfully.',
          officer: 'System'
        }
      ]
    },
    {
      id: 'APT-987654321',
      type: 'Appointment',
      title: 'Birth Certificate Application',
      status: 'Confirmed',
      submittedDate: '2024-01-08',
      lastUpdated: '2024-01-12',
      assignedTo: 'Registrar Office',
      priority: 'Medium',
      description: 'Birth certificate for newborn child',
      location: 'District Office, Room 101',
      appointmentDate: '2024-01-18',
      appointmentTime: '10:00 AM',
      updates: [
        {
          date: '2024-01-12',
          status: 'Confirmed',
          message: 'Appointment confirmed for 18th January at 10:00 AM.',
          officer: 'Priya Sharma'
        },
        {
          date: '2024-01-08',
          status: 'Pending',
          message: 'Appointment request submitted.',
          officer: 'System'
        }
      ]
    },
    {
      id: 'DOC-456789123',
      type: 'Document',
      title: 'Income Certificate Request',
      status: 'Approved',
      submittedDate: '2024-01-05',
      lastUpdated: '2024-01-14',
      assignedTo: 'Revenue Department',
      priority: 'Medium',
      description: 'Income certificate for scholarship application',
      location: 'Tehsil Office',
      estimatedResolution: '2024-01-16',
      updates: [
        {
          date: '2024-01-14',
          status: 'Approved',
          message: 'Document approved and ready for download.',
          officer: 'Amit Patel'
        },
        {
          date: '2024-01-10',
          status: 'Under Review',
          message: 'Documents under verification.',
          officer: 'Sunita Devi'
        },
        {
          date: '2024-01-05',
          status: 'Submitted',
          message: 'Document request submitted.',
          officer: 'System'
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100';
      case 'Confirmed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Under Review': return 'text-yellow-600 bg-yellow-100';
      case 'Pending': return 'text-orange-600 bg-orange-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'In Progress': return <Clock className="w-4 h-4" />;
      case 'Under Review': return <AlertCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      addNotification({
        message: 'Please enter a service ID',
        time: 'Just now',
        type: 'error'
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = mockServices.find(service => 
        service.id.toLowerCase().includes(searchId.toLowerCase())
      );
      
      setSearchResults(result || null);
      setIsSearching(false);
      
      if (!result) {
        addNotification({
          message: 'No service found with that ID',
          time: 'Just now',
          type: 'error'
        });
      }
    }, 1000);
  };

  const handleDownload = (serviceId) => {
    addNotification({
      message: `Downloading document for ${serviceId}`,
      time: 'Just now',
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Status</h1>
            <p className="text-gray-600">
              Track the status and progress of your government service requests.
            </p>
          </div>

          {/* Search Section */}
          <div className="card mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Service Status</h2>
            <div className="flex space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter service ID (e.g., COMP-123456789, APT-987654321)"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="btn btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults ? (
            <div className="space-y-6">
              {/* Service Overview */}
              <div className="card">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{searchResults.title}</h3>
                    <p className="text-gray-600">Service ID: {searchResults.id}</p>
                    <p className="text-sm text-gray-500">Type: {searchResults.type}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${getStatusColor(searchResults.status)}`}>
                      {getStatusIcon(searchResults.status)}
                      <span className="ml-2">{searchResults.status}</span>
                    </span>
                    <span className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(searchResults.priority)}`}>
                      {searchResults.priority} Priority
                    </span>
                  </div>
                </div>

                <div className="grid grid-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Service Details</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Submitted:</span> {new Date(searchResults.submittedDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Last Updated:</span> {new Date(searchResults.lastUpdated).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Assigned To:</span> {searchResults.assignedTo}
                      </div>
                      {searchResults.appointmentDate && (
                        <div>
                          <span className="font-medium">Appointment Date:</span> {new Date(searchResults.appointmentDate).toLocaleDateString()}
                        </div>
                      )}
                      {searchResults.appointmentTime && (
                        <div>
                          <span className="font-medium">Appointment Time:</span> {searchResults.appointmentTime}
                        </div>
                      )}
                      {searchResults.estimatedResolution && (
                        <div>
                          <span className="font-medium">Estimated Resolution:</span> {new Date(searchResults.estimatedResolution).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-sm text-gray-600 mb-2">{searchResults.description}</p>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> {searchResults.location}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="btn btn-secondary">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  {(searchResults.status === 'Approved' || searchResults.status === 'Completed') && (
                    <button
                      onClick={() => handleDownload(searchResults.id)}
                      className="btn btn-primary"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                  )}
                </div>
              </div>

              {/* Status Updates Timeline */}
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Status Updates</h3>
                <div className="space-y-4">
                  {searchResults.updates.map((update, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(update.status).replace('text-', 'bg-').replace('-600', '-100')}`}>
                        {getStatusIcon(update.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{update.status}</h4>
                          <span className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{update.message}</p>
                        <p className="text-xs text-gray-500">By: {update.officer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : searchResults === null ? (
            <div className="card text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Search for Service Status</h3>
              <p className="text-gray-600 mb-4">
                Enter your service ID above to check the status and progress of your request.
              </p>
              <div className="text-sm text-gray-500">
                <p>Service IDs look like:</p>
                <p>• COMP-123456789 (Complaints)</p>
                <p>• APT-987654321 (Appointments)</p>
                <p>• DOC-456789123 (Documents)</p>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Service Not Found</h3>
              <p className="text-gray-600 mb-4">
                No service found with the ID "{searchId}". Please check the ID and try again.
              </p>
              <button
                onClick={() => setSearchResults(null)}
                className="btn btn-primary"
              >
                Search Again
              </button>
            </div>
          )}

          {/* Recent Services */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Services</h2>
            <div className="space-y-4">
              {mockServices.slice(0, 3).map((service) => (
                <div key={service.id} className="card">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{service.title}</h4>
                      <p className="text-sm text-gray-600">ID: {service.id}</p>
                      <p className="text-sm text-gray-500">Submitted: {new Date(service.submittedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                      <button
                        onClick={() => {
                          setSearchId(service.id);
                          handleSearch();
                        }}
                        className="btn btn-secondary text-sm mt-2"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceStatus;
