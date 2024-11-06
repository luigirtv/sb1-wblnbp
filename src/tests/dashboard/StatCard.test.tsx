import { render, screen } from '@testing-library/react';
import StatCard from '../../components/dashboard/StatCard';
import { TrendingUp } from 'lucide-react';

describe('StatCard Component', () => {
  it('renders with positive trend', () => {
    render(
      <StatCard
        title="Test Metric"
        value="100"
        icon={TrendingUp}
        trend={{ value: 15, isPositive: true }}
      />
    );
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('+15%')).toBeInTheDocument();
  });

  it('renders with negative trend', () => {
    render(
      <StatCard
        title="Test Metric"
        value="100"
        icon={TrendingUp}
        trend={{ value: 10, isPositive: false }}
      />
    );
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('renders without trend', () => {
    render(
      <StatCard
        title="Test Metric"
        value="100"
        icon={TrendingUp}
      />
    );
    
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });
});