import React, { useState, useMemo } from 'react';
import { X, Users, Search, UserCheck, UserX, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  currentRole: string;
  avatar?: string;
  status: 'Active' | 'Inactive';
}

interface Role {
  id: string;
  name: string;
  description: string;
}

interface AssignUsersModalProps {
  role: Role | null;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (roleId: string, userIds: string[]) => void;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Mukamana',
    email: 'sarah.mukamana@school.edu',
    department: 'Mathematics',
    currentRole: 'Teacher',
    status: 'Active'
  },
  {
    id: 'user-2',
    name: 'Jean Claude Nzeyimana',
    email: 'jean.nzeyimana@school.edu',
    department: 'Science',
    currentRole: 'Department Head',
    status: 'Active'
  },
  {
    id: 'user-3',
    name: 'Marie Uwimana',
    email: 'marie.uwimana@school.edu',
    department: 'Languages',
    currentRole: 'Teacher',
    status: 'Active'
  },
  {
    id: 'user-4',
    name: 'Paul Habimana',
    email: 'paul.habimana@school.edu',
    department: 'Administration',
    currentRole: 'Finance Manager',
    status: 'Active'
  },
  {
    id: 'user-5',
    name: 'Grace Nyirahabimana',
    email: 'grace.nyirahabimana@school.edu',
    department: 'Guidance',
    currentRole: 'Student Counselor',
    status: 'Active'
  },
  {
    id: 'user-6',
    name: 'David Mugisha',
    email: 'david.mugisha@school.edu',
    department: 'Library',
    currentRole: 'Librarian',
    status: 'Active'
  },
  {
    id: 'user-7',
    name: 'Agnes Mukandayisaba',
    email: 'agnes.mukandayisaba@school.edu',
    department: 'IT',
    currentRole: 'IT Support',
    status: 'Inactive'
  },
  {
    id: 'user-8',
    name: 'Eric Bizimungu',
    email: 'eric.bizimungu@school.edu',
    department: 'Languages',
    currentRole: 'Teacher',
    status: 'Active'
  }
];

export default function AssignUsersModal({ role, isOpen, onClose, onAssign }: AssignUsersModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedUsers([]);
      setSearchQuery('');
    }
  }, [isOpen]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    const activeUserIds = filteredUsers.filter(user => user.status === 'Active').map(user => user.id);
    
    if (selectedUsers.length === activeUserIds.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(activeUserIds);
    }
  };

  const handleAssign = async () => {
    if (!role) return;

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onAssign(role.id, selectedUsers);
      
      if (selectedUsers.length > 0) {
        toast({
          title: "Users Assigned",
          description: `Successfully assigned ${selectedUsers.length} user${selectedUsers.length !== 1 ? 's' : ''} to ${role.name}.`,
        });
      } else {
        toast({
          title: "Role Updated",
          description: `Role "${role.name}" saved without assigned users.`,
        });
      }

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedUsers([]);
    setSearchQuery('');
    onClose();
  };

  const activeUsers = filteredUsers.filter(user => user.status === 'Active');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20 text-blue-900 max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b border-white/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-blue-900">
                Assign Users to Role
              </DialogTitle>
              {role && (
                <p className="text-sm text-blue-900/70 mt-1">
                  Select users to assign to "{role.name}"
                </p>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 p-1">
            {/* Search and Selection Summary */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-900/50 w-4 h-4" />
                <Input
                  placeholder="Search users by name, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 border-white/20 text-blue-900 placeholder:text-blue-900/60 rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                  aria-label="Search users"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={toggleSelectAll}
                    className="bg-white/20 border-white/20 text-blue-900 hover:bg-white/30 hover:text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                  >
                    {selectedUsers.length === activeUsers.length ? (
                      <>
                        <UserX className="w-4 h-4 mr-2" />
                        Deselect All
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Select All
                      </>
                    )}
                  </Button>
                  
                  <div className="text-sm text-blue-900/70">
                    {selectedUsers.length} of {activeUsers.length} users selected
                  </div>
                </div>

                <div className="text-sm text-blue-900/70">
                  {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
                </div>
              </div>
            </div>

            {/* Users List */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 max-h-96 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                <div className="divide-y divide-white/20">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className={`p-4 hover:bg-white/15 transition-colors ${
                        user.status === 'Inactive' ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={user.id}
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                          disabled={user.status === 'Inactive'}
                          className="data-[state=checked]:bg-brand-accent data-[state=checked]:border-brand-accent focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                        />
                        
                        <div className="w-10 h-10 bg-brand-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-brand-accent">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-blue-900">{user.name}</h4>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                user.status === 'Active'
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : 'bg-gray-100 text-gray-800 border-gray-200'
                              }`}
                            >
                              {user.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-blue-900/70">{user.email}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-blue-900/60">{user.department}</span>
                            <span className="text-xs text-blue-900/60">Current: {user.currentRole}</span>
                          </div>
                        </div>

                        {selectedUsers.includes(user.id) && (
                          <div className="w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Users className="w-12 h-12 text-blue-900/30 mx-auto mb-3" />
                  <p className="text-blue-900/70">No users found</p>
                  <p className="text-sm text-blue-900/50">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-4">
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-red-300 text-red-600 hover:bg-red-500/20 hover:text-red-700 rounded-xl focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAssign}
              disabled={isLoading}
              className="bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 disabled:opacity-50"
            >
              <Users className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : selectedUsers.length > 0 ? `Assign ${selectedUsers.length} User${selectedUsers.length !== 1 ? 's' : ''}` : 'Save Role'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}