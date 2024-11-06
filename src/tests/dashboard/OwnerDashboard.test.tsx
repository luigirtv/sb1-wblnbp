import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import OwnerDashboard from '../../components/dashboard/OwnerDashboard';

const mockUser = {
  id: '1',
  email: 'owner@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'owner',
  createdAt: new Date(),
  lastLogin: new Date()
};

describe('OwnerDashboard Component', () => {
  const renderDashboard = () => {
    render(
      <BrowserRouter>
        <AuthProvider initialUser={mockUser}>
          <OwnerDashboard />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders dashboard header and actions', () => {
    renderDashboard();
    
    expect(screen.getByText('Tableau de bord propriétaire')).toBeInTheDocument();
    expect(screen.getByText('Ajouter une propriété')).toBeInTheDocument();
    expect(screen.getByText('Générer un rapport')).toBeInTheDocument();
  });

  it('displays key metrics', () => {
    renderDashboard();
    
    expect(screen.getByText('Revenus mensuels')).toBeInTheDocument();
    expect(screen.getByText('48 250 €')).toBeInTheDocument();
    expect(screen.getByText('Taux d\'occupation')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('shows property list', () => {
    renderDashboard();
    
    expect(screen.getByText('Villa Sunset')).toBeInTheDocument();
    expect(screen.getByText('Ocean View Apartment')).toBeInTheDocument();
  });

  it('displays revenue chart', () => {
    renderDashboard();
    
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument();
    // Check for chart elements
    expect(screen.getByRole('graphics-document')).toBeInTheDocument();
  });
});