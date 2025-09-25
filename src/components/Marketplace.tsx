import React, { useState } from 'react';
import { User } from '../App';
import { 
  Search, 
  Filter, 
  Plus, 
  Heart,
  MessageCircle,
  MapPin,
  Clock,
  DollarSign,
  Eye
} from 'lucide-react';

interface MarketplaceProps {
  user: User;
}

interface MarketItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  seller: string;
  location: string;
  postedDate: string;
  images: string[];
  likes: number;
  views: number;
  isAvailable: boolean;
}

const Marketplace: React.FC<MarketplaceProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterCondition, setFilterCondition] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const items: MarketItem[] = [
    {
      id: '1',
      title: 'Scientific Calculator - Casio FX-991ES',
      description: 'Excellent condition scientific calculator, perfect for engineering students. All functions working properly.',
      price: 800,
      category: 'electronics',
      condition: 'excellent',
      seller: 'John Doe',
      location: 'Main Campus',
      postedDate: '2024-12-20',
      images: ['https://images.pexels.com/photos/6238302/pexels-photo-6238302.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'],
      likes: 12,
      views: 45,
      isAvailable: true
    },
    {
      id: '2',
      title: 'Computer Programming Textbooks Set',
      description: 'Complete set of programming books including C++, Java, and Data Structures. Minimal highlighting.',
      price: 1200,
      category: 'books',
      condition: 'good',
      seller: 'Jane Smith',
      location: 'Library Area',
      postedDate: '2024-12-19',
      images: ['https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'],
      likes: 8,
      views: 32,
      isAvailable: true
    },
    {
      id: '3',
      title: 'Laptop Stand - Adjustable',
      description: 'Portable aluminum laptop stand, adjustable height and angle. Great for ergonomic working.',
      price: 500,
      category: 'accessories',
      condition: 'like-new',
      seller: 'Mike Johnson',
      location: 'CS Department',
      postedDate: '2024-12-18',
      images: ['https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'],
      likes: 15,
      views: 67,
      isAvailable: false
    },
    {
      id: '4',
      title: 'Engineering Drawing Kit',
      description: 'Complete set with compass, rulers, protractor, and drawing board. Barely used.',
      price: 300,
      category: 'stationery',
      condition: 'excellent',
      seller: 'Sarah Wilson',
      location: 'Mechanical Block',
      postedDate: '2024-12-17',
      images: ['https://images.pexels.com/photos/8197558/pexels-photo-8197558.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'],
      likes: 6,
      views: 28,
      isAvailable: true
    }
  ];

  const categories = ['all', 'electronics', 'books', 'accessories', 'stationery', 'furniture', 'other'];
  const conditions = ['all', 'like-new', 'excellent', 'good', 'fair'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesCondition = filterCondition === 'all' || item.condition === filterCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Marketplace</h1>
          <p className="text-gray-600 mt-2">Buy, sell, and exchange items with fellow students</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 sm:mt-0 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>List Item</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div>
            <select
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {conditions.map(condition => (
                <option key={condition} value={condition}>
                  {condition === 'all' ? 'All Conditions' : condition.charAt(0).toUpperCase() + condition.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${!item.isAvailable ? 'opacity-60' : ''}`}>
            {/* Image */}
            <div className="relative">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              {!item.isAvailable && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">SOLD</span>
                </div>
              )}
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">{item.title}</h3>
                <div className="flex items-center text-green-600 font-bold text-lg ml-2">
                  <DollarSign className="h-4 w-4" />
                  <span>{item.price}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

              {/* Metadata */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="capitalize bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-medium">
                    {item.category}
                  </span>
                  <span className="capitalize bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                    {item.condition}
                  </span>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(item.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  By <span className="font-medium">{item.seller}</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{item.views}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4">
                <button 
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    item.isAvailable 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!item.isAvailable}
                >
                  {item.isAvailable ? 'Contact Seller' : 'Sold Out'}
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">List New Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter item title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-24"
                  placeholder="Describe your item"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">Select category</option>
                    {categories.filter(c => c !== 'all').map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Select condition</option>
                  {conditions.filter(c => c !== 'all').map(condition => (
                    <option key={condition} value={condition}>
                      {condition.charAt(0).toUpperCase() + condition.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Main Campus, Library"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <p className="text-gray-600">Drag and drop images here, or click to browse</p>
                  <input type="file" multiple accept="image/*" className="hidden" />
                </div>
              </div>
              <div className="flex space-x-4 pt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  List Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or be the first to list an item</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;