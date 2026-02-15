import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  AlertCircle,
  Star,
  BookOpen
} from 'lucide-react';

export function OverviewView() {
  const children = [
    {
      name: 'Alice Uwimana',
      grade: 'Senior 3',
      progress: 85,
      status: 'excellent'
    },
    {
      name: 'Jean Baptiste Uwimana',
      grade: 'Senior 1', 
      progress: 78,
      status: 'good'
    }
  ];

  const recentActivity = [
    {
      child: 'Alice',
      activity: 'Completed Mathematics Assessment',
      score: '92%',
      time: '2 hours ago'
    },
    {
      child: 'Jean Baptiste',
      activity: 'Submitted Physics Lab Report',
      score: 'Pending',
      time: '1 day ago'
    },
    {
      child: 'Alice',
      activity: 'Attended Chemistry Class',
      score: 'Present',
      time: '2 days ago'
    }
  ];

  const upcomingEvents = [
    {
      event: 'Parent-Teacher Conference',
      child: 'Alice',
      date: 'Jan 15, 2025',
      time: '2:00 PM'
    },
    {
      event: 'Science Fair Presentation',
      child: 'Jean Baptiste',
      date: 'Jan 18, 2025',
      time: '10:00 AM'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="glass-card-elevated p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome to Your Parent Portal
        </h1>
        <p className="text-gray-600">
          Stay connected with your children's educational journey
        </p>
      </div>

      {/* Children Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child, index) => (
          <Card key={index} className="glass-card-interactive">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{child.name}</CardTitle>
                  <p className="text-sm text-gray-600">{child.grade}</p>
                </div>
                <div className="h-12 w-12 bg-brand-teal text-white rounded-full flex items-center justify-center font-medium">
                  {child.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span className="font-medium">{child.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand-teal h-2 rounded-full" 
                      style={{ width: `${child.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    child.status === 'excellent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {child.status}
                  </span>
                  <Button variant="ghost" size="sm" className="text-brand-teal">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-brand-accent" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="glass-card p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{activity.child}</h3>
                    <p className="text-sm text-gray-600">{activity.activity}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <span className="text-sm font-medium text-brand-teal">{activity.score}</span>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-brand-accent">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="glass-card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-brand-brown" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="glass-card p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{event.event}</h3>
                    <p className="text-sm text-gray-600">{event.child}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.date} at {event.time}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-brand-brown">
                    RSVP
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-4 text-brand-brown">
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="glass-button text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Progress
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <BookOpen className="h-4 w-4 mr-2" />
              Course Materials
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="glass-button-secondary">
              <AlertCircle className="h-4 w-4 mr-2" />
              Report Concern
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}