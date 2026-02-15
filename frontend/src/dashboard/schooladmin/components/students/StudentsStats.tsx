import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';
import { Student } from './types';

interface StudentsStatsProps {
  students: Student[];
}

export default function StudentsStats({ students }: StudentsStatsProps) {
  // Compute stats from actual student data
  const totalStudents = students.length;
  const activeStudents = students.filter(student => student.status === 'Active').length;
  const onLeaveStudents = students.filter(student => student.status === 'Inactive').length;
  
  // Calculate newly enrolled (last 30 days) - mock calculation based on enrollment date
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newlyEnrolled = students.filter(student => {
    const enrollmentDate = new Date(student.enrollmentDate);
    return enrollmentDate >= thirtyDaysAgo;
  }).length;

  const statCards = [
    {
      title: 'Total Students',
      value: totalStudents.toLocaleString(),
      icon: Users,
      iconColor: 'text-brand-teal',
      bgColor: 'bg-brand-teal/10',
    },
    {
      title: 'Active Students',
      value: activeStudents.toLocaleString(),
      icon: UserCheck,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'On Leave',
      value: onLeaveStudents.toLocaleString(),
      icon: UserX,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Newly Enrolled',
      value: newlyEnrolled.toLocaleString(),
      icon: UserPlus,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index}
            className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-900 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}