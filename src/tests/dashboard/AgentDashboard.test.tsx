import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import AgentDashboard from '../../components/dashboard/AgentDashboard';

const mockUser = {
  id: '2',
  email: 'agent@example.com',
  firstName: 'Jane',
  lastName: 'Smith',
  role: 'agent',
  createdAt: new Date(),
  lastLogin: new Date()
};

describe('AgentDashboard Component', () => {
  const renderDashboard = () => {
    render(
      <BrowserRouter>
        <AuthProvider initialUser={mockUser}>
          <AgentDashboard />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders dashboard header and actions', () => {
    renderDashboard();
    
    expect(screen.getByText('Tableau de bord agent')).toBeInTheDocument();
    expect(screen.getByText('Nouvelle réservation')).toBeInTheDocument();
    expect(screen.getByText('Ajouter une tâche')).toBeInTheDocument();
  });

  it('displays operational metrics', () => {
    renderDashboard();
    
    expect(screen.getByText('Check-ins aujourd\'hui')).toBeInTheDocument();
    expect(screen.getByText('Messages non lus')).toBeInTheDocument();
    expect(screen.getByText('Tâches en attente')).toBeInTheDocument();
  });

  it('shows upcoming bookings', () => {
    renderDashboard();
    
    expect(screen.getByText('Check-ins aujourd\'hui')).toBeInTheDocument();
    expect(screen.getAllByText('Villa Sunset')[0]).toBeInTheDocument();
  });

  it('displays task list', () => {
    renderDashboard();
    
    expect(screen.getByText('Tâches')).toBeInTheDocument();
    expect(screen.getByText('Check-in Villa Sunset')).toBeInTheDocument();
  });
});