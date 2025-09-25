import React, { useState } from 'react';
import Header from './components/Header';
import CollegeSelection from './components/CollegeSelection';
import Dashboard from './components/Dashboard';
import Documentation from './components/Documentation';
import Marketplace from './components/Marketplace';
import SearchSystem from './components/SearchSystem';
import Notifications from './components/Notifications';

export type User = {
  college: string;
  collegeLogo: string;
  class: string;
  branch: string;
  section: string;
  semester: string;
  groups: string[];
};

export type NavigationTab = 'dashboard' | 'docs' | 'marketplace' | 'search' | 'notifications';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');

  const renderContent = () => {
    if (!user) {
      return <CollegeSelection onUserSetup={setUser} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'docs':
        return <Documentation user={user} />;
      case 'marketplace':
        return <Marketplace user={user} />;
      case 'search':
        return <SearchSystem user={user} />;
      case 'notifications':
        return <Notifications user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <Header 
          user={user} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          onLogout={() => setUser(null)}
        />
      )}
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;