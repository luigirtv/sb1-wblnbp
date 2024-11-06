import { render, screen } from '@testing-library/react';
import SystemMetrics from '../../components/admin/SystemMetrics';

describe('SystemMetrics', () => {
  it('renders system metrics chart', () => {
    render(<SystemMetrics />);
    
    expect(screen.getByText('Métriques système')).toBeInTheDocument();
    expect(screen.getByText('Charge CPU')).toBeInTheDocument();
    expect(screen.getByText('Utilisation mémoire')).toBeInTheDocument();
    expect(screen.getByText('Espace disque')).toBeInTheDocument();
  });

  it('displays current metrics values', () => {
    render(<SystemMetrics />);
    
    expect(screen.getByText('55%')).toBeInTheDocument();
    expect(screen.getByText('76%')).toBeInTheDocument();
    expect(screen.getByText('42%')).toBeInTheDocument();
  });
});