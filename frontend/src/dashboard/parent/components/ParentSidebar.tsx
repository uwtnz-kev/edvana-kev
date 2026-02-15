import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  TrendingUp, 
  MessageCircle,
  Settings
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const sidebarItems = [
  { 
    icon: Home, 
    label: 'Overview', 
    href: '/dashboard/parent/overview' 
  },
  { 
    icon: Users, 
    label: 'My Children', 
    href: '/dashboard/parent/children' 
  },
  { 
    icon: TrendingUp, 
    label: 'Progress Reports', 
    href: '/dashboard/parent/progress' 
  },
  { 
    icon: MessageCircle, 
    label: 'Communication', 
    href: '/dashboard/parent/communication' 
  },
  { 
    icon: Settings, 
    label: 'Settings', 
    href: '/dashboard/parent/settings' 
  }
];

export function ParentSidebar() {
  const location = useLocation();

  return (
    <div className="glass-sidebar h-full w-64 p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Parent Portal</h2>
        <p className="text-sm text-gray-600">Monitor your child's journey</p>
      </div>
      
      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
            (item.href === '/dashboard/parent/overview' && location.pathname === '/dashboard/parent');
          
          return (
            <Link key={item.href} to={item.href}>
              <div
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive 
                    ? "glass-card-elevated text-brand-teal" 
                    : "text-gray-700 hover:glass-button-secondary hover:text-brand-teal"
                )}
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}