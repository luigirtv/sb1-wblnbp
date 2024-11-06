import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, Users, DollarSign, Loader, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import AddPropertyModal from './AddPropertyModal';
import { Property } from '../../types';
import { useApi } from '../../hooks/useApi';
import { propertyService } from '../../services/api/properties';
import LoadingSpinner from '../common/LoadingSpinner';
import ApiErrorMessage from '../common/ApiErrorMessage';

const ITEMS_PER_PAGE = 6;

const amenityIcons = {
  parking: Users,
  pool: Users,
  gym: Users,
  wifi: Users,
  ac: Users,
};

export default function OwnerProperties() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    minPrice: '',
    maxPrice: '',
    amenities: [] as string[]
  });

  const {
    data: properties,
    isLoading,
    error,
    execute: fetchProperties
  } = useApi<Property[]>();

  const {
    data: metrics,
    isLoading: isLoadingMetrics,
    error: metricsError
  } = useApi<{
    totalRevenue: number;
    occupancyRate: number;
    performance: number;
  }>();

  useEffect(() => {
    fetchProperties(propertyService.getAll());
  }, []);

  const handleAddProperty = async (propertyData: Omit<Property, 'id'>) => {
    try {
      await propertyService.create(propertyData);
      fetchProperties(propertyService.getAll());
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  };

  const filteredProperties = properties?.filter(property => {
    if (filters.status && property.status !== filters.status) return false;
    if (filters.minPrice && property.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;
    if (filters.amenities.length > 0 && 
        !filters.amenities.every(amenity => property.amenities?.includes(amenity))) {
      return false;
    }
    return true;
  });

  const totalPages = Math.ceil((filteredProperties?.length || 0) / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mes Propriétés</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une propriété
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Revenu total</p>
              <p className="text-2xl font-bold">
                {isLoadingMetrics ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  `${metrics?.totalRevenue?.toLocaleString('fr-FR')} €`
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Taux d'occupation</p>
              <p className="text-2xl font-bold">
                {isLoadingMetrics ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  `${metrics?.occupancyRate}%`
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Performance</p>
              <p className="text-2xl font-bold">
                {isLoadingMetrics ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  `${metrics?.performance >= 0 ? '+' : ''}${metrics?.performance}%`
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <PropertyFilters
            filters={filters}
            onFilterChange={setFilters}
            showProfitability={true}
          />
        </div>

        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <ApiErrorMessage error={error} className="mb-6" />
          ) : filteredProperties?.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune propriété trouvée
              </h3>
              <p className="text-gray-500">
                Commencez par ajouter votre première propriété ou ajustez vos filtres.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedProperties?.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    amenityIcons={amenityIcons}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {showAddModal && (
        <AddPropertyModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProperty}
        />
      )}
    </div>
  );
}