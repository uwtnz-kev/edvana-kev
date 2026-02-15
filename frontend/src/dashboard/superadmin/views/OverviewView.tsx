import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  School, 
  Users, 
  BookOpen, 
  TrendingUp,
  Server,
  AlertTriangle,
  Activity,
  Globe
} from 'lucide-react';

export function OverviewView() {
  const platformStats = [
    { title: 'Total Schools', value: '47', icon: School, color: 'text-brand-teal', change: '+3 this month' },
    { title: 'Total Users', value: '12,487', icon: Users, color: 'text-brand-accent', change: '+342 this week' },
    { title: 'Active Courses', value: '1,156', icon: BookOpen, color: 'text-brand-brown', change: '+89 this month' },
    { title: 'System Uptime', value: '99.9%', icon: Server, color: 'text-brand-primary', change: 'Last 30 days' }
  ];

  const systemHealth = [
    { component: 'Database', status: 'healthy', response: '12ms' },
    { component: 'API Gateway', status: 'healthy', response: '45ms' },
    { component: 'File Storage', status: 'warning', response: '156ms' },
    { component: 'Authentication', status: 'healthy', response: '23ms' }
  ];

  const recentActivity = [
    {
      title: 'New school "Nyanza Secondary School" registered',
      time: '2 hours ago',
      type: 'school'
    },
    {
      title: 'System backup completed successfully',
      time: '6 hours ago',
      type: 'system'
    },
    {
      title: 'Database optimization performed',
      time: '1 day ago',
      type: 'maintenance'
    },
    {
      title: 'Security patch deployed to all servers',
      time: '2 days ago',
      type: 'security'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glass-card-elevated p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Super Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Complete platform oversight and system administration
        </p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {platformStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="glass-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-brand-teal" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((system, index) => (
              <div key={index} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(system.status).replace('text-', 'bg-').replace('bg-bg-', 'bg-')}`}></div>
                  <span className="font-medium text-gray-900">{system.component}</span>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(system.status)}`}>
                    {system.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{system.response}</p>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-brand-teal">
              View Detailed Metrics
            </Button>
          </CardContent>
        </Card>

        {/* Recent Platform Activity */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-brand-accent" />
              Platform Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="glass-card p-3">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-brand-accent">
              View Activity Log
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Platform Administration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="glass-button text-white">
              <School className="h-4 w-4 mr-2" />
              Add School
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <Server className="h-4 w-4 mr-2" />
              System Status
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Security Alerts
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <TrendingUp className="h-4 w-4 mr-2" />
              Global Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}