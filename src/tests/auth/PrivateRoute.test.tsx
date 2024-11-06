import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import PrivateRoute from '../../components/auth/PrivateRoute';

const TestComponent = () => <div>Protected Content</div>;

describe('PrivateRoute', () => {
  it('redirects to login when not authenticated', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <TestComponent />
              </PrivateRoute>
            } />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders protected content for admin users', () => {
    const mockUser = {
      id: '1',
      role: 'admin',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      createdAt: new Date()
    };

    render(
      <BrowserRouter>
        <AuthProvider initialUser={mockUser}>
          <Routes>
            <Route path="/" element={
              <PrivateRoute roles={['admin']}>
                <TestComponent />
              </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects non-admin users from admin routes', () => {
    const mockUser = {
      id: '1',
      role: 'owner',
      email: 'owner@example.com',
      firstName: 'Owner',
      lastName: 'User',
      createdAt: new Date()
    };

    render(
      <BrowserRouter>
        <AuthProvider initialUser={mockUser}>
          <Routes>
            <Route path="/" element={
              <PrivateRoute roles={['admin']}>
                <TestComponent />
              </PrivateRoute>
            } />
            <Route path="/dashboard" element={<div>Dashboard</div>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});