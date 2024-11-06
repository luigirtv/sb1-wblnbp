import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter,
  FolderOpen,
  Tag,
  Clock,
  ChevronDown,
  MoreVertical,
  Download,
  Edit,
  Trash,
  Eye
} from 'lucide-react';
import { Document } from '../types';

const categories = [
  { id: 'property', label: 'Propriétés', icon: FolderOpen },
  { id: 'tenant', label: 'Locataires', icon: FileText },
  { id: 'financial', label: 'Documents Financiers', icon: FileText },
  { id: 'legal', label: 'Documents Légaux', icon: FileText },
  { id: 'maintenance', label: 'Maintenance', icon: FileText },
];

const sampleDocuments: Document[] = [
  {
    id: '1',
    title: 'Contrat de Location - Villa Sunset',
    description: 'Contrat de location pour la période 2024',
    type: 'contract',
    category: 'property',
    fileUrl: '/documents/contract-1.pdf',
    fileName: 'contract-1.pdf',
    fileSize: 2500000,
    mimeType: 'application/pdf',
    uploadedBy: 'agent1',
    uploadedAt: new Date('2024-01-15'),
    lastModified: new Date('2024-01-15'),
    propertyId: '1',
    permissions: {
      view: ['owner1', 'agent1'],
      edit: ['agent1']
    },
    tags: ['contrat', '2024', 'villa-sunset'],
    status: 'active',
    version: 1
  },
  // Add more sample documents as needed
];

export default function Documents() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredDocuments = sampleDocuments.filter(doc => 
    (!selectedCategory || doc.category === selectedCategory) &&
    (!searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-4 h-4 mr-2" />
          Nouveau Document
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Catégories</h2>
            </div>
            <div className="p-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Rechercher des documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Filter className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredDocuments.map(document => (
                <div
                  key={document.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3">
                      <FileText className="w-6 h-6 text-blue-500 mt-1" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {document.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {document.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="flex items-center text-xs text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            Modifié le {document.lastModified.toLocaleDateString()}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <Tag className="w-4 h-4 mr-1" />
                            {document.tags.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Download className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}