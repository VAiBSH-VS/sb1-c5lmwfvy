import React from 'react';
import { User } from '../App';
import { 
  FileText, 
  ShoppingBag, 
  Users, 
  Calendar,
  TrendingUp,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const quickStats = [
    { label: 'Total Documents', value: '127', icon: FileText, color: 'bg-blue-500' },
    { label: 'Active Groups', value: user.groups.length.toString(), icon: Users, color: 'bg-green-500' },
    { label: 'Marketplace Items', value: '23', icon: ShoppingBag, color: 'bg-purple-500' },
    { label: 'Pending Tasks', value: '8', icon: Clock, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { title: 'Assignment submission for Data Structures', time: '2 hours ago', type: 'document' },
    { title: 'New study material uploaded in OS group', time: '4 hours ago', type: 'group' },
    { title: 'Calculator listed in marketplace', time: '1 day ago', type: 'marketplace' },
    { title: 'Exam schedule updated', time: '2 days ago', type: 'notification' },
  ];

  const upcomingEvents = [
    { title: 'Database Systems Mid-term', date: 'Tomorrow', time: '10:00 AM' },
    { title: 'Project Presentation', date: 'Dec 28', time: '2:00 PM' },
    { title: 'Group Study Session', date: 'Dec 30', time: '4:00 PM' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back to CLIGS!
            </h1>
            <p className="text-blue-100 text-lg">
              {user.class} - {user.branch} | Section {user.section} | Semester {user.semester}
            </p>
            <p className="text-blue-200 mt-2">
              Managing tasks for {user.college}
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">8.5</div>
              <div className="text-blue-200 text-sm">Productivity Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-blue-200 text-sm">Tasks This Week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1 text-sm font-medium">
                <span>View All</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'document' ? 'bg-blue-100' :
                    activity.type === 'group' ? 'bg-green-100' :
                    activity.type === 'marketplace' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    {activity.type === 'document' && <FileText className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'group' && <Users className="h-4 w-4 text-green-600" />}
                    {activity.type === 'marketplace' && <ShoppingBag className="h-4 w-4 text-purple-600" />}
                    {activity.type === 'notification' && <Calendar className="h-4 w-4 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events & Groups */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{event.date} at {event.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Your Groups */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Your Groups
            </h3>
            <div className="space-y-2">
              {user.groups.map((group, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <span className="text-sm font-medium text-gray-700">{group}</span>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs text-gray-500">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;