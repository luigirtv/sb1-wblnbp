import React from 'react';
import { MapPin, Users, DollarSign, LucideIcon, ChevronRight } from 'lucide-react';
import { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
  amenityIcons: Record<string, LucideIcon>;
}

export default function PropertyCard({ property, amenityIcons }: PropertyCardProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    rented: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  };

  return (
    <div className="group bg-primary-bg rounded-lg shadow dark:shadow-gray-800 overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="relative h-48">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[property.status]
          }`}
        >
          {property.status === 'available' ? 'Disponible' :
           property.status === 'rented' ? 'Loué' : 'Maintenance'}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary-text">{property.title}</h3>
        
        <div className="mt-2 flex items-center text-sm text-secondary-text">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          {property.address}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-primary-text">
            <DollarSign className="h-5 w-5 text-secondary-text flex-shrink-0" />
            <span className="text-xl font-bold">{property.price}</span>
            <span className="text-secondary-text ml-1">/nuit</span>
          </div>
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {property.amenities.map(amenity => {
              const Icon = amenityIcons[amenity];
              return Icon ? (
                <div
                  key={amenity}
                  className="flex items-center px-2 py-1 bg-secondary-bg dark:bg-gray-700 rounded-full text-sm text-secondary-text transition-colors"
                >
                  <Icon className="h-4 w-4 mr-1 flex-shrink-0" />
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </div>
              ) : null;
            })}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button 
            className="inline-flex items-center text-accent hover:text-accent/80 text-sm font-medium transition-colors"
            aria-label={`Voir les détails de ${property.title}`}
          >
            Voir les détails
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}