import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ComplaintRegistration from './components/ComplaintRegistration';
import ServiceAppointments from './components/ServiceAppointments';
import DocumentRequests from './components/DocumentRequests';
import BillPayments from './components/BillPayments';
import EmergencyServices from './components/EmergencyServices';
import EmploymentWelfare from './components/EmploymentWelfare';
import ProfileManagement from './components/ProfileManagement';
import AIChatbot from './components/AIChatbot';
import ServiceStatus from './components/ServiceStatus';
import Notifications from './components/Notifications';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const addNotification = (notification) => {
    setNotifications(prev => {
      // Check if notification already exists to prevent duplicates
      const exists = prev.some(n => n.message === notification.message && n.time === notification.time);
      if (exists) return prev;
      return [...prev, notification];
    });
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar user={user} onLogout={handleLogout} notifications={notifications} />}
        
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard user={user} addNotification={addNotification} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/complaints" 
            element={
              isAuthenticated ? 
              <ComplaintRegistration user={user} addNotification={addNotification} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/appointments" 
            element={
              isAuthenticated ? 
              <ServiceAppointments user={user} addNotification={addNotification} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/documents" 
            element={
              isAuthenticated ? 
              <DocumentRequests user={user} addNotification={addNotification} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/payments" 
            element={
              isAuthenticated ? 
              <BillPayments user={user} addNotification={addNotification} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/emergency" 
            element={
              isAuthenticated ? 
              <EmergencyServices user={user} addNotification={addNotification} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/employment" 
            element={
              isAuthenticated ? 
              <EmploymentWelfare user={user} addNotification={addNotification} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/profiles" 
            element={
              isAuthenticated ? 
              <ProfileManagement user={user} addNotification={addNotification} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/status" 
            element={
              isAuthenticated ? 
              <ServiceStatus user={user} addNotification={addNotification} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/notifications" 
            element={
              isAuthenticated ? 
              <Notifications user={user} notifications={notifications} setNotifications={setNotifications} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route 
            path="/chatbot" 
            element={
              isAuthenticated ? 
              <AIChatbot user={user} /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
