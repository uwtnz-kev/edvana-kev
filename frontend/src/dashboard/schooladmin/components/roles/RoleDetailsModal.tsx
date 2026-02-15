import React from 'react';
import { X, Shield, Users, CheckCircle, Calendar, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Role {
  id: string;
  name: string;
  description: string;
  type: 'System' | 'Custom';
  status: 'Active' | 'Inactive';
  usersCount: number;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

interface RoleDetailsModalProps {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
}

// Mock assigned users for display
const mockAssignedUsers = [
  { id: '1', name: 'Sarah Mukamana', email: 'sarah.mukamana@school.edu', department: 'Mathematics' },
  { id: '2', name: 'Jean Claude Nzeyimana', email: 'jean.nzeyimana@school.edu', department: 'Science' },
  { id: '3', name: 'Marie Uwimana', email: 'marie.uwimana@school.edu', department: 'Languages' },
  { id: '4', name: 'Paul Habimana', email: 'paul.habimana@school.edu', department: 'Administration' },
  { id: '5', name: 'Grace Nyirahabimana', email: 'grace.nyirahabimana@school.edu', department: 'Guidance' },
];

// Permission mapping for display
const permissionLabels: Record<string, string> = {
  'users.manage': 'Manage Users',
  'settings.manage': 'Manage Settings',
  'reports.view': 'View Reports',
  'data.export': 'Export Data',
  'students.view': 'View Students',
  'grades.manage': 'Manage Grades',
  'classes.view': 'View Classes',
  'teachers.manage': 'Manage Teachers',
  'schedules.manage': 'Manage Schedules',
  'billing.manage': 'Manage Billing',
  'reports.financial': 'Financial Reports',
  'fees.manage': 'Manage Fees',
  'counseling.manage': 'Manage Counseling',
  'reports.student': 'Student Reports',
  'library.manage': 'Manage Library',
  'resources.view': 'View Resources',
  'system.maintain': 'System Maintenance',
  'users.support': 'User Support',
  'reports.technical': 'Technical Reports',
  'parents.manage': 'Manage Parents',
  'communications.send': 'Send Communications',
  'portal.admin': 'Portal Administration',
};

export default function RoleDetailsModal({ role, isOpen, onClose }: RoleDetailsModalProps) {
  const getStatusColor = (status: Role['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: Role['type']) => {
    switch (type) {
      case 'System': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Custom': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return isoString;
    }
  };

  // Get subset of users for this role (mock logic)
  const assignedUsers = mockAssignedUsers.slice(0, role.usersCount);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20 text-blue-900 max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-blue-900">
                {role.name}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`text-xs ${getTypeColor(role.type)}`}>
                  {role.type}
                </Badge>
                <Badge variant="outline" className={`text-xs ${getStatusColor(role.status)}`}>
                  {role.status}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-1">
            {/* Role Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Role Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-blue-900/70">Description</label>
                    <p className="text-blue-900 mt-1">{role.description}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-blue-900/70">Assigned Users</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4 text-brand-accent" />
                      <span className="text-blue-900 font-medium">{role.usersCount} users</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-blue-900/70">Created Date</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-brand-accent" />
                      <span className="text-blue-900">{formatDate(role.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-blue-900/70">Last Updated</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-brand-accent" />
                      <span className="text-blue-900">{formatDate(role.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Permissions</h3>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-blue-900/70">
                    {role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''} granted
                  </div>
                  <div className="text-xs text-blue-900/60 bg-blue-100/20 px-2 py-1 rounded-full">
                    View Only
                  </div>
                </div>
              </div>
              
              <PermissionMatrix
                selectedPermissions={role.permissions}
                onPermissionsChange={() => {}} // No-op for details view
                isReadOnly={true}
                roleType={role.type}
              />
            </div>

            {/* Assigned Users */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Assigned Users</h3>
                <div className="text-sm text-blue-900/70">
                  {assignedUsers.length} user{assignedUsers.length !== 1 ? 's' : ''} assigned
                </div>
              </div>
              
              {assignedUsers.length > 0 ? (
                <div className="space-y-4">
                  {/* Users as chips */}
                  <div className="flex flex-wrap gap-2">
                    {assignedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full border border-white/20 hover:bg-white/15 transition-colors"
                      >
                        <div className="w-6 h-6 bg-brand-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-brand-accent">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-blue-900">{user.name}</span>
                        <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-200">
                          Active
                        </Badge>
                      </div>
                    ))}
                  </div>

                  {/* Detailed user list */}
                  <div className="space-y-3">
                    {assignedUsers.map((user) => (
                      <div key={user.id} className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/15 transition-colors">
                        <div className="w-10 h-10 bg-brand-accent/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-brand-accent" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-blue-900">{user.name}</h4>
                            <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                              Active
                            </Badge>
                          </div>
                          <p className="text-sm text-blue-900/70">{user.email}</p>
                          <p className="text-xs text-blue-900/60">{user.department}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-blue-900/30 mx-auto mb-3" />
                  <p className="text-blue-900/70">No users assigned to this role</p>
                  <p className="text-sm text-blue-900/50 mt-1">Users can be assigned when editing this role</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4">
          <div className="flex justify-end">
            <Button
              onClick={onClose}
              className="bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}