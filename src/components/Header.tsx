import React from 'react';
import { User, NavigationTab } from '../App';
import { 
  BookOpen, 
  ShoppingBag, 
  Search, 
  Bell, 
  Home,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  user: User;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, activeTab, onTabChange, onLogout }) => {
  const navigationItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: Home },
    { id: 'docs' as NavigationTab, label: 'Documents', icon: BookOpen },
    { id: 'marketplace' as NavigationTab, label: 'Marketplace', icon: ShoppingBag },
    { id: 'search' as NavigationTab, label: 'AI Search', icon: Search },
    { id: 'notifications' as NavigationTab, label: 'Notifications', icon: Bell },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and College Info */}
          <div className="flex items-center space-x-3">
            <img 
              src={user.collegeLogo} 
              alt={user.college}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">CLIGS</h1>
              <p className="text-sm text-gray-600 truncate max-w-48">{user.college}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {user.class} - {user.branch}
              </p>
              <p className="text-xs text-gray-600">
                Sec: {user.section} | Sem: {user.semester}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex space-x-1 overflow-x-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;