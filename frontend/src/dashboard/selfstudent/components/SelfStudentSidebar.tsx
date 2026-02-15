import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { 
  Home, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Settings,
  Award,
  Calendar,
  Users
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard/student', icon: Home },
  { name: 'Curriculum', href: '/dashboard/student/curriculum', icon: BookOpen },
  { name: 'Exams', href: '/dashboard/student/exams', icon: FileText },
  { name: 'Progress', href: '/dashboard/student/progress', icon: TrendingUp },
  { name: 'Achievements', href: '/dashboard/student/achievements', icon: Award },
  { name: 'Schedule', href: '/dashboard/student/schedule', icon: Calendar },
  { name: 'Study Groups', href: '/dashboard/student/groups', icon: Users },
  { name: 'Settings', href: '/dashboard/student/settings', icon: Settings },
];

export function SelfStudentSidebar() {
  const location = useLocation();

  return (
    <nav className="flex-1 space-y-1 px-3 lg:px-4">
      <div className="mb-4 lg:mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Student Portal
        </h2>
      </div>

      <div className="space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== '/dashboard/student' && location.pathname.startsWith(item.href));
          
          return (
            <Link key={item.name} to={item.href}>
              <div
                className={cn(
                  'group flex items-center px-2 lg:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300',
                  isActive
                    ? 'bg-brand-teal/20 backdrop-blur-sm text-brand-teal border border-brand-teal/30 shadow-md'
                    : 'text-gray-600 hover:bg-white/20 hover:backdrop-blur-sm hover:text-gray-900 hover:border hover:border-white/30'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-2 lg:mr-3 h-4 lg:h-5 w-4 lg:w-5 transition-colors duration-200',
                    isActive ? 'text-brand-teal' : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                <span className="truncate">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-white/20">
        <div className="px-2 lg:px-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Quick Stats
          </p>
          <div className="space-y-2 lg:space-y-3">
            <div className="glass-card-interactive p-2 lg:p-3">
              <div className="text-base lg:text-lg font-semibold text-brand-teal">8/12</div>
              <div className="text-xs text-gray-600">Courses</div>
            </div>
            <div className="glass-card-interactive p-2 lg:p-3">
              <div className="text-base lg:text-lg font-semibold text-brand-accent">87%</div>
              <div className="text-xs text-gray-600">Avg Score</div>
            </div>
            <div className="glass-card-interactive p-2 lg:p-3">
              <div className="text-base lg:text-lg font-semibold text-brand-brown">24</div>
              <div className="text-xs text-gray-600">Streak</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}