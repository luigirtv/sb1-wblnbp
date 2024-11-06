import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import AdminDashboard from '../../pages/admin/AdminDashboard';

const mockUser = {
  id: '3',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  createdAt: new Date(),
  lastLogin: new Date()
};

describe('AdminDashboard Component', () => {
  const renderDashboard = () => {
    render(
      <BrowserRouter>
        <AuthProvider initialUser={mockUser}>
          <AdminDashboard />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders dashboard header and actions', () => {
    renderDashboard();
    
    expect(screen.getByText('Administration')).toBeInTheDocument();
    expect(screen.getByText('Paramètres système')).toBeInTheDocument();
  });

  it('displays system metrics', () => {
    renderDashboard();
    
    expect(screen.getByText('Utilisateurs actifs')).toBeInTheDocument();
    expect(screen.getByText('Propriétés')).toBeInTheDocument();
    expect(screen.getByText('Taux d\'utilisation')).toBeInTheDocument();
  });

  it('shows user management section', () => {
    renderDashboard();
    
    expect(screen.getByText('Gestion des utilisateurs')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Rechercher...')).toBeInTheDocument();
  });

  it('displays activity log', () => {
    renderDashboard();
    
    expect(screen.getByText('Journal d\'activité')).toBeInTheDocument();
    expect(screen.getByText('Nouvel utilisateur inscrit')).toBeInTheDocument();
  });
});