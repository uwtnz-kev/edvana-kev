import React from 'react';
import { Package, BookOpen, Award, TrendingUp } from 'lucide-react';

export function EdvanaBankStats() {
  const stats = [
    {
      title: 'Total Resources',
      value: '156',
      icon: Package,
      color: 'blue',
      bgColor: 'bg-blue-500/20',
      iconColor: 'text-blue-400'
    },
    {
      title: 'Teaching Materials',
      value: '89',
      icon: BookOpen,
      color: 'green',
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-400'
    },
    {
      title: 'Assessments',
      value: '34',
      icon: Award,
      color: 'purple',
      bgColor: 'bg-purple-500/20',
      iconColor: 'text-purple-400'
    },
    {
      title: 'Shared This Week',
      value: '23',
      icon: TrendingUp,
      color: 'orange',
      bgColor: 'bg-orange-500/20',
      iconColor: 'text-orange-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.title} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center space-y-3">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto`}>
              <Icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-900">{stat.value}</div>
              <div className="text-sm text-blue-900/80 font-medium">{stat.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}