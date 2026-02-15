import React, { useState, useMemo } from 'react';
import { Eye, Edit, Trash2, Search, Filter, Users, Shield, AlertTriangle, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';
import RoleModal from './RoleModal';
import RoleDetailsModal from './RoleDetailsModal';
import AssignUsersModal from './AssignUsersModal';

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

// Mock roles data
const mockRoles: Role[] = [
  {
    id: 'role-1',
    name: 'School Administrator',
    description: 'Full access to all school management features',
    type: 'System',
    status: 'Active',
    usersCount: 3,
    permissions: ['nav.subjects', 'nav.teachers', 'nav.students', 'nav.parents', 'nav.classes', 'nav.resources', 'nav.support', 'nav.settings', 'management.add-edit-users', 'management.assign-roles', 'management.delete-records', 'reports.download-student', 'reports.download-teacher', 'tools.ai-tutor', 'tools.analytics'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'role-2',
    name: 'Teacher',
    description: 'Access to teaching tools and student management',
    type: 'System',
    status: 'Active',
    usersCount: 24,
    permissions: ['nav.subjects', 'nav.students', 'nav.classes', 'reports.download-student'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T14:20:00Z'
  },
  {
    id: 'role-3',
    name: 'Department Head',
    description: 'Manage specific departments and their staff',
    type: 'Custom',
    status: 'Active',
    usersCount: 8,
    permissions: ['nav.teachers', 'nav.classes', 'management.add-edit-users', 'reports.download-teacher'],
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-20T16:45:00Z'
  },
  {
    id: 'role-4',
    name: 'Finance Manager',
    description: 'Access to financial records and billing',
    type: 'Custom',
    status: 'Active',
    usersCount: 2,
    permissions: ['nav.settings', 'reports.download-student', 'reports.download-teacher'],
    createdAt: '2024-01-08T11:30:00Z',
    updatedAt: '2024-01-18T13:20:00Z'
  },
  {
    id: 'role-5',
    name: 'Student Counselor',
    description: 'Access to student records and guidance tools',
    type: 'Custom',
    status: 'Active',
    usersCount: 5,
    permissions: ['nav.students', 'nav.parents', 'reports.download-student'],
    createdAt: '2024-01-10T14:00:00Z',
    updatedAt: '2024-01-22T09:10:00Z'
  },
  {
    id: 'role-6',
    name: 'Librarian',
    description: 'Manage library resources and student access',
    type: 'Custom',
    status: 'Active',
    usersCount: 3,
    permissions: ['nav.resources', 'nav.students'],
    createdAt: '2024-01-12T08:45:00Z',
    updatedAt: '2024-01-25T11:30:00Z'
  },
  {
    id: 'role-7',
    name: 'IT Support',
    description: 'Technical support and system maintenance',
    type: 'Custom',
    status: 'Inactive',
    usersCount: 2,
    permissions: ['nav.settings', 'management.add-edit-users', 'tools.analytics'],
    createdAt: '2024-01-15T10:20:00Z',
    updatedAt: '2024-01-28T15:40:00Z'
  },
  {
    id: 'role-8',
    name: 'Parent Portal Manager',
    description: 'Manage parent communications and portal access',
    type: 'Custom',
    status: 'Inactive',
    usersCount: 0,
    permissions: ['nav.parents', 'nav.support'],
    createdAt: '2024-01-20T13:15:00Z',
    updatedAt: '2024-01-30T12:00:00Z'
  }
];

interface RoleTableProps {
  onSystemRoleEditAttempt?: () => void;
}

export default function RoleTable({ onSystemRoleEditAttempt }: RoleTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignUsersModal, setShowAssignUsersModal] = useState(false);
  const [assigningRole, setAssigningRole] = useState<Role | null>(null);
  
  const { toast } = useToast();

  // Filter and search roles
  const filteredRoles = useMemo(() => {
    return mockRoles.filter(role => {
      const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           role.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || role.status === statusFilter;
      const matchesType = typeFilter === 'all' || role.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchQuery, statusFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoles = filteredRoles.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilter]);

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
      return new Date(isoString).toLocaleDateString();
    } catch (error) {
      return isoString;
    }
  };

  const handleView = (role: Role) => {
    setSelectedRole(role);
    setShowDetailsModal(true);
  };

  const handleEdit = (role: Role) => {
    // Only allow editing custom roles
    if (role.type === 'System') {
      onSystemRoleEditAttempt?.();
      return;
    }
    setEditingRole(role);
    setShowRoleModal(true);
  };

  const handleDelete = (role: Role) => {
    // Check if it's a system role - should not happen via UI but protect against URL/bugs
    if (role.type === 'System') {
      toast({
        title: "Cannot Delete System Role",
        description: "Cannot delete a system role.",
        variant: "destructive",
      });
      return;
    }
    setDeletingRole(role);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingRole) return;
    
    // Double-check that we're not deleting a system role (extra protection)
    if (deletingRole.type === 'System') {
      toast({
        title: "Cannot Delete System Role",
        description: "Cannot delete a system role.",
        variant: "destructive",
      });
      setShowDeleteModal(false);
      setDeletingRole(null);
      return;
    }
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Role Deleted",
        description: `Role "${deletingRole.name}" has been successfully deleted.`,
      });
      
      setShowDeleteModal(false);
      setDeletingRole(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveRole = (roleData: any) => {
    // Handle role save logic here - transform to full Role type if needed
    setShowRoleModal(false);
    setEditingRole(null);
    toast({
      title: "Role Saved",
      description: `Role "${roleData.name}" has been ${editingRole ? 'updated' : 'created'} successfully.`,
    });
  };

  const handleAssignUsers = (role: Role) => {
    setAssigningRole(role);
    setShowAssignUsersModal(true);
  };

  const handleUserAssignment = (roleId: string, userIds: string[]) => {
    // Handle user assignment logic here
    setShowAssignUsersModal(false);
    setAssigningRole(null);
  };

  return (
    <TooltipProvider>
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
          <Shield className="w-5 h-5 text-brand-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Role Management</h3>
          <p className="text-sm text-blue-900/70">
            {filteredRoles.length} role{filteredRoles.length !== 1 ? 's' : ''}
            {mockRoles.length !== filteredRoles.length && ` (${mockRoles.length} total)`}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="space-y-4 mb-6">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900/50 w-4 h-4" />
            <Input
              placeholder="Search roles by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/20 border-white/20 text-blue-900 placeholder:text-blue-900/60 rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
              aria-label="Search roles"
            />
          </div>
          
          <div className="flex gap-2">
            <GlassSelect value={statusFilter} onValueChange={setStatusFilter}>
              <GlassSelectTrigger className="w-36 bg-white/20 border-white/20 text-blue-900 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2">
                <Filter className="w-4 h-4 mr-2" />
                <GlassSelectValue placeholder="Status" className="text-blue-900" />
              </GlassSelectTrigger>
              <GlassSelectContent className="bg-white/20 border-white/20 backdrop-blur-xl">
                <GlassSelectItem value="all" className="text-blue-900 hover:bg-white/30">All Status</GlassSelectItem>
                <GlassSelectItem value="Active" className="text-blue-900 hover:bg-white/30">Active</GlassSelectItem>
                <GlassSelectItem value="Inactive" className="text-blue-900 hover:bg-white/30">Inactive</GlassSelectItem>
              </GlassSelectContent>
            </GlassSelect>

            <GlassSelect value={typeFilter} onValueChange={setTypeFilter}>
              <GlassSelectTrigger className="w-36 bg-white/20 border-white/20 text-blue-900 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2">
                <GlassSelectValue placeholder="Type" className="text-blue-900" />
              </GlassSelectTrigger>
              <GlassSelectContent className="bg-white/20 border-white/20 backdrop-blur-xl">
                <GlassSelectItem value="all" className="text-blue-900 hover:bg-white/30">All Types</GlassSelectItem>
                <GlassSelectItem value="System" className="text-blue-900 hover:bg-white/30">System</GlassSelectItem>
                <GlassSelectItem value="Custom" className="text-blue-900 hover:bg-white/30">Custom</GlassSelectItem>
              </GlassSelectContent>
            </GlassSelect>
          </div>
        </div>

        {/* Items per page */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-900/70">
            <span>Show</span>
            <GlassSelect value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <GlassSelectTrigger className="w-20 bg-white/20 border-white/20 text-blue-900 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2">
                <GlassSelectValue className="text-blue-900" />
              </GlassSelectTrigger>
              <GlassSelectContent className="bg-white/20 border-white/20 backdrop-blur-xl">
                <GlassSelectItem value="20" className="text-blue-900 hover:bg-white/30">20</GlassSelectItem>
                <GlassSelectItem value="50" className="text-blue-900 hover:bg-white/30">50</GlassSelectItem>
                <GlassSelectItem value="100" className="text-blue-900 hover:bg-white/30">100</GlassSelectItem>
              </GlassSelectContent>
            </GlassSelect>
            <span>items</span>
          </div>
          
          {filteredRoles.length > 0 && (
            <div className="text-sm text-blue-900/70">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredRoles.length)} of {filteredRoles.length}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      {paginatedRoles.length > 0 ? (
        <div className="space-y-2 min-w-full overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-3 text-sm font-medium text-blue-900/70 border-b border-white/20 min-w-[1200px]">
            <div className="col-span-2">Role Name</div>
            <div className="col-span-1">Type</div>
            <div className="col-span-3">Description</div>
            <div className="col-span-2">Assigned Users</div>
            <div className="col-span-2">Created Date</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Rows */}
          {paginatedRoles.map((role) => (
            <div
              key={role.id}
              className={`grid grid-cols-12 gap-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-colors min-w-[1200px] ${
                role.type === 'System' 
                  ? 'hover:bg-white/10' // Less aggressive hover for system roles
                  : 'hover:bg-white/15'
              }`}
            >
              <div className="col-span-2">
                <div className="flex items-center gap-2">
                  {role.type === 'System' && (
                    <Tooltip>
                      <TooltipTrigger>
                        <Lock className="w-4 h-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>System role (view-only)</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  <p 
                    className={`font-medium truncate ${
                      role.type === 'System' 
                        ? 'text-gray-500 cursor-default' 
                        : 'text-black'
                    }`} 
                    title={role.name}
                  >
                    {role.name}
                  </p>
                </div>
              </div>
              
              <div className="col-span-1">
                <Badge variant="outline" className={`text-xs ${getTypeColor(role.type)}`}>
                  {role.type}
                </Badge>
              </div>
              
              <div className="col-span-3">
                <p className="text-sm text-black/70" title={role.description}>
                  {role.description.length > 80 
                    ? `${role.description.substring(0, 80)}...` 
                    : role.description
                  }
                </p>
              </div>
              
              <div className="col-span-2">
                <Button
                  variant="ghost"
                  onClick={() => handleAssignUsers(role)}
                  className="flex items-center gap-1 h-auto p-1 text-blue-900 hover:text-white hover:bg-white/20 rounded-lg focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                  aria-label="Assign users to role"
                >
                  <Users className="w-4 h-4 text-blue-900/50" />
                  <span className="text-sm text-black/70">{role.usersCount} users</span>
                </Button>
              </div>
              
              <div className="col-span-2">
                <span className="text-sm text-black/70">{formatDate(role.createdAt)}</span>
              </div>
              
              <div className="col-span-1">
                <Badge variant="outline" className={`text-xs ${getStatusColor(role.status)}`}>
                  {role.status}
                </Badge>
              </div>
              
              <div className="col-span-1">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(role)}
                    className="h-8 w-8 p-0 text-blue-900 hover:text-white hover:bg-white/20 rounded-lg focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                    aria-label="View role details"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  {role.type === 'Custom' ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(role)}
                        className="h-8 w-8 p-0 text-blue-900 hover:text-white hover:bg-white/20 rounded-lg focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                        aria-label="Edit role"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(role)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-white hover:bg-red-500/20 rounded-lg focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                        aria-label="Delete role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    // System roles - show disabled Edit/Delete icons with tooltips
                    <>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-block">
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled
                              className="h-8 w-8 p-0 text-gray-400 cursor-not-allowed"
                              aria-label="Edit not allowed for system roles"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Not allowed on system roles</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="inline-block">
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled
                              className="h-8 w-8 p-0 text-gray-400 cursor-not-allowed"
                              aria-label="Delete not allowed for system roles"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Not allowed on system roles</p>
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 max-w-md mx-auto">
            <Shield className="w-16 h-16 text-blue-900/30 mx-auto mb-4" />
            <p className="text-blue-900/70 font-medium mb-2">No roles found</p>
            <p className="text-sm text-blue-900/50">
              {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                ? "Try adjusting your search or filters"
                : "Create your first custom role to get started"
              }
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-white/20 border-white/20 text-blue-900 hover:bg-white/30 hover:text-white disabled:opacity-50 rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
              aria-label="Go to previous page"
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={
                      currentPage === pageNum
                        ? "bg-brand-accent text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                        : "bg-white/20 border-white/20 text-blue-900 hover:bg-white/30 hover:text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                    }
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-white/20 border-white/20 text-blue-900 hover:bg-white/30 hover:text-white disabled:opacity-50 rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
              aria-label="Go to next page"
            >
              Next
            </Button>
          </div>
          
          <div className="text-sm text-blue-900/70">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}

      {/* Role Details Modal */}
      {showDetailsModal && selectedRole && (
        <RoleDetailsModal
          role={selectedRole}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedRole(null);
          }}
        />
      )}

      {/* Role Edit Modal */}
      {showRoleModal && (
        <RoleModal
          role={editingRole ? { 
            ...editingRole,
            type: editingRole.type as 'System' | 'Custom'
          } : null}
          isOpen={showRoleModal}
          onClose={() => {
            setShowRoleModal(false);
            setEditingRole(null);
          }}
          onSave={handleSaveRole}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingRole && (
        <Dialog open={showDeleteModal} onOpenChange={() => setShowDeleteModal(false)}>
          <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20 text-blue-900 max-w-md">
            <DialogHeader className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <DialogTitle className="text-xl font-semibold text-blue-900">
                Delete Role
              </DialogTitle>
              <DialogDescription className="text-blue-900/70 mt-2">
                Are you sure you want to delete "{deletingRole.name}"? This action cannot be undone.
                {deletingRole.usersCount > 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
                    Warning: This role is currently assigned to {deletingRole.usersCount} user{deletingRole.usersCount !== 1 ? 's' : ''}.
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                className="border-red-300 text-red-600 hover:bg-red-500/20 hover:text-red-700 rounded-xl focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Role
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Assign Users Modal */}
      {showAssignUsersModal && assigningRole && (
        <AssignUsersModal
          role={assigningRole}
          isOpen={showAssignUsersModal}
          onClose={() => {
            setShowAssignUsersModal(false);
            setAssigningRole(null);
          }}
          onAssign={handleUserAssignment}
        />
      )}

      {/* Bottom padding */}
      <div className="h-4"></div>
      </div>
    </TooltipProvider>
  );
}