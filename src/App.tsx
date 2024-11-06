import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Properties from './pages/Properties';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <div className="flex h-screen bg-secondary-bg">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <Header />
                      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary-bg p-6">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/bookings" element={<Bookings />} />
                          <Route path="/properties" element={<Properties />} />
                          <Route path="/documents" element={<Documents />} />
                          <Route
                            path="/reports"
                            element={
                              <PrivateRoute roles={['owner', 'admin']}>
                                <Reports />
                              </PrivateRoute>
                            }
                          />
                          <Route path="/settings" element={<Settings />} />
                          <Route
                            path="/admin/*"
                            element={
                              <PrivateRoute roles={['admin']}>
                                <Routes>
                                  <Route path="/" element={<AdminDashboard />} />
                                  <Route path="users" element={<AdminDashboard />} />
                                  <Route path="settings" element={<AdminDashboard />} />
                                </Routes>
                              </PrivateRoute>
                            }
                          />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;