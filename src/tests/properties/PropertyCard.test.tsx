import { render, screen } from '@testing-library/react';
import PropertyCard from '../../components/properties/PropertyCard';
import { Property } from '../../types';
import { Users, Wifi, Home } from 'lucide-react';

const mockProperty: Property = {
  id: '1',
  title: 'Villa Test',
  description: 'Belle villa pour test',
  address: '123 Test Street',
  price: 200,
  images: ['https://example.com/image.jpg'],
  status: 'available',
  ownerId: '1',
  managingAgents: ['1'],
  amenities: ['wifi', 'parking']
};

const amenityIcons = {
  wifi: Wifi,
  parking: Users,
  home: Home
};

describe('PropertyCard Component', () => {
  it('renders property information correctly', () => {
    render(<PropertyCard property={mockProperty} amenityIcons={amenityIcons} />);
    
    expect(screen.getByText('Villa Test')).toBeInTheDocument();
    expect(screen.getByText('123 Test Street')).toBeInTheDocument();
    expect(screen.getByText('200€')).toBeInTheDocument();
  });

  it('displays correct status badge', () => {
    render(<PropertyCard property={mockProperty} amenityIcons={amenityIcons} />);
    
    expect(screen.getByText('Disponible')).toBeInTheDocument();
    expect(screen.getByText('Disponible')).toHaveClass('bg-green-100');
  });

  it('renders amenities with icons', () => {
    render(<PropertyCard property={mockProperty} amenityIcons={amenityIcons} />);
    
    expect(screen.getByText('Wifi')).toBeInTheDocument();
    expect(screen.getByText('Parking')).toBeInTheDocument();
  });
});