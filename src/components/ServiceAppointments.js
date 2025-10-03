import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';

const ServiceAppointments = ({ user, addNotification }) => {
  const [activeTab, setActiveTab] = useState('book');
  const [formData, setFormData] = useState({
    service: '',
    department: '',
    date: '',
    time: '',
    purpose: '',
    contact: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Birth Certificate',
    'Death Certificate',
    'Marriage Certificate',
    'Income Certificate',
    'Caste Certificate',
    'Domicile Certificate',
    'Property Registration',
    'Driving License',
    'Passport',
    'Aadhaar Card',
    'PAN Card',
    'Voter ID Card'
  ];

  const departments = [
    'Registrar of Births & Deaths',
    'Revenue Department',
    'Transport Department',
    'Municipal Corporation',
    'Police Department',
    'Health Department',
    'Education Department',
    'Public Works Department'
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      service: 'Birth Certificate',
      department: 'Registrar of Births & Deaths',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Confirmed',
      purpose: 'New birth certificate for child',
      location: 'District Office, Room 101'
    },
    {
      id: 2,
      service: 'Income Certificate',
      department: 'Revenue Department',
      date: '2024-01-18',
      time: '02:30 PM',
      status: 'Pending',
      purpose: 'Scholarship application',
      location: 'Tehsil Office, Room 205'
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
      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
        status: 'Pending'
      };
      
      setAppointments([...appointments, newAppointment]);
      
      addNotification({
        message: `Appointment booked for ${formData.service}`,
        time: 'Just now',
        type: 'success'
      });

      setFormData({
        service: '',
        department: '',
        date: '',
        time: '',
        purpose: '',
        contact: '',
        location: ''
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    addNotification({
      message: 'Appointment cancelled successfully',
      time: 'Just now',
      type: 'info'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Appointments</h1>
            <p className="text-gray-600">
              Book appointments for government services and manage your scheduled visits.
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('book')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'book'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setActiveTab('manage')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'manage'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  My Appointments
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'book' && (
            <div className="grid grid-2 gap-8">
              {/* Booking Form */}
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Book New Appointment</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Visit *
                    </label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select purpose</option>
                      <option value="Applying New">Applying New</option>
                      <option value="Renewal">Renewal</option>
                      <option value="Updation">Updation</option>
                      <option value="Correction">Correction</option>
                      <option value="Duplicate">Duplicate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter preferred office location"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Booking...' : 'Book Appointment'}
                  </button>
                </form>
              </div>

              {/* Guidelines */}
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Guidelines</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      Book appointments at least 24 hours in advance
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      Bring all required documents
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      Arrive 15 minutes before your appointment
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      Cancel or reschedule at least 2 hours in advance
                    </li>
                  </ul>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Government issued photo ID</p>
                    <p>• Proof of address</p>
                    <p>• Relevant application forms</p>
                    <p>• Supporting documents as per service</p>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Hours</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">My Appointments</h2>
                <span className="text-sm text-gray-600">
                  {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
                </span>
              </div>

              {appointments.length === 0 ? (
                <div className="card text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments</h3>
                  <p className="text-gray-600 mb-4">You haven't booked any appointments yet.</p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="btn btn-primary"
                  >
                    Book Appointment
                  </button>
                </div>
              ) : (
                <div className="grid grid-2 gap-6">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="card">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {appointment.service}
                          </h3>
                          <p className="text-sm text-gray-600">{appointment.department}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{appointment.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="w-4 h-4 mr-2" />
                          <span>{appointment.purpose}</span>
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-4">
                        <button className="btn btn-secondary text-sm px-6 py-2 flex-1">
                          Reschedule
                        </button>
                        <button
                          onClick={() => cancelAppointment(appointment.id)}
                          className="btn btn-danger text-sm px-6 py-2 flex-1"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceAppointments;
