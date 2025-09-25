import React, { useState } from 'react';
import { User } from '../App';
import { 
  Upload, 
  FileText, 
  Filter, 
  Search, 
  Calendar,
  Edit3,
  Download,
  Trash2,
  Eye,
  Plus
} from 'lucide-react';

interface DocumentationProps {
  user: User;
}

interface Document {
  id: string;
  title: string;
  type: string;
  group: string;
  uploadDate: string;
  size: string;
  tags: string[];
  isEditable: boolean;
}

const Documentation: React.FC<DocumentationProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterGroup, setFilterGroup] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const documents: Document[] = [
    {
      id: '1',
      title: 'Data Structures Assignment 3',
      type: 'assignment',
      group: user.groups[0],
      uploadDate: '2024-12-20',
      size: '2.5 MB',
      tags: ['algorithms', 'trees', 'graphs'],
      isEditable: true
    },
    {
      id: '2',
      title: 'Operating Systems Study Notes',
      type: 'notes',
      group: user.groups[1],
      uploadDate: '2024-12-19',
      size: '1.8 MB',
      tags: ['os', 'processes', 'memory'],
      isEditable: false
    },
    {
      id: '3',
      title: 'Database Lab Manual',
      type: 'manual',
      group: user.groups[0],
      uploadDate: '2024-12-18',
      size: '4.2 MB',
      tags: ['database', 'sql', 'lab'],
      isEditable: true
    },
    {
      id: '4',
      title: 'Computer Networks Presentation',
      type: 'presentation',
      group: user.groups[2],
      uploadDate: '2024-12-17',
      size: '8.5 MB',
      tags: ['networks', 'protocols', 'tcp'],
      isEditable: false
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesGroup = filterGroup === 'all' || doc.group === filterGroup;
    
    return matchesSearch && matchesType && matchesGroup;
  });

  const documentTypes = ['all', 'assignment', 'notes', 'manual', 'presentation'];
  const groups = ['all', ...user.groups];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documentation Hub</h1>
          <p className="text-gray-600 mt-2">Manage and organize your academic documents with AI assistance</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {documentTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Group Filter */}
          <div>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {groups.map(group => (
                <option key={group} value={group}>
                  {group === 'all' ? 'All Groups' : group}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{doc.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span className="capitalize">{doc.type}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Group: {doc.group}</p>
              <p className="text-sm text-gray-600">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {doc.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                </button>
                {doc.isEditable && (
                  <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                    <Edit3 className="h-4 w-4" />
                  </button>
                )}
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                {doc.isEditable ? (
                  <span className="flex items-center space-x-1">
                    <Edit3 className="h-3 w-3" />
                    <span>AI Editable</span>
                  </span>
                ) : (
                  <span>Read Only</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Document</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Drag and drop your file here, or click to browse</p>
                <input type="file" className="hidden" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Assignment</option>
                  <option>Notes</option>
                  <option>Manual</option>
                  <option>Presentation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {user.groups.map(group => (
                    <option key={group}>{group}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4 pt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload & Process with AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600">Try adjusting your search or filters, or upload a new document</p>
        </div>
      )}
    </div>
  );
};

export default Documentation;