import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { BookOpen, Users, Plus } from 'lucide-react';

export function CoursesView() {
  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      level: 'Senior 3',
      students: 32,
      status: 'active',
      description: 'Comprehensive mathematics covering algebra, geometry, and calculus'
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      level: 'Senior 2',
      students: 28,
      status: 'active',
      description: 'Introduction to mechanics, electricity, and modern physics'
    },
    {
      id: 3,
      title: 'Chemistry Lab',
      level: 'Senior 4',
      students: 24,
      status: 'active',
      description: 'Practical chemistry experiments and laboratory techniques'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">Manage your courses and curriculum</p>
        </div>
        <Button className="glass-button text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="glass-card-interactive">
            <CardHeader>
              <div className="flex items-start justify-between">
                <BookOpen className="h-6 w-6 text-brand-teal" />
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {course.status}
                </span>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <p className="text-sm text-gray-600">{course.level}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students} students
                </div>
                <Button variant="outline" size="sm" className="glass-button-secondary">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}