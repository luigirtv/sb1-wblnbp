import { render, screen } from '@testing-library/react';
import ActivityLog from '../../components/admin/ActivityLog';

describe('ActivityLog', () => {
  it('renders activity log entries', () => {
    render(<ActivityLog />);
    
    expect(screen.getByText('Journal d\'activité')).toBeInTheDocument();
    expect(screen.getByText('Nouvel utilisateur inscrit')).toBeInTheDocument();
  });

  it('displays view all activities button', () => {
    render(<ActivityLog />);
    
    expect(screen.getByText('Voir toutes les activités')).toBeInTheDocument();
  });
});