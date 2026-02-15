import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Users, TrendingUp, BookOpen, Calendar } from 'lucide-react';

export function ChildrenView() {
  const children = [
    {
      id: 1,
      name: 'Alice Uwimana',
      grade: 'Senior 3',
      section: 'A',
      studentId: 'S3A001',
      progress: 85,
      attendance: 95,
      courses: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
      recentGrades: [
        { subject: 'Mathematics', grade: '92%', date: '2025-01-10' },
        { subject: 'Physics', grade: '88%', date: '2025-01-08' },
        { subject: 'Chemistry', grade: '95%', date: '2025-01-05' }
      ]
    },
    {
      id: 2,
      name: 'Jean Baptiste Uwimana',
      grade: 'Senior 1',
      section: 'B', 
      studentId: 'S1B045',
      progress: 78,
      attendance: 92,
      courses: ['Mathematics', 'English', 'Kinyarwanda', 'Geography'],
      recentGrades: [
        { subject: 'Mathematics', grade: '85%', date: '2025-01-09' },
        { subject: 'English', grade: '90%', date: '2025-01-07' },
        { subject: 'Geography', grade: '82%', date: '2025-01-06' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Children</h1>
        <p className="text-gray-600 mt-1">Detailed view of each child's academic journey</p>
      </div>

      <div className="space-y-8">
        {children.map((child) => (
          <Card key={child.id} className="glass-card-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-brand-teal text-white rounded-full flex items-center justify-center font-medium text-lg">
                    {child.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{child.name}</CardTitle>
                    <p className="text-gray-600">{child.grade} {child.section} • ID: {child.studentId}</p>
                  </div>
                </div>
                <Button className="glass-button text-white">
                  View Full Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Progress Overview */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-brand-teal" />
                    Academic Progress
                  </h3>
                  <div className="glass-card p-4 space-y-3">
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
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance</span>
                        <span className="font-medium">{child.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${child.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enrolled Courses */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-brand-accent" />
                    Enrolled Courses
                  </h3>
                  <div className="glass-card p-4">
                    <div className="space-y-2">
                      {child.courses.map((course, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{course}</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Grades */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-brand-brown" />
                    Recent Grades
                  </h3>
                  <div className="glass-card p-4">
                    <div className="space-y-3">
                      {child.recentGrades.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{grade.subject}</p>
                            <p className="text-xs text-gray-500">{new Date(grade.date).toLocaleDateString()}</p>
                          </div>
                          <span className="text-sm font-medium text-brand-teal">{grade.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions for this child */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="glass-button-secondary">
                    Message Teachers
                  </Button>
                  <Button variant="outline" size="sm" className="glass-button-secondary">
                    View Schedule
                  </Button>
                  <Button variant="outline" size="sm" className="glass-button-secondary">
                    Download Report
                  </Button>
                  <Button variant="outline" size="sm" className="glass-button-secondary">
                    Book Meeting
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}