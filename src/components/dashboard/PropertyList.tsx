import React from 'react';
import { MapPin, Users, DollarSign, Building } from 'lucide-react';

const properties = [
  {
    id: 1,
    name: 'Sunset Villa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&q=80',
    location: 'Miami Beach, FL',
    occupancy: '2/2',
    revenue: '$3,500/month',
    status: 'Occupied',
    amenities: ['Parking', 'Garden', 'Security']
  },
  {
    id: 2,
    name: 'Ocean View Apartment',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&w=350&q=80',
    location: 'Santa Monica, CA',
    occupancy: '1/2',
    revenue: '$2,800/month',
    status: 'Partially Occupied',
    amenities: ['Parking', 'Gym']
  },
  {
    id: 3,
    name: 'Mountain Lodge',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&w=350&q=80',
    location: 'Aspen, CO',
    occupancy: '0/1',
    revenue: '$0/month',
    status: 'Available',
    amenities: ['Parking', 'Garden']
  },
];

export default function PropertyList() {
  return (
    <div className="bg-primary-bg rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-primary-text">Recent Properties</h3>
          </div>
          <button className="text-accent hover:text-accent/80 text-sm font-medium">
            View All
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {properties.map((property) => (
          <div key={property.id} className="p-6 hover:bg-secondary-bg transition-colors">
            <div className="flex items-center space-x-4">
              <img
                src={property.image}
                alt={property.name}
                className="h-20 w-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-lg font-medium text-primary-text">{property.name}</h4>
                <div className="mt-1 flex items-center space-x-4 text-sm text-secondary-text">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {property.occupancy}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {property.revenue}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 text-xs font-medium bg-secondary-bg dark:bg-gray-700 text-secondary-text rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === 'Occupied'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : property.status === 'Partially Occupied'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}
              >
                {property.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}