import React, { useState } from 'react';
import { CheckSquare, Square, ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface PermissionCategory {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

// Permission data with exact groups specified
const permissionCategories: PermissionCategory[] = [
  {
    id: 'sidebar-navigation',
    name: 'Sidebar Navigation',
    description: 'Access to main navigation sections',
    permissions: [
      { id: 'nav.subjects', name: 'Subjects', description: 'Access subjects section in sidebar' },
      { id: 'nav.teachers', name: 'Teachers', description: 'Access teachers section in sidebar' },
      { id: 'nav.students', name: 'Students', description: 'Access students section in sidebar' },
      { id: 'nav.parents', name: 'Parents', description: 'Access parents section in sidebar' },
      { id: 'nav.classes', name: 'Classes', description: 'Access classes section in sidebar' },
      { id: 'nav.resources', name: 'Resources', description: 'Access resources section in sidebar' },
      { id: 'nav.support', name: 'Support', description: 'Access support section in sidebar' },
      { id: 'nav.settings', name: 'Settings', description: 'Access settings section in sidebar' },
    ]
  },
  {
    id: 'management',
    name: 'Management',
    description: 'Administrative management capabilities',
    permissions: [
      { id: 'management.add-edit-users', name: 'Add/Edit Users', description: 'Create and modify user accounts' },
      { id: 'management.assign-roles', name: 'Assign Roles', description: 'Assign and manage user roles' },
      { id: 'management.delete-records', name: 'Delete Records', description: 'Remove records from the system' },
    ]
  },
  {
    id: 'reports',
    name: 'Reports',
    description: 'Access to various reports and analytics',
    permissions: [
      { id: 'reports.download-student', name: 'Download Student Reports', description: 'Generate and download student reports' },
      { id: 'reports.download-teacher', name: 'Download Teacher Reports', description: 'Generate and download teacher reports' },
    ]
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'Advanced tools and features',
    permissions: [
      { id: 'tools.ai-tutor', name: 'AI Tutor', description: 'Access AI tutoring features' },
      { id: 'tools.analytics', name: 'Analytics', description: 'Access advanced analytics dashboard' },
    ]
  }
];

interface PermissionMatrixProps {
  selectedPermissions: string[];
  onPermissionsChange: (permissions: string[]) => void;
  isReadOnly?: boolean;
  roleType?: 'System' | 'Custom';
}

export default function PermissionMatrix({ 
  selectedPermissions, 
  onPermissionsChange, 
  isReadOnly = false,
  roleType = 'Custom'
}: PermissionMatrixProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const togglePermission = (permissionId: string) => {
    if (isReadOnly) return;
    
    onPermissionsChange(
      selectedPermissions.includes(permissionId)
        ? selectedPermissions.filter(id => id !== permissionId)
        : [...selectedPermissions, permissionId]
    );
  };

  const toggleCategoryPermissions = (category: PermissionCategory) => {
    if (isReadOnly) return;
    
    const categoryPermissionIds = category.permissions.map(p => p.id);
    const allSelected = categoryPermissionIds.every(id => selectedPermissions.includes(id));
    
    if (allSelected) {
      // Remove all category permissions
      onPermissionsChange(
        selectedPermissions.filter(id => !categoryPermissionIds.includes(id))
      );
    } else {
      // Add all category permissions
      const newPermissions = [...selectedPermissions];
      categoryPermissionIds.forEach(id => {
        if (!newPermissions.includes(id)) {
          newPermissions.push(id);
        }
      });
      onPermissionsChange(newPermissions);
    }
  };

  const getCategoryStatus = (category: PermissionCategory) => {
    const categoryPermissionIds = category.permissions.map(p => p.id);
    const selectedCount = categoryPermissionIds.filter(id => selectedPermissions.includes(id)).length;
    
    if (selectedCount === 0) return 'none';
    if (selectedCount === categoryPermissionIds.length) return 'all';
    return 'some';
  };

  return (
    <TooltipProvider>
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
      {/* System Role Info */}
      {roleType === 'System' && (
        <div className="flex items-center gap-3 p-3 mb-4 bg-blue-50/20 backdrop-blur-sm rounded-lg border border-blue-200/30">
          <Tooltip>
            <TooltipTrigger>
              <Lock className="w-4 h-4 text-blue-600" />
            </TooltipTrigger>
            <TooltipContent>
              <p>System role (view-only)</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-sm text-blue-900/80">
            This is a system role. Permissions are predefined and read-only.
          </p>
        </div>
      )}
      
      <div className="space-y-6">
        {permissionCategories.map((category) => {
          const status = getCategoryStatus(category);
          
          return (
            <div key={category.id} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-2 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => toggleCategoryPermissions(category)}
                    disabled={isReadOnly}
                    className={`p-0 h-auto text-blue-900 rounded focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 ${
                      isReadOnly ? 'cursor-default opacity-60' : 'hover:bg-white/20'
                    }`}
                    aria-label={`${status === 'all' ? 'Deselect' : 'Select'} all ${category.name} permissions`}
                  >
                    {status === 'all' ? (
                      <CheckSquare className="w-5 h-5 text-brand-accent" />
                    ) : status === 'some' ? (
                      <div className="w-5 h-5 bg-brand-accent/50 border-2 border-brand-accent rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-brand-accent rounded-sm" />
                      </div>
                    ) : (
                      <Square className="w-5 h-5 text-blue-900/50" />
                    )}
                  </Button>
                  
                  <div>
                    <h4 className="font-semibold text-blue-900">{category.name}</h4>
                    <p className="text-sm text-blue-900/70">{category.description}</p>
                  </div>
                </div>
                
                <div className="text-sm text-blue-900/70 font-medium">
                  {category.permissions.filter(p => selectedPermissions.includes(p.id)).length} / {category.permissions.length}
                </div>
              </div>

              {/* Category Permissions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.permissions.map((permission) => (
                  <div key={permission.id} className={`flex items-center gap-3 p-3 bg-white/5 rounded-lg transition-colors ${
                    isReadOnly ? 'cursor-default' : 'hover:bg-white/10'
                  }`}>
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                      disabled={isReadOnly}
                      className={`data-[state=checked]:bg-brand-accent data-[state=checked]:border-brand-accent focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 ${
                        isReadOnly ? 'opacity-60 cursor-default' : ''
                      }`}
                    />
                    
                    <Label
                      htmlFor={permission.id}
                      className={`text-sm font-medium text-blue-900 flex-1 ${
                        isReadOnly ? 'cursor-default opacity-75' : 'cursor-pointer'
                      }`}
                    >
                      {permission.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </TooltipProvider>
  );
}