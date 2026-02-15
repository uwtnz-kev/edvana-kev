import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Form validation schema
const addSubjectSchema = z.object({
  name: z.string()
    .min(2, 'Subject name must be at least 2 characters')
    .max(60, 'Subject name must not exceed 60 characters'),
  code: z.string()
    .max(12, 'Subject code must not exceed 12 characters')
    .optional()
    .or(z.literal('')),
  classes: z.array(z.string())
    .min(1, 'Please select at least one class'),
  teacherName: z.string().optional(),
  status: z.string()
    .min(1, 'Please select a status'),
});

type AddSubjectFormData = z.infer<typeof addSubjectSchema>;

interface AddSubjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AddSubjectFormData) => void;
}

// Available class options
const classOptions = [
  { value: 'P1 A', label: 'Primary 1 A' },
  { value: 'P1 B', label: 'Primary 1 B' },
  { value: 'P2 A', label: 'Primary 2 A' },
  { value: 'P2 B', label: 'Primary 2 B' },
  { value: 'P3 A', label: 'Primary 3 A' },
  { value: 'P3 B', label: 'Primary 3 B' },
  { value: 'P4 A', label: 'Primary 4 A' },
  { value: 'P4 B', label: 'Primary 4 B' },
  { value: 'P5 A', label: 'Primary 5 A' },
  { value: 'P5 B', label: 'Primary 5 B' },
  { value: 'P6 A', label: 'Primary 6 A' },
  { value: 'P6 B', label: 'Primary 6 B' },
  { value: 'S1 A', label: 'Secondary 1 A' },
  { value: 'S1 B', label: 'Secondary 1 B' },
  { value: 'S2 A', label: 'Secondary 2 A' },
  { value: 'S2 B', label: 'Secondary 2 B' },
  { value: 'S3 A', label: 'Secondary 3 A' },
  { value: 'S3 B', label: 'Secondary 3 B' },
  { value: 'S4 A', label: 'Secondary 4 A' },
  { value: 'S4 B', label: 'Secondary 4 B' },
  { value: 'S5 A', label: 'Secondary 5 A' },
  { value: 'S5 B', label: 'Secondary 5 B' },
  { value: 'S6 A', label: 'Secondary 6 A' },
  { value: 'S6 B', label: 'Secondary 6 B' },
];

const mockTeachers = [
  { value: 'Mr. Jean Baptiste Uwimana', label: 'Mr. Jean Baptiste Uwimana' },
  { value: 'Ms. Marie Claire Mukamana', label: 'Ms. Marie Claire Mukamana' },
  { value: 'Mr. Paul Nkubana', label: 'Mr. Paul Nkubana' },
  { value: 'Ms. Agnes Nyirahabimana', label: 'Ms. Agnes Nyirahabimana' },
  { value: 'Mr. Emmanuel Bizimana', label: 'Mr. Emmanuel Bizimana' },
  { value: 'Ms. Claudine Uwizeyimana', label: 'Ms. Claudine Uwizeyimana' },
  { value: 'Mr. David Habimana', label: 'Mr. David Habimana' },
  { value: 'Ms. Grace Mukandayisenga', label: 'Ms. Grace Mukandayisenga' },
];

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export default function AddSubjectModal({ open, onClose, onSubmit }: AddSubjectModalProps) {
  const { toast } = useToast();
  
  const form = useForm<AddSubjectFormData>({
    resolver: zodResolver(addSubjectSchema),
    defaultValues: {
      name: '',
      code: '',
      classes: [],
      teacherName: '',
      status: 'Active', // Default to Active
    },
  });

  const { handleSubmit, control, formState: { errors, isSubmitting }, reset } = form;

  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  // Reset form when modal opens
  React.useEffect(() => {
    if (open) {
      reset({
        name: '',
        code: '',
        classes: [],
        teacherName: '',
        status: 'Active',
      });
    }
  }, [open, reset]);

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (data: AddSubjectFormData) => {
    try {
      // Pass data to parent for processing
      onSubmit(data);
      
      // Show success toast
      toast({
        title: 'Subject created successfully!',
        description: `${data.name} has been added to the subjects list.`,
      });
      
      // Close modal and reset form
      handleCancel();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create subject. Please try again.",
      });
      console.error('Form submission error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-lg w-full mx-4"
        onKeyDown={handleKeyDown}
        aria-describedby="add-subject-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Add New Subject
          </DialogTitle>
          <p id="add-subject-description" className="text-white/80 text-sm">
            Create a new subject for the curriculum
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid gap-4">
              {/* Subject Name - Required */}
              <FormField
                control={control}
                name="subjectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Subject Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter subject name (2-60 characters)"
                        className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              {/* Subject Code - Optional */}
              <FormField
                control={control}
                name="subjectCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Subject Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter subject code (up to 12 characters)"
                        className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              {/* Description - Optional */}
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter subject description (up to 240 characters)"
                        className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20 resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              {/* Grade - Required */}
              <FormField
                control={control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Grade *
                    </FormLabel>
                    <GlassSelect onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <GlassSelectTrigger className="text-white data-[placeholder]:text-white/60">
                          <GlassSelectValue placeholder="Select grade level" />
                        </GlassSelectTrigger>
                      </FormControl>
                      <GlassSelectContent>
                        {mockGrades.map((grade) => (
                          <GlassSelectItem key={grade.value} value={grade.value}>
                            {grade.label}
                          </GlassSelectItem>
                        ))}
                      </GlassSelectContent>
                    </GlassSelect>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              {/* Teacher - Optional */}
              <FormField
                control={control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Teacher
                    </FormLabel>
                    <GlassSelect onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <GlassSelectTrigger className="text-white data-[placeholder]:text-white/60">
                          <GlassSelectValue placeholder="Select teacher (optional)" />
                        </GlassSelectTrigger>
                      </FormControl>
                      <GlassSelectContent>
                        {mockTeachers.map((teacher) => (
                          <GlassSelectItem key={teacher.value} value={teacher.value}>
                            {teacher.label}
                          </GlassSelectItem>
                        ))}
                      </GlassSelectContent>
                    </GlassSelect>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              {/* Status - Required */}
              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium">
                      Status *
                    </FormLabel>
                    <GlassSelect onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <GlassSelectTrigger className="text-white data-[placeholder]:text-white/60">
                          <GlassSelectValue placeholder="Select status" />
                        </GlassSelectTrigger>
                      </FormControl>
                      <GlassSelectContent>
                        {statusOptions.map((status) => (
                          <GlassSelectItem key={status.value} value={status.value}>
                            {status.label}
                          </GlassSelectItem>
                        ))}
                      </GlassSelectContent>
                    </GlassSelect>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-white/20">
              <Button
                type="button"
                variant="destructiveOutline"
                onClick={handleCancel}
                disabled={isSubmitting}
                aria-label="Cancel and close form"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 hover:text-brand-accent text-white rounded-xl px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Create subject"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isSubmitting ? 'Creating...' : 'Create Subject'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}