import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { ClipboardCheck, Plus, Eye, Edit } from 'lucide-react';

export function AssessmentView() {
  const assessments = [
    {
      id: 1,
      title: 'Mathematics Unit Test',
      course: 'Advanced Mathematics',
      type: 'Quiz',
      status: 'active',
      submissions: 28,
      totalStudents: 32,
      dueDate: '2025-01-15'
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      course: 'Physics Fundamentals',
      type: 'Assignment',
      status: 'grading',
      submissions: 24,
      totalStudents: 28,
      dueDate: '2025-01-10'
    },
    {
      id: 3,
      title: 'Chemistry Practical Exam',
      course: 'Chemistry Lab',
      type: 'Exam',
      status: 'draft',
      submissions: 0,
      totalStudents: 24,
      dueDate: '2025-01-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'grading': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-600 mt-1">Create and manage student assessments</p>
        </div>
        <Button className="glass-button text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-center">
              <ClipboardCheck className="h-6 w-6 text-brand-teal mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Total Assessments</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 text-xs font-bold">5</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-600">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="h-6 w-6 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-yellow-600 text-xs font-bold">4</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-600">Grading</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-gray-600 text-xs font-bold">3</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Draft</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessments List */}
      <Card className="glass-card-elevated">
        <CardHeader>
          <CardTitle>Recent Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="glass-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900">{assessment.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(assessment.status)}`}>
                        {assessment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{assessment.course} • {assessment.type}</p>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(assessment.dueDate).toLocaleDateString()} • 
                      Submissions: {assessment.submissions}/{assessment.totalStudents}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="glass-button-secondary">
                      Grade
                    </Button>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand-teal h-2 rounded-full" 
                      style={{ 
                        width: `${(assessment.submissions / assessment.totalStudents) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}