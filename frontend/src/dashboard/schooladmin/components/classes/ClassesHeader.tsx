import React from 'react';
import { GraduationCap, BookOpen, Users, UserCheck } from 'lucide-react';
import { Level } from '@/shared/mocks/schooladmin/classes';

interface ClassesHeaderProps {
  levels: Level[];
}

export default function ClassesHeader({ levels }: ClassesHeaderProps) {
  // Calculate stats from levels and derived classes
  const totalLevels = levels.length;
  const totalGrades = levels.reduce((acc, level) => acc + level.grades.length, 0);
  const totalSubGrades = levels.reduce((acc, level) => 
    acc + level.grades.reduce((gradeAcc, grade) => gradeAcc + grade.subGrades.length, 0), 0
  );
  const totalCombinations = levels.reduce((acc, level) => 
    acc + level.grades.reduce((gradeAcc, grade) => gradeAcc + grade.combinations.length, 0), 0
  );
  
  // Calculate total derived classes (actual classes that will exist)
  const totalDerivedClasses = levels.reduce((acc, level) => {
    return acc + level.grades.reduce((gradeAcc, grade) => {
      const hasCombinations = grade.combinations.length > 0;
      const hasSubGrades = grade.subGrades.length > 0;
      
      if (hasCombinations && hasSubGrades) {
        // Generate both combination+subgrade classes AND combination-only classes
        return gradeAcc + (grade.combinations.length * grade.subGrades.length) + grade.combinations.length;
      } else if (hasCombinations) {
        // Grade + combination only
        return gradeAcc + grade.combinations.length;
      } else if (hasSubGrades) {
        // Grade + subgrade only
        return gradeAcc + grade.subGrades.length;
      } else {
        // Grade only
        return gradeAcc + 1;
      }
    }, 0);
  }, 0);
  
  // Estimate students (deterministic based on structure)
  const totalStudentsAssigned = totalDerivedClasses * 25; // Average 25 per derived class

  const stats = [
    {
      title: 'Total Levels',
      value: totalLevels,
      icon: GraduationCap,
      color: 'text-brand-teal',
      bgColor: 'bg-brand-teal/20',
      description: 'Education levels'
    },
    {
      title: 'Total Grades',
      value: totalGrades,
      icon: BookOpen,
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/20',
      description: 'Academic grades'
    },
    {
      title: 'Total Classes',
      value: totalDerivedClasses,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      description: 'Derived classes'
    },
    {
      title: 'Students Assigned',
      value: totalStudentsAssigned,
      icon: UserCheck,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      description: 'Total enrollment'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Classes Management</h1>
        <p className="text-white/70">
          Manage education levels, grades, and class sections
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl p-6 hover:bg-white/20 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              
              <div>
                <p className="text-2xl font-bold text-white mb-1">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-white/90 mb-1">{stat.title}</p>
                <p className="text-xs text-white/60">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}