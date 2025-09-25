import React, { useState } from 'react';
import { User } from '../App';
import { 
  Search, 
  Filter, 
  FileText, 
  ShoppingBag, 
  Users,
  Calendar,
  Sparkles,
  Clock,
  TrendingUp,
  BookOpen
} from 'lucide-react';

interface SearchSystemProps {
  user: User;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'document' | 'marketplace' | 'group' | 'event';
  content: string;
  relevance: number;
  source: string;
  date: string;
  metadata?: any;
}

const SearchSystem: React.FC<SearchSystemProps> = ({ user }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const searchSuggestions = [
    'Data Structures Assignment',
    'Operating Systems Notes',
    'Calculator for sale',
    'Study group for Database',
    'Computer Networks lab manual',
    'Java programming books',
    'Laptop accessories',
    'Upcoming exams schedule'
  ];

  const sampleResults: SearchResult[] = [
    {
      id: '1',
      title: 'Data Structures and Algorithms - Complete Notes',
      type: 'document',
      content: 'Comprehensive notes covering arrays, linked lists, trees, graphs, sorting algorithms, and time complexity analysis.',
      relevance: 95,
      source: user.groups[0],
      date: '2024-12-20',
      metadata: { fileSize: '2.3 MB', downloads: 127 }
    },
    {
      id: '2',
      title: 'Scientific Calculator - Casio FX-991ES',
      type: 'marketplace',
      content: 'Excellent condition scientific calculator perfect for engineering calculations. All functions working properly.',
      relevance: 92,
      source: 'Marketplace',
      date: '2024-12-19',
      metadata: { price: 800, condition: 'excellent' }
    },
    {
      id: '3',
      title: 'Advanced Database Study Group',
      type: 'group',
      content: 'Weekly study sessions for Database Management Systems. Covering SQL, NoSQL, normalization, and query optimization.',
      relevance: 88,
      source: 'Study Groups',
      date: '2024-12-18',
      metadata: { members: 15, nextMeeting: '2024-12-25' }
    },
    {
      id: '4',
      title: 'Computer Networks Mid-term Exam',
      type: 'event',
      content: 'Mid-term examination covering OSI model, TCP/IP, routing protocols, and network security fundamentals.',
      relevance: 85,
      source: 'Academic Calendar',
      date: '2024-12-25',
      metadata: { venue: 'Main Hall', duration: '3 hours' }
    }
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate AI search processing
    setTimeout(() => {
      const filteredResults = sampleResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           result.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || result.type === filterType;
        return matchesQuery && matchesType;
      });
      
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    
    if (value.trim()) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      handleSearch(value);
    } else {
      setSuggestions([]);
      setSearchResults([]);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'marketplace':
        return <ShoppingBag className="h-5 w-5 text-green-600" />;
      case 'group':
        return <Users className="h-5 w-5 text-purple-600" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-orange-600" />;
      default:
        return <Search className="h-5 w-5 text-gray-600" />;
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-blue-50 border-blue-200';
      case 'marketplace':
        return 'bg-green-50 border-green-200';
      case 'group':
        return 'bg-purple-50 border-purple-200';
      case 'event':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">AI-Powered Search</h1>
        <p className="text-gray-600 mt-2">Find documents, marketplace items, groups, and events instantly</p>
      </div>

      {/* Search Interface */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="relative mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <input
                type="text"
                placeholder="Ask AI anything about your college content..."
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
            
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(suggestion);
                      setSuggestions([]);
                      handleSearch(suggestion);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-2">
            {['all', 'document', 'marketplace', 'group', 'event'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  filterType === type
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All Results' : type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Searches */}
      {!query && (
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Popular Searches</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {searchSuggestions.slice(0, 6).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleQueryChange(suggestion)}
                  className="text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                    <span className="text-gray-700 group-hover:text-blue-700">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <p className="text-gray-600">
              Found <span className="font-medium text-gray-900">{searchResults.length}</span> results for "{query}"
            </p>
          </div>
          
          <div className="space-y-4">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className={`rounded-xl border-2 p-6 hover:shadow-md transition-all cursor-pointer ${getResultColor(result.type)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getResultIcon(result.type)}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{result.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <span className="capitalize font-medium">{result.type}</span>
                        <span>•</span>
                        <span>{result.source}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(result.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{result.relevance}% match</div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${result.relevance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{result.content}</p>
                
                {/* Metadata */}
                {result.metadata && (
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {result.type === 'document' && (
                      <>
                        <span>Size: {result.metadata.fileSize}</span>
                        <span>Downloads: {result.metadata.downloads}</span>
                      </>
                    )}
                    {result.type === 'marketplace' && (
                      <>
                        <span>Price: ₹{result.metadata.price}</span>
                        <span>Condition: {result.metadata.condition}</span>
                      </>
                    )}
                    {result.type === 'group' && (
                      <>
                        <span>Members: {result.metadata.members}</span>
                        <span>Next Meeting: {new Date(result.metadata.nextMeeting).toLocaleDateString()}</span>
                      </>
                    )}
                    {result.type === 'event' && (
                      <>
                        <span>Venue: {result.metadata.venue}</span>
                        <span>Duration: {result.metadata.duration}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {query && searchResults.length === 0 && !isSearching && (
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600 mb-4">Try different keywords or browse popular searches above</p>
          <button
            onClick={() => {
              setQuery('');
              setSearchResults([]);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchSystem;