import { User, Property } from '../../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date('2024-03-01')
  },
  {
    id: '2',
    email: 'owner@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'owner',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-03-01')
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Villa Sunset',
    description: 'Magnifique villa avec vue sur mer',
    address: '123 Rue de la Plage, 06400 Cannes',
    price: 350,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=1000&q=80'
    ],
    status: 'available',
    ownerId: '2',
    managingAgents: ['3'],
    amenities: ['parking', 'pool', 'garden']
  },
  {
    id: '2',
    title: 'Ocean View Apartment',
    description: 'Appartement moderne face à l\'océan',
    address: '45 Boulevard des Vagues, 64200 Biarritz',
    price: 200,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&w=1000&q=80'
    ],
    status: 'rented',
    ownerId: '2',
    managingAgents: ['3'],
    amenities: ['parking', 'balcony']
  }
];