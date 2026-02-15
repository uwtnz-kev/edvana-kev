import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Server, 
  School, 
  Users, 
  BarChart3,
  Settings,
  Crown
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const sidebarItems = [
  { 
    icon: Home, 
    label: 'Overview', 
    href: '/dashboard/superadmin/overview' 
  },
  { 
    icon: Server, 
    label: 'System Management', 
    href: '/dashboard/superadmin/system' 
  },
  { 
    icon: School, 
    label: 'Schools', 
    href: '/dashboard/superadmin/schools' 
  },
  { 
    icon: Users, 
    label: 'User Management', 
    href: '/dashboard/superadmin/users' 
  },
  { 
    icon: BarChart3, 
    label: 'Global Analytics', 
    href: '/dashboard/superadmin/analytics' 
  },
  { 
    icon: Settings, 
    label: 'Platform Settings', 
    href: '/dashboard/superadmin/settings' 
  }
];

export function SuperAdminSidebar() {
  const location = useLocation();

  return (
    <div className="glass-sidebar h-full w-64 p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
          <Crown className="h-5 w-5 mr-2 text-brand-accent" />
          Super Admin
        </h2>
        <p className="text-sm text-gray-600">Platform-wide control</p>
      </div>
      
      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
            (item.href === '/dashboard/superadmin/overview' && location.pathname === '/dashboard/superadmin');
          
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