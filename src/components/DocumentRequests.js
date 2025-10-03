import React, { useState } from 'react';
import { FileText, Download, Eye, Search, Filter, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const DocumentRequests = ({ user, addNotification }) => {
  const [activeTab, setActiveTab] = useState('request');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    documentType: '',
    purpose: '',
    urgency: 'normal',
    description: '',
    supportingDocs: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const documentTypes = [
    'Birth Certificate',
    'Death Certificate',
    'Marriage Certificate',
    'Income Certificate',
    'Caste Certificate',
    'Domicile Certificate',
    'Character Certificate',
    'Residence Certificate',
    'Migration Certificate',
    'No Objection Certificate',
    'Property Documents',
    'Educational Certificates'
  ];

  const [documents, setDocuments] = useState([
    {
      id: 1,
      type: 'Birth Certificate',
      purpose: 'School Admission',
      status: 'Approved',
      submittedDate: '2024-01-10',
      approvedDate: '2024-01-12',
      downloadUrl: '#',
      description: 'Birth certificate for school admission'
    },
    {
      id: 2,
      type: 'Income Certificate',
      purpose: 'Scholarship Application',
      status: 'Pending',
      submittedDate: '2024-01-15',
      approvedDate: null,
      downloadUrl: null,
      description: 'Income certificate for scholarship application'
    },
    {
      id: 3,
      type: 'Caste Certificate',
      purpose: 'Government Job Application',
      status: 'Under Review',
      submittedDate: '2024-01-08',
      approvedDate: null,
      downloadUrl: null,
      description: 'Caste certificate for government job application'
    }
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newDocument = {
        id: documents.length + 1,
        ...formData,
        status: 'Pending',
        submittedDate: new Date().toISOString().split('T')[0],
        approvedDate: null,
        downloadUrl: null
      };
      
      setDocuments([newDocument, ...documents]);
      
      addNotification({
        message: `Document request for ${formData.documentType} submitted`,
        time: 'Just now',
        type: 'success'
      });

      setFormData({
        documentType: '',
        purpose: '',
        urgency: 'normal',
        description: '',
        supportingDocs: []
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Under Review': return 'text-blue-600 bg-blue-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Under Review': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Requests</h1>
            <p className="text-gray-600">
              Request government documents and track their status online.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('request')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'request'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Request Document
                </button>
                <button
                  onClick={() => setActiveTab('track')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'track'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Track Requests
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'request' && (
            <div className="grid grid-2 gap-8">
              {/* Request Form */}
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Request New Document</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Type *
                    </label>
                    <select
                      name="documentType"
                      value={formData.documentType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select document type</option>
                      {documentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Request *
                    </label>
                    <input
                      type="text"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., School admission, Job application"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="urgency"
                          value="normal"
                          checked={formData.urgency === 'normal'}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <span className="text-gray-700">Normal (7-15 days)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="urgency"
                          value="urgent"
                          checked={formData.urgency === 'urgent'}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <span className="text-gray-700">Urgent (3-7 days)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="urgency"
                          value="emergency"
                          checked={formData.urgency === 'emergency'}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <span className="text-gray-700">Emergency (1-3 days)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Provide any additional details or special requirements"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </div>

              {/* Guidelines */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Government issued photo ID (Aadhaar, Voter ID, etc.)</p>
                    <p>• Proof of address (Utility bill, Bank statement, etc.)</p>
                    <p>• Supporting documents as per document type</p>
                    <p>• Passport size photographs (if required)</p>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Time</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Normal Processing</span>
                      <span className="font-medium">7-15 working days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Urgent Processing</span>
                      <span className="font-medium">3-7 working days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency Processing</span>
                      <span className="font-medium">1-3 working days</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Fees Structure</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Birth/Death Certificate</span>
                      <span className="font-medium">₹50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Income Certificate</span>
                      <span className="font-medium">₹100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Caste Certificate</span>
                      <span className="font-medium">₹150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Certificates</span>
                      <span className="font-medium">₹100-200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'track' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="card">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="sm:w-48">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Documents List */}
              <div className="space-y-4">
                {filteredDocuments.length === 0 ? (
                  <div className="card text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || filterStatus !== 'all' 
                        ? 'No documents match your search criteria.'
                        : 'You haven\'t requested any documents yet.'
                      }
                    </p>
                    {!searchTerm && filterStatus === 'all' && (
                      <button
                        onClick={() => setActiveTab('request')}
                        className="btn btn-primary"
                      >
                        Request Document
                      </button>
                    )}
                  </div>
                ) : (
                  filteredDocuments.map((document) => (
                    <div key={document.id} className="card">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {document.type}
                          </h3>
                          <p className="text-sm text-gray-600">{document.purpose}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(document.status)}`}>
                            {getStatusIcon(document.status)}
                            <span className="ml-1">{document.status}</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-2 gap-4 mb-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Submitted:</span> {new Date(document.submittedDate).toLocaleDateString()}
                        </div>
                        {document.approvedDate && (
                          <div>
                            <span className="font-medium">Approved:</span> {new Date(document.approvedDate).toLocaleDateString()}
                          </div>
                        )}
                        <div className="col-span-2">
                          <span className="font-medium">Description:</span> {document.description}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="btn btn-secondary text-sm flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </button>
                        {document.downloadUrl && (
                          <button className="btn btn-primary text-sm flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentRequests;
