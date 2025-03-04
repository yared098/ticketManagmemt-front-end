import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import Routes instead of Switch
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import NotFound from './components/notfound'; 


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>  {/* Use Routes instead of Switch */}
          <Route path="/login" element={<Login />} />  {/* Use element prop */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Default route for undefined paths */}
          <Route path="*" element={<Login />} />  {/* Fallback route for all other paths */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
