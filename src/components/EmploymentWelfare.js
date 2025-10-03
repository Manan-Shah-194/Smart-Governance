import React, { useState } from 'react';
import { Briefcase, GraduationCap, Users, DollarSign, Search, Filter, ExternalLink, CheckCircle, Clock } from 'lucide-react';

const EmploymentWelfare = ({ user, addNotification }) => {
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const welfarePrograms = [
    {
      id: 1,
      title: 'Maharashtra Scholarship Program',
      description: 'Financial assistance for students pursuing higher education',
      category: 'Education',
      status: 'Open',
      deadline: '2024-03-31',
      amount: '₹50,000',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Pension Scheme for Senior Citizens',
      description: 'Monthly pension for citizens above 60 years',
      category: 'Pension',
      status: 'Open',
      deadline: '2024-12-31',
      amount: '₹1,000/month',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 3,
      title: 'MGNREGA Job Card Registration',
      description: 'Guaranteed 100 days of employment in rural areas',
      category: 'Employment',
      status: 'Open',
      deadline: '2024-12-31',
      amount: '₹200/day',
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 4,
      title: 'Skill Development Program',
      description: 'Free vocational training for unemployed youth',
      category: 'Training',
      status: 'Open',
      deadline: '2024-06-30',
      amount: 'Free',
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const jobListings = [
    {
      id: 1,
      title: 'Data Entry Operator',
      company: 'Government IT Department',
      location: 'Mumbai',
      salary: '₹25,000 - ₹30,000',
      type: 'Full-time',
      experience: '1-2 years',
      posted: '2024-01-10',
      status: 'Active',
      description: 'Responsible for data entry and maintenance of government records'
    },
    {
      id: 2,
      title: 'Field Officer',
      company: 'Rural Development Department',
      location: 'Pune',
      salary: '₹30,000 - ₹35,000',
      type: 'Full-time',
      experience: '2-3 years',
      posted: '2024-01-08',
      status: 'Active',
      description: 'Field work related to rural development projects'
    },
    {
      id: 3,
      title: 'Clerk',
      company: 'District Administration',
      location: 'Nashik',
      salary: '₹20,000 - ₹25,000',
      type: 'Full-time',
      experience: '0-1 years',
      posted: '2024-01-05',
      status: 'Active',
      description: 'Administrative work in district office'
    }
  ];

  const skillPrograms = [
    {
      id: 1,
      title: 'Digital Marketing Course',
      duration: '3 months',
      seats: 25,
      enrolled: 18,
      startDate: '2024-02-01',
      status: 'Open'
    },
    {
      id: 2,
      title: 'Computer Programming',
      duration: '6 months',
      seats: 30,
      enrolled: 25,
      startDate: '2024-02-15',
      status: 'Open'
    },
    {
      id: 3,
      title: 'Electrician Training',
      duration: '4 months',
      seats: 20,
      enrolled: 20,
      startDate: '2024-01-20',
      status: 'Full'
    }
  ];

  const handleApply = (item, type) => {
    addNotification({
      message: `Application submitted for ${item.title}`,
      time: 'Just now',
      type: 'success'
    });
  };

  const handleEnroll = (program) => {
    addNotification({
      message: `Enrolled in ${program.title}`,
      time: 'Just now',
      type: 'success'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-green-600 bg-green-100';
      case 'Active': return 'text-blue-600 bg-blue-100';
      case 'Full': return 'text-red-600 bg-red-100';
      case 'Closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredWelfarePrograms = welfarePrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || program.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Employment & Welfare</h1>
            <p className="text-gray-600">
              Access job opportunities, welfare schemes, and skill development programs.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-4 mb-8">
            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{jobListings.length}</h3>
              <p className="text-gray-600">Job Openings</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{welfarePrograms.length}</h3>
              <p className="text-gray-600">Welfare Schemes</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{skillPrograms.length}</h3>
              <p className="text-gray-600">Skill Programs</p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1,250</h3>
              <p className="text-gray-600">Active Beneficiaries</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg ${
                    activeTab === 'jobs'
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Government Jobs
                </button>
                <button
                  onClick={() => setActiveTab('internships')}
                  className={`py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg ${
                    activeTab === 'internships'
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Student Internships
                </button>
                <button
                  onClick={() => setActiveTab('welfare')}
                  className={`py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg ${
                    activeTab === 'welfare'
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Welfare Schemes
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`py-3 px-4 border-b-2 font-medium text-sm rounded-t-lg ${
                    activeTab === 'skills'
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Skill Development
                </button>
              </nav>
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
                    placeholder="Search jobs, schemes, or programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {activeTab === 'welfare' && (
                <div className="sm:w-48">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="Education">Education</option>
                    <option value="Employment">Employment</option>
                    <option value="Pension">Pension</option>
                    <option value="Training">Training</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Job Listings */}
          {activeTab === 'jobs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Available Jobs</h2>
                <div className="flex space-x-2">
                  <button className="btn btn-primary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View All Jobs
                  </button>
                  <a 
                    href="https://mahadbt.maharashtra.gov.in" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    MahaDBT Portal
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="card">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                        <p className="text-sm text-gray-500 mt-1">{job.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>

                    <div className="grid grid-2 gap-4 mb-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Salary:</span> {job.salary}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {job.type}
                      </div>
                      <div>
                        <span className="font-medium">Experience:</span> {job.experience}
                      </div>
                      <div>
                        <span className="font-medium">Posted:</span> {new Date(job.posted).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApply(job, 'job')}
                        className="btn btn-primary flex-1"
                      >
                        Apply Now
                      </button>
                      <button className="btn btn-secondary">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Student Internships */}
          {activeTab === 'internships' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Student Internships</h2>
                <a 
                  href="https://mahadbt.maharashtra.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  MahaDBT Portal
                </a>
              </div>

              <div className="grid grid-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Government Internship Program</h3>
                  <p className="text-gray-600 mb-4">6-month internship program for students in various government departments</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: 6 months</span>
                    <button className="btn btn-primary text-sm">Apply Now</button>
                  </div>
                </div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Digital India Internship</h3>
                  <p className="text-gray-600 mb-4">Technology-focused internship for IT students</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: 3 months</span>
                    <button className="btn btn-primary text-sm">Apply Now</button>
                  </div>
                </div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Rural Development Internship</h3>
                  <p className="text-gray-600 mb-4">Field work internship in rural development projects</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: 4 months</span>
                    <button className="btn btn-primary text-sm">Apply Now</button>
                  </div>
                </div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Department Internship</h3>
                  <p className="text-gray-600 mb-4">Medical and public health internship opportunities</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: 6 months</span>
                    <button className="btn btn-primary text-sm">Apply Now</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Welfare Schemes */}
          {activeTab === 'welfare' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Welfare Schemes</h2>
                <button className="btn btn-primary">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  MahaDBT Portal
                </button>
              </div>

              <div className="grid grid-2 gap-6">
                {filteredWelfarePrograms.map((program) => {
                  const Icon = program.icon;
                  return (
                    <div key={program.id} className="card">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`w-12 h-12 ${program.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 ${program.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{program.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{program.category}</span>
                            <span>•</span>
                            <span>{program.amount}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                          {program.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Deadline:</span> {new Date(program.deadline).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {Math.ceil((new Date(program.deadline) - new Date()) / (1000 * 60 * 60 * 24))} days left
                        </div>
                      </div>

                      <button
                        onClick={() => handleApply(program, 'welfare')}
                        className="btn btn-primary w-full"
                      >
                        Apply Now
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skill Development */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Skill Development Programs</h2>
                <button className="btn btn-primary">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  All Programs
                </button>
              </div>

              <div className="space-y-4">
                {skillPrograms.map((program) => (
                  <div key={program.id} className="card">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{program.title}</h3>
                        <p className="text-sm text-gray-600">Duration: {program.duration}</p>
                        <p className="text-sm text-gray-500">Start Date: {new Date(program.startDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                        {program.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Enrollment Progress</span>
                        <span>{program.enrolled}/{program.seats}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(program.enrolled / program.seats) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEnroll(program)}
                        disabled={program.status === 'Full'}
                        className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {program.status === 'Full' ? 'Fully Enrolled' : 'Enroll Now'}
                      </button>
                      <button className="btn btn-secondary">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmploymentWelfare;
