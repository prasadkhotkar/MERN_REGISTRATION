import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import EditProfile from './components/pages/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './components/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
              <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-profile"
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
