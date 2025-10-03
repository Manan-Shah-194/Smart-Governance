import React, { useState } from 'react';
import { Users, Search, Filter, Phone, Mail, MapPin, Star, MessageCircle, UserPlus, X } from 'lucide-react';

const ProfileManagement = ({ user, addNotification }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  const leaders = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Sarpanch',
      village: 'Village A',
      district: 'Pune',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@villagea.gov.in',
      experience: '5 years',
      rating: 4.8,
      specializations: ['Water Management', 'Education', 'Healthcare'],
      bio: 'Dedicated to improving village infrastructure and citizen welfare.',
      image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=3b82f6&color=fff',
      isOnline: true
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Deputy Sarpanch',
      village: 'Village B',
      district: 'Nashik',
      phone: '+91 87654 32109',
      email: 'priya.sharma@villageb.gov.in',
      experience: '3 years',
      rating: 4.6,
      specializations: ['Women Empowerment', 'Child Welfare', 'Agriculture'],
      bio: 'Passionate about women empowerment and child development.',
      image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff',
      isOnline: false
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Panchayat Member',
      village: 'Village C',
      district: 'Aurangabad',
      phone: '+91 76543 21098',
      email: 'amit.patel@villagec.gov.in',
      experience: '2 years',
      rating: 4.4,
      specializations: ['Infrastructure', 'Transport', 'Environment'],
      bio: 'Focused on sustainable development and environmental conservation.',
      image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=fff',
      isOnline: true
    },
    {
      id: 4,
      name: 'Sunita Devi',
      role: 'Panchayat Member',
      village: 'Village D',
      district: 'Kolhapur',
      phone: '+91 65432 10987',
      email: 'sunita.devi@villaged.gov.in',
      experience: '4 years',
      rating: 4.7,
      specializations: ['Health', 'Sanitation', 'Social Welfare'],
      bio: 'Committed to improving healthcare and sanitation in rural areas.',
      image: 'https://ui-avatars.com/api/?name=Sunita+Devi&background=ef4444&color=fff',
      isOnline: false
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Block Development Officer',
      village: 'Village E',
      district: 'Sangli',
      phone: '+91 54321 09876',
      email: 'vikram.singh@villaged.gov.in',
      experience: '8 years',
      rating: 4.9,
      specializations: ['Rural Development', 'Employment', 'Technology'],
      bio: 'Expert in rural development and technology integration.',
      image: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=8b5cf6&color=fff',
      isOnline: true
    },
    {
      id: 6,
      name: 'Meera Joshi',
      role: 'Education Officer',
      village: 'Village F',
      district: 'Satara',
      phone: '+91 43210 98765',
      email: 'meera.joshi@villagef.gov.in',
      experience: '6 years',
      rating: 4.5,
      specializations: ['Education', 'Youth Development', 'Digital Literacy'],
      bio: 'Dedicated to improving education quality and digital literacy.',
      image: 'https://ui-avatars.com/api/?name=Meera+Joshi&background=06b6d4&color=fff',
      isOnline: true
    }
  ];

  const roles = ['all', 'Sarpanch', 'Deputy Sarpanch', 'Panchayat Member', 'Block Development Officer', 'Education Officer'];

  const handleContact = (leader, method) => {
    addNotification({
      message: `Opening ${method} for ${leader.name}`,
      time: 'Just now',
      type: 'info'
    });
  };

  const handleMessage = (leader) => {
    addNotification({
      message: `Opening chat with ${leader.name}`,
      time: 'Just now',
      type: 'info'
    });
  };

  const filteredLeaders = leaders.filter(leader => {
    const matchesSearch = leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leader.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leader.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         leader.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterRole === 'all' || leader.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gram Panchayat Leaders</h1>
            <p className="text-gray-600">
              Connect with local government leaders and officials for better governance.
            </p>
            {debugInfo && (
              <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
                Debug: {debugInfo} | Selected: {selectedLeader ? selectedLeader.name : 'None'}
              </div>
            )}
            <button 
              onClick={() => setSelectedLeader(leaders[0])}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded text-sm"
            >
              Test Modal (Click to open)
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-4 mb-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{leaders.length}</h3>
              <p className="text-gray-600">Total Leaders</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">4.7</h3>
              <p className="text-gray-600">Avg Rating</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-gray-600">Active Chats</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
              <p className="text-gray-600">Online Now</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="card mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, village, district, or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role === 'all' ? 'All Roles' : role}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Leaders Grid */}
          <div className="grid grid-2 gap-6">
            {filteredLeaders.map((leader) => (
              <div key={leader.id} className="card">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-16 h-16 rounded-full"
                    />
                    {leader.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{leader.name}</h3>
                        <p className="text-sm text-blue-600 font-medium">{leader.role}</p>
                        <p className="text-sm text-gray-600">{leader.village}, {leader.district}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-600 text-sm">
                          <Star className="w-4 h-4 mr-1" />
                          <span className="font-medium">{leader.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">{leader.experience} experience</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">{leader.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {leader.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleContact(leader, 'call')}
                    className="btn btn-primary flex-1 text-sm"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </button>
                  <button
                    onClick={() => handleMessage(leader)}
                    className="btn btn-secondary flex-1 text-sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('View button clicked for leader:', leader.name);
                      setDebugInfo(`Clicked on ${leader.name}`);
                      setSelectedLeader(leader);
                    }}
                    className="btn btn-secondary text-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredLeaders.length === 0 && (
            <div className="card text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Leaders Found</h3>
              <p className="text-gray-600">
                {searchTerm || filterRole !== 'all' 
                  ? 'No leaders match your search criteria.'
                  : 'No leaders available at the moment.'
                }
              </p>
            </div>
          )}

          {/* Leader Detail Modal */}
          {selectedLeader && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedLeader.image}
                        alt={selectedLeader.name}
                        className="w-20 h-20 rounded-full"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedLeader.name}</h2>
                        <p className="text-lg text-blue-600 font-medium">{selectedLeader.role}</p>
                        <p className="text-gray-600">{selectedLeader.village}, {selectedLeader.district}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedLeader(null)}
                      className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                      <p className="text-gray-600">{selectedLeader.bio}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedLeader.specializations.map((spec, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Experience</h4>
                        <p className="text-gray-600">{selectedLeader.experience}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Rating</h4>
                        <div className="flex items-center text-yellow-600">
                          <Star className="w-4 h-4 mr-1" />
                          <span className="font-medium">{selectedLeader.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{selectedLeader.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>{selectedLeader.email}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{selectedLeader.village}, {selectedLeader.district}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <button
                        onClick={() => handleContact(selectedLeader, 'call')}
                        className="btn btn-primary flex-1"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </button>
                      <button
                        onClick={() => handleMessage(selectedLeader)}
                        className="btn btn-secondary flex-1"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;
