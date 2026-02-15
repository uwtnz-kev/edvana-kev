import React, { useState } from 'react';
import { X, Shield, Save, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PermissionMatrix from './PermissionMatrix';

// Mock existing role names for uniqueness validation
const existingRoleNames = [
  'School Administrator',
  'Teacher',
  'Department Head',
  'Finance Manager',
  'Student Counselor',
  'Librarian',
  'IT Support',
  'Parent Portal Manager'
];

// Create schema factory to handle edit mode properly
const createRoleSchema = (currentRoleName?: string) => z.object({
  name: z.string()
    .min(3, 'Role name must be at least 3 characters')
    .max(30, 'Role name must be less than 30 characters')
    .refine((name) => {
      // Exclude current role name in edit mode
      if (currentRoleName && name === currentRoleName) return true;
      return !existingRoleNames.includes(name);
    }, 'A role with this name already exists'),
  description: z.string()
    .max(200, 'Description must be less than 200 characters')
    .optional(),
  status: z.boolean(),
});

type RoleFormData = z.infer<ReturnType<typeof createRoleSchema>>;

interface Role {
  id?: string;
  name: string;
  description: string;
  type?: 'System' | 'Custom';
  status: 'Active' | 'Inactive';
  permissions: string[];
}

interface RoleModalProps {
  role?: Role | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: Role) => void;
}

export default function RoleModal({ role, isOpen, onClose, onSave }: RoleModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role?.permissions || []);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check if trying to edit a system role
  const isEditingSystemRole = role && role.type === 'System';

  React.useEffect(() => {
    // If trying to edit a system role, close modal immediately
    if (isOpen && isEditingSystemRole) {
      onClose();
    }
  }, [isOpen, isEditingSystemRole, onClose]);

  const roleSchema = createRoleSchema(role?.name);
  
  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name || '',
      description: role?.description || '',
      status: role?.status === 'Active' || (!role), // Default to Active for new roles
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        name: role?.name || '',
        description: role?.description || '',
        status: role?.status === 'Active' || (!role), // Default to Active for new roles
      });
      setSelectedPermissions(role?.permissions || []);
    }
  }, [isOpen, role, form]);

  const handleSubmit = async (data: RoleFormData) => {
    if (selectedPermissions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one permission for this role.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const roleData: Role = {
        id: role?.id,
        name: data.name,
        description: data.description || '',
        status: data.status ? 'Active' : 'Inactive',
        permissions: selectedPermissions,
      };

      onSave(roleData);
      
      toast({
        title: role ? "Role Updated" : "Role Created",
        description: `Role "${data.name}" has been ${role ? 'updated' : 'created'} successfully.`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${role ? 'update' : 'create'} role. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setSelectedPermissions([]);
    onClose();
  };

  // Don't render modal for system role edits
  if (isEditingSystemRole) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/95 backdrop-blur-xl border-white/20 text-blue-900 max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="border-b border-white/20 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-accent" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-blue-900">
                  {role ? 'Edit Custom Role' : 'Create New Role'}
                </DialogTitle>
                <p className="text-sm text-blue-900/70 mt-1">
                  {role ? 'Update custom role details and permissions' : 'Define role details and assign permissions'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="text-blue-900 hover:bg-white/20 rounded-lg focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-1">
            {/* Basic Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-900 font-medium">Role Name *</Label>
                  <Input
                    id="name"
                    {...form.register('name')}
                    className="bg-white/20 border-white/20 text-blue-900 placeholder:text-blue-900/60 rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                    placeholder="Enter role name (3-30 characters, must be unique)"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-blue-900 font-medium">Description</Label>
                  <Textarea
                    id="description"
                    {...form.register('description')}
                    className="bg-white/20 border-white/20 text-blue-900 placeholder:text-blue-900/60 rounded-xl min-h-24 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                    placeholder="Describe the role's responsibilities and purpose (optional, max 200 characters)..."
                  />
                  {form.formState.errors.description && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-blue-900 font-medium">Status</Label>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="status"
                      checked={form.watch('status')}
                      onCheckedChange={(checked) => form.setValue('status', checked)}
                      className="data-[state=checked]:bg-brand-accent data-[state=unchecked]:bg-gray-200"
                    />
                    <span className="text-sm text-blue-900 font-medium">
                      {form.watch('status') ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs text-blue-900/60">
                    {form.watch('status') 
                      ? 'This role is active and can be assigned to users' 
                      : 'This role is inactive and cannot be assigned to users'
                    }
                  </p>
                  {form.formState.errors.status && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {form.formState.errors.status.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-900">Permissions</h3>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-blue-900/70">
                    {selectedPermissions.length} permission{selectedPermissions.length !== 1 ? 's' : ''} selected
                  </div>
                  {role?.type === 'System' && (
                    <div className="text-xs text-blue-900/60 bg-blue-100/20 px-2 py-1 rounded-full">
                      Read-only
                    </div>
                  )}
                </div>
              </div>
              
              <PermissionMatrix
                selectedPermissions={selectedPermissions}
                onPermissionsChange={setSelectedPermissions}
                isReadOnly={role?.type === 'System'}
                roleType={role?.type}
              />
            </div>
          </form>
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
              type="submit"
              onClick={form.handleSubmit(handleSubmit)}
              disabled={isLoading}
              className="bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : (role ? 'Update Role' : 'Create Role')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}