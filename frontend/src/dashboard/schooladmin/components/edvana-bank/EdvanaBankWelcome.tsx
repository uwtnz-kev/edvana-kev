import React from 'react';
import { Package, BookOpen, Award, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function EdvanaBankWelcome() {
  const features = [
    {
      title: 'Teaching Materials',
      description: 'Upload and organize lesson plans, presentations, worksheets, and other teaching resources.',
      icon: BookOpen,
      color: 'blue',
      badgeClass: 'bg-blue-100/20 text-blue-700'
    },
    {
      title: 'Assessment Bank',
      description: 'Store and manage quizzes, tests, assignments, and grading rubrics for easy reuse.',
      icon: Award,
      color: 'purple',
      badgeClass: 'bg-purple-100/20 text-purple-700'
    },
    {
      title: 'Quality Resources',
      description: 'Rate, review, and share quality educational content with your teaching community.',
      icon: Star,
      color: 'orange',
      badgeClass: 'bg-orange-100/20 text-orange-700'
    }
  ];

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-12 h-12 text-blue-900/50" />
        </div>
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Welcome to Edvana Bank</h2>
        <p className="text-blue-900/70 mb-8 max-w-2xl mx-auto">
          Your centralized repository for educational resources, teaching materials, assessments, and more. 
          Build a comprehensive knowledge bank that grows with your institution.
        </p>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <Icon className={`w-8 h-8 text-${feature.color}-500 mx-auto mb-4`} />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-blue-900/70 mb-4">
                  {feature.description}
                </p>
                <Badge variant="secondary" className={feature.badgeClass}>
                  Coming Soon
                </Badge>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <Button 
            size="lg" 
            className="bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl px-8"
            disabled
          >
            Get Started with Edvana Bank
          </Button>
        </div>
      </div>
    </div>
  );
}