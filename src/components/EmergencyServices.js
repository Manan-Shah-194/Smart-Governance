import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Heart, Shield, Users, Clock, Navigation } from 'lucide-react';

const EmergencyServices = ({ user, addNotification }) => {
  const [location, setLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: Shield, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Fire Department', number: '101', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100' },
    { name: 'Ambulance', number: '102', icon: Heart, color: 'text-green-600', bgColor: 'bg-green-100' },
    { name: 'Women Helpline', number: '1091', icon: Users, color: 'text-pink-600', bgColor: 'bg-pink-100' },
    { name: 'Child Helpline', number: '1098', icon: Users, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { name: 'Disaster Management', number: '108', icon: AlertTriangle, color: 'text-purple-600', bgColor: 'bg-purple-100' }
  ];

  const nearbyServices = [
    { name: 'City Hospital', distance: '2.3 km', type: 'Hospital', available: true },
    { name: 'Police Station', distance: '1.8 km', type: 'Police', available: true },
    { name: 'Fire Station', distance: '3.1 km', type: 'Fire', available: true },
    { name: 'Emergency Clinic', distance: '0.9 km', type: 'Medical', available: false }
  ];

  const emergencyTypes = [
    'Medical Emergency',
    'Fire Emergency',
    'Crime/Police',
    'Natural Disaster',
    'Road Accident',
    'Domestic Violence',
    'Other'
  ];

  const getCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Current Location' // In real app, reverse geocode this
          });
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          addNotification({
            message: 'Unable to get your location. Please enable location services.',
            time: 'Just now',
            type: 'error'
          });
        }
      );
    } else {
      setIsLocating(false);
      addNotification({
        message: 'Geolocation is not supported by this browser.',
        time: 'Just now',
        type: 'error'
      });
    }
  };

  const handleEmergencyCall = (contact) => {
    addNotification({
      message: `Calling ${contact.name} at ${contact.number}`,
      time: 'Just now',
      type: 'emergency'
    });
    
    // In a real app, this would initiate a call
    window.open(`tel:${contact.number}`, '_self');
  };

  const handleEmergencyAlert = () => {
    if (!emergencyType) {
      addNotification({
        message: 'Please select emergency type first',
        time: 'Just now',
        type: 'error'
      });
      return;
    }

    setIsEmergencyActive(true);
    addNotification({
      message: `Emergency alert sent! Help is on the way.`,
      time: 'Just now',
      type: 'emergency'
    });

    // Simulate emergency response
    setTimeout(() => {
      setIsEmergencyActive(false);
      addNotification({
        message: 'Emergency services have been notified and are responding.',
        time: 'Just now',
        type: 'success'
      });
    }, 5000);
  };

  const shareLocation = () => {
    if (!location) {
      addNotification({
        message: 'Please get your location first',
        time: 'Just now',
        type: 'error'
      });
      return;
    }

    const message = `Emergency! I need help at: ${location.address} (${location.lat}, ${location.lng})`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Emergency Location',
        text: message,
        url: `https://maps.google.com/?q=${location.lat},${location.lng}`
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(message);
      addNotification({
        message: 'Location copied to clipboard',
        time: 'Just now',
        type: 'success'
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Services</h1>
            <p className="text-gray-600">
              Get immediate help and share your location with emergency services.
            </p>
          </div>

          {/* Emergency Alert Button */}
          <div className="card mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Alert</h2>
              <p className="text-gray-600 mb-6">
                Use this in case of immediate emergency to alert all emergency services
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Type
                </label>
                <select
                  value={emergencyType}
                  onChange={(e) => setEmergencyType(e.target.value)}
                  className="w-full max-w-md mx-auto p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select emergency type</option>
                  {emergencyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleEmergencyAlert}
                disabled={isEmergencyActive || !emergencyType}
                className={`w-full max-w-md mx-auto py-4 px-8 rounded-lg text-xl font-bold text-white transition-all ${
                  isEmergencyActive
                    ? 'bg-red-600 animate-pulse'
                    : 'bg-red-500 hover:bg-red-600 hover:scale-105'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isEmergencyActive ? 'EMERGENCY ALERT SENT!' : '🚨 EMERGENCY ALERT 🚨'}
              </button>
            </div>
          </div>

          {/* Location Services */}
          <div className="grid grid-2 gap-8 mb-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Location</h3>
              
              {location ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Location Found</span>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Address:</p>
                    <p className="font-medium">{location.address}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </p>
                  </div>
                  <button
                    onClick={shareLocation}
                    className="btn btn-primary w-full"
                  >
                    Share Location
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Location not available</p>
                  <button
                    onClick={getCurrentLocation}
                    disabled={isLocating}
                    className="btn btn-primary"
                  >
                    {isLocating ? 'Getting Location...' : 'Get My Location'}
                  </button>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Nearby Services</h3>
              <div className="space-y-3">
                {nearbyServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.distance} away</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        service.available 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {service.available ? 'Available' : 'Busy'}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{service.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Emergency Contacts</h3>
            <div className="grid grid-3 gap-4">
              {emergencyContacts.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 ${contact.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <Icon className={`w-8 h-8 ${contact.color}`} />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{contact.name}</h4>
                    <p className="text-lg font-bold text-gray-700 mb-3">{contact.number}</p>
                    <button
                      onClick={() => handleEmergencyCall(contact)}
                      className="btn btn-primary w-full"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Emergency Guidelines */}
          <div className="mt-8 grid grid-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  Stay calm and assess the situation
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  Call emergency services immediately
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  Provide clear location information
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  Follow instructions from emergency responders
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  Keep emergency contacts updated
                </li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Tips</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <Shield className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Keep emergency numbers saved in your phone
                </li>
                <li className="flex items-start">
                  <Shield className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Share your location with trusted contacts
                </li>
                <li className="flex items-start">
                  <Shield className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Keep important documents accessible
                </li>
                <li className="flex items-start">
                  <Shield className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Have a first aid kit ready
                </li>
                <li className="flex items-start">
                  <Shield className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  Know your local emergency procedures
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;
