import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  CreditCard, 
  AlertTriangle, 
  Briefcase, 
  Users, 
  Bell, 
  MessageCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Dashboard = ({ user, addNotification }) => {
  const [stats, setStats] = useState({
    totalComplaints: 12,
    pendingAppointments: 3,
    paidBills: 8,
    emergencyContacts: 5
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'complaint',
      title: 'Water supply issue reported',
      status: 'In Progress',
      time: '2 hours ago',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Birth certificate appointment',
      status: 'Scheduled',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Electricity bill payment',
      status: 'Completed',
      time: '2 days ago',
      icon: CreditCard,
      color: 'text-purple-600'
    }
  ]);

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Police Station', number: '100', type: 'police' },
    { name: 'Fire Department', number: '101', type: 'fire' },
    { name: 'Ambulance', number: '102', type: 'medical' },
    { name: 'Women Helpline', number: '1091', type: 'women' },
    { name: 'Child Helpline', number: '1098', type: 'child' }
  ]);

  const services = [
    {
      title: 'File Complaint',
      description: 'Report issues and grievances',
      icon: FileText,
      color: 'bg-blue-500',
      link: '/complaints',
      stats: stats.totalComplaints
    },
    {
      title: 'Book Appointment',
      description: 'Schedule government services',
      icon: Calendar,
      color: 'bg-green-500',
      link: '/appointments',
      stats: stats.pendingAppointments
    },
    {
      title: 'Emergency',
      description: 'Emergency services & location',
      icon: AlertTriangle,
      color: 'bg-red-500',
      link: '/emergency',
      stats: emergencyContacts.length
    },
    {
      title: 'Employment',
      description: 'Jobs, welfare & benefits',
      icon: Briefcase,
      color: 'bg-orange-500',
      link: '/employment',
      stats: 0
    },
    {
      title: 'Leaders',
      description: 'Gram panchayat contacts',
      icon: Users,
      color: 'bg-indigo-500',
      link: '/profiles',
      stats: 0
    }
  ];

  const quickActions = [
    { title: 'Check Status', icon: TrendingUp, link: '/status', color: 'text-blue-600' },
    { title: 'Notifications', icon: Bell, link: '/notifications', color: 'text-yellow-600' },
    { title: 'AI Assistant', icon: MessageCircle, link: '/chatbot', color: 'text-green-600' }
  ];

  useEffect(() => {
    // Add welcome notification
    addNotification({
      message: `Welcome back, ${user?.name}! Check your dashboard for updates.`,
      time: 'Just now',
      type: 'info'
    });
  }, [user, addNotification]);

  const handleEmergencyCall = (contact) => {
    addNotification({
      message: `Calling ${contact.name} at ${contact.number}`,
      time: 'Just now',
      type: 'emergency'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your government services and stay connected with your community.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-4 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalComplaints}</h3>
            <p className="text-gray-600">Total Complaints</p>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.pendingAppointments}</h3>
            <p className="text-gray-600">Pending Appointments</p>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.paidBills}</h3>
            <p className="text-gray-600">Bills Paid</p>
          </div>
          <div className="card text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{emergencyContacts.length}</h3>
            <p className="text-gray-600">Emergency Contacts</p>
          </div>
        </div>

        <div className="grid grid-2 gap-8">
          {/* Services Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Government Services</h2>
            <div className="grid grid-2 gap-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={index}
                    to={service.link}
                    className="card hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {service.stats} {service.stats === 1 ? 'item' : 'items'}
                          </span>
                          <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">
                            Access →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="card">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            activity.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {activity.status}
                          </span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-3 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={index}
                      to={action.link}
                      className="card text-center hover:shadow-md transition-shadow flex flex-col items-center justify-center p-4"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-5 h-5 ${action.color}`} />
                        <span className="text-sm font-medium text-gray-900">{action.title}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Notice Board */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Public Notices</h2>
          <div className="grid grid-2 gap-6">
            <div className="card border-l-4 border-red-500">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Road Closure Notice</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Main Street will be closed from 8 AM to 6 PM on January 20th due to road repair work. 
                    Please use alternative routes.
                  </p>
                  <span className="text-xs text-gray-500">Posted: 2 hours ago</span>
                </div>
              </div>
            </div>
            
            <div className="card border-l-4 border-yellow-500">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Water Supply Interruption</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Water supply will be interrupted in Sector 3 and 4 on January 22nd from 9 AM to 3 PM 
                    for maintenance work.
                  </p>
                  <span className="text-xs text-gray-500">Posted: 1 day ago</span>
                </div>
              </div>
            </div>
            
            <div className="card border-l-4 border-blue-500">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Power Maintenance</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Scheduled power maintenance in Industrial Area on January 25th from 10 AM to 2 PM. 
                    Backup power will be available.
                  </p>
                  <span className="text-xs text-gray-500">Posted: 2 days ago</span>
                </div>
              </div>
            </div>
            
            <div className="card border-l-4 border-green-500">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">New Service Center Opening</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    A new citizen service center will open in Central Plaza on February 1st. 
                    All government services will be available.
                  </p>
                  <span className="text-xs text-gray-500">Posted: 3 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
          <div className="grid grid-5 gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="card text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{contact.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{contact.number}</p>
                <button
                  onClick={() => handleEmergencyCall(contact)}
                  className="btn btn-danger text-sm w-full"
                >
                  Call Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
