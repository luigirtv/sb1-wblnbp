import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import AdminDashboard from '../../pages/admin/AdminDashboard';

const mockUser = {
  id: '1',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  createdAt: new Date(),
  lastLogin: new Date()
};

describe('AdminDashboard', () => {
  it('renders admin dashboard', () => {
    render(
      <BrowserRouter>
        <AuthProvider initialUser={mockUser}>
          <AdminDashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Administration')).toBeInTheDocument();
    expect(screen.getByText('Paramètres système')).toBeInTheDocument();
  });

  it('displays system metrics', () => {
    render(
      <BrowserRouter>
        <AuthProvider initialUser={mockUser}>
          <AdminDashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Utilisateurs actifs')).toBeInTheDocument();
    expect(screen.getByText('Propriétés')).toBeInTheDocument();
    expect(screen.getByText('Taux d\'utilisation')).toBeInTheDocument();
  });
});