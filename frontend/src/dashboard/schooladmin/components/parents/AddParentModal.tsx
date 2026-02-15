import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';
import { useToast } from '@/hooks/use-toast';
import { Parent, MockParentStore, mockStudents, Student } from '@/shared/mocks/schooladmin/mockData';

// Validation schema
const parentSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(40, 'First name must not exceed 40 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(40, 'Last name must not exceed 40 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid international phone number').regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid international phone number'),
  nationalIdOrPassport: z.string().optional(),
  address: z.object({
    city: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  status: z.enum(['Active', 'Archived']),
  studentIds: z.array(z.string()).default([]),
});

type ParentFormData = z.infer<typeof parentSchema>;

interface AddParentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editParent?: Parent | null;
  onSuccess: (parent: Parent) => void;
  onCancel: () => void;
}

export default function AddParentModal({
  open,
  onOpenChange,
  editParent,
  onSuccess,
  onCancel
}: AddParentModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const { toast } = useToast();

  const form = useForm<ParentFormData>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationalIdOrPassport: '',
      address: {
        city: '',
        country: ''
      },
      status: 'Active',
      studentIds: [],
    },
  });

  // Update form when editParent changes
  useEffect(() => {
    if (editParent) {
      form.reset({
        firstName: editParent.firstName,
        lastName: editParent.lastName,
        email: editParent.email,
        phone: editParent.phone,
        nationalIdOrPassport: editParent.nationalIdOrPassport || '',
        address: {
          city: editParent.address?.city || '',
          country: editParent.address?.country || ''
        },
        status: editParent.status,
        studentIds: editParent.studentIds,
      });
    } else {
      form.reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationalIdOrPassport: '',
        address: {
          city: '',
          country: ''
        },
        status: 'Active',
        studentIds: [],
      });
    }
  }, [editParent, form]);

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(mockStudents);
    } else {
      const filtered = mockStudents.filter(student =>
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.grade.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm]);

  const selectedStudentIds = form.watch('studentIds');

  const handleStudentToggle = (studentId: string) => {
    const currentIds = form.getValues('studentIds');
    if (currentIds.includes(studentId)) {
      form.setValue('studentIds', currentIds.filter(id => id !== studentId));
    } else {
      form.setValue('studentIds', [...currentIds, studentId]);
    }
  };

  const getSelectedStudents = () => {
    return mockStudents.filter(student => selectedStudentIds.includes(student.id));
  };

  const handleSubmit = (data: ParentFormData) => {
    try {
      const parentData = {
        ...data,
        address: (data.address?.city || data.address?.country) ? data.address : undefined,
        nationalIdOrPassport: data.nationalIdOrPassport || undefined,
      };

      let result: Parent;
      if (editParent) {
        const updatedParent = MockParentStore.updateParent(editParent.id, parentData);
        if (!updatedParent) throw new Error('Failed to update parent');
        result = updatedParent;
      } else {
        result = MockParentStore.addParent(parentData);
      }

      onSuccess(result);
      handleClose();

      toast({
        title: editParent ? "Parent Updated" : "Parent Added",
        description: editParent 
          ? "The parent information has been successfully updated."
          : "The parent has been successfully added to the system.",
      });
    } catch (error) {
      console.error('Error saving parent:', error);
      toast({
        title: "Error",
        description: "Failed to save parent information. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    form.reset();
    setSearchTerm('');
    onCancel();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl bg-white/15 backdrop-blur-xl border border-white/20 text-white"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-white text-xl font-semibold">
            {editParent ? 'Edit Parent' : 'Add New Parent'}
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-white hover:bg-white/20 rounded-xl"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">First Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter first name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Last Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter last name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Phone Number *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="+250788123456"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* ID and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nationalIdOrPassport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">National ID / Passport</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter ID or passport number"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Status</FormLabel>
                    <FormControl>
                      <GlassSelect value={field.value} onValueChange={field.onChange}>
                        <GlassSelectTrigger>
                          <GlassSelectValue placeholder="Select status" />
                        </GlassSelectTrigger>
                        <GlassSelectContent>
                          <GlassSelectItem value="Active">Active</GlassSelectItem>
                          <GlassSelectItem value="Archived">Archived</GlassSelectItem>
                        </GlassSelectContent>
                      </GlassSelect>
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter city"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter country"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Children Selection */}
            <div className="space-y-4">
              <FormLabel className="text-white">Children (Students)</FormLabel>
              
              {/* Search Students */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                <Input
                  placeholder="Search students by name, number, or grade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60 rounded-xl"
                />
              </div>

              {/* Selected Students */}
              {selectedStudentIds.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm text-white/80">Selected Students:</div>
                  <div className="flex flex-wrap gap-2">
                    {getSelectedStudents().map((student) => (
                      <Badge
                        key={student.id}
                        variant="secondary"
                        className="bg-brand-accent/20 text-brand-accent border border-brand-accent/40 hover:bg-brand-accent/30"
                      >
                        {student.firstName} {student.lastName} ({student.grade})
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStudentToggle(student.id)}
                          className="ml-1 h-4 w-4 p-0 text-brand-accent hover:bg-brand-accent/20"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Students */}
              <div className="max-h-48 overflow-y-auto space-y-2 bg-white/5 rounded-xl p-3">
                {filteredStudents.length === 0 ? (
                  <div className="text-white/60 text-center py-4">
                    No students found matching your search.
                  </div>
                ) : (
                  filteredStudents.map((student) => {
                    const isSelected = selectedStudentIds.includes(student.id);
                    return (
                      <div
                        key={student.id}
                        onClick={() => handleStudentToggle(student.id)}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-brand-accent/20 border border-brand-accent/40' 
                            : 'bg-white/10 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        <div className="text-white">
                          <div className="font-medium">{student.firstName} {student.lastName}</div>
                          <div className="text-sm text-white/70">
                            {student.studentNumber} • {student.grade} - {student.class}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 bg-brand-accent rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="destructiveOutline"
                onClick={handleClose}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
                disabled={form.formState.isSubmitting}
              >
                <Plus className="w-4 h-4 mr-2" />
                {editParent ? 'Update Parent' : 'Add Parent'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}