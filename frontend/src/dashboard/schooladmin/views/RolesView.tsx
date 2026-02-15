import React, { useState } from 'react';
import { Plus, Shield, Users, CheckCircle, Settings, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoleTable from '../components/roles/RoleTable';
import RoleModal from '../components/roles/RoleModal';

export default function RolesView() {
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showSystemRoleAlert, setShowSystemRoleAlert] = useState(false);

  const handleSaveRole = (roleData: any) => {
    // Handle role creation logic here
    setShowAddRoleModal(false);
  };

  // Mock statistics data
  const stats = [
    {
      title: 'Total Roles',
      value: '8',
      icon: Shield,
      description: 'Custom roles created',
      bgColor: 'bg-blue-500/20',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Assigned Users',
      value: '47',
      icon: Users,
      description: 'Staff with custom roles',
      bgColor: 'bg-green-500/20',
      iconColor: 'text-green-500'
    },
    {
      title: 'Active Roles',
      value: '6',
      icon: CheckCircle,
      description: 'Currently in use',
      bgColor: 'bg-brand-accent/20',
      iconColor: 'text-brand-accent'
    },
    {
      title: 'Permissions Used',
      value: '24',
      icon: Settings,
      description: 'Different access levels',
      bgColor: 'bg-purple-500/20',
      iconColor: 'text-purple-500'
    }
  ];

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-blue-900">Roles & Permissions</h1>
            <p className="text-blue-900/70 max-w-3xl">
              Manage custom roles and control feature access for staff members
            </p>
          </div>
          
          <Button 
            onClick={() => setShowAddRoleModal(true)}
            className="bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            aria-label="Add new role"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Role
          </Button>
        </div>

        {/* System Role Alert */}
        {showSystemRoleAlert && (
          <div className="bg-white/20 backdrop-blur-xl rounded-xl border-l-4 border-brand-accent border border-white/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <p className="text-blue-900 font-medium">
                  System roles cannot be modified.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSystemRoleAlert(false)}
                className="h-8 w-8 p-0 text-blue-900 hover:bg-white/20 rounded-lg"
                aria-label="Dismiss alert"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/25 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
                  <div className="text-sm font-medium text-blue-900 mb-1">{stat.title}</div>
                  <div className="text-xs text-blue-900/70">{stat.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Roles Table */}
        <RoleTable onSystemRoleEditAttempt={() => setShowSystemRoleAlert(true)} />

        {/* Add Role Modal */}
        {showAddRoleModal && (
          <RoleModal
            role={null}
            isOpen={showAddRoleModal}
            onClose={() => setShowAddRoleModal(false)}
            onSave={handleSaveRole}
          />
        )}
      </div>
    </div>
  );
}