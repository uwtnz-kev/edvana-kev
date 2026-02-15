import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from '@/components/ui/checkbox';
import { 
  GlassSelect, 
  GlassSelectContent, 
  GlassSelectItem, 
  GlassSelectTrigger, 
  GlassSelectValue 
} from "../ui/GlassSelect";
import { Subject } from './types';
import { useToast } from "@/hooks/use-toast";

// Zod validation schema for simplified subject model
const subjectSchema = z.object({
  name: z.string()
    .min(2, 'Subject name must be at least 2 characters')
    .max(100, 'Subject name must be less than 100 characters'),
  code: z.string()
    .max(12, 'Subject code must be less than 12 characters')
    .optional(),
  classes: z.array(z.string())
    .min(1, 'Please select at least one class'),
  teacherName: z.string().optional(),
  status: z.enum(['Active', 'Inactive']),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface SubjectFormProps {
  open: boolean;
  mode: 'create' | 'edit';
  initial?: Subject;
  onClose: () => void;
  onSubmit: (data: SubjectFormData) => Promise<void> | void;
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

export default function SubjectForm({ open, mode, initial, onClose, onSubmit }: SubjectFormProps) {
  const { toast } = useToast();

  const form = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: '',
      code: '',
      classes: [],
      teacherName: 'none', // Use 'none' instead of empty string
      status: 'Active',
    }
  });

  const { handleSubmit, control, formState: { errors, isSubmitting }, reset, watch, setValue } = form;
  const selectedClasses = watch('classes');

  // Reset form when modal opens or initial data changes
  React.useEffect(() => {
    if (open) {
      if (initial) {
        reset({
          name: initial.name || '',
          code: initial.code || '',
          classes: initial.classes || [],
          teacherName: initial.teacherName || 'none',
          status: initial.status || 'Active',
        });
      } else {
        reset({
          name: '',
          code: '',
          classes: [],
          teacherName: 'none',
          status: 'Active',
        });
      }
    }
  }, [open, initial, reset]);

  const handleFormSubmit = async (data: SubjectFormData) => {
    try {
      // Convert 'none' back to empty string for teacher
      const processedData = {
        ...data,
        teacherName: data.teacherName === 'none' ? '' : data.teacherName
      };
      
      await onSubmit(processedData);
      
      toast({
        title: mode === 'create' ? 'Subject created' : 'Subject updated',
        description: `${data.name} has been ${mode === 'create' ? 'created' : 'updated'} successfully.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${mode} subject. Please try again.`,
      });
      console.error(`${mode} subject error:`, error);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleClassToggle = (classValue: string, checked: boolean) => {
    const currentClasses = selectedClasses || [];
    if (checked) {
      setValue('classes', [...currentClasses, classValue]);
    } else {
      setValue('classes', currentClasses.filter(c => c !== classValue));
    }
  };

  const title = mode === 'create' ? 'Create New Subject' : 'Edit Subject';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {title}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Subject Name */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">
                    Subject Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter subject name"
                      className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* Subject Code */}
            <FormField
              control={control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">
                    Subject Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter subject code (optional)"
                      className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60 focus:border-white/40 focus:bg-white/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* Classes Selection */}
            <FormField
              control={control}
              name="classes"
              render={() => (
                <FormItem>
                  <FormLabel className="text-white font-medium">
                    Classes *
                  </FormLabel>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 max-h-40 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {classOptions.map((classOption) => (
                        <div key={classOption.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={classOption.value}
                            checked={selectedClasses?.includes(classOption.value)}
                            onCheckedChange={(checked) => 
                              handleClassToggle(classOption.value, checked as boolean)
                            }
                            className="border-white/40 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                          />
                          <label
                            htmlFor={classOption.value}
                            className="text-sm text-white cursor-pointer"
                          >
                            {classOption.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* Teacher Assignment */}
            <FormField
              control={control}
              name="teacherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-medium">
                    Assigned Teacher
                  </FormLabel>
                  <GlassSelect onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <GlassSelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-blue-900 focus:border-white/40 focus:bg-white/20">
                        <GlassSelectValue placeholder="Select a teacher (optional)" />
                      </GlassSelectTrigger>
                    </FormControl>
                    <GlassSelectContent className="bg-white/20 backdrop-blur-xl border-white/30 rounded-xl">
                      <GlassSelectItem value="none">No teacher assigned</GlassSelectItem>
                      {mockTeachers.map((teacher) => (
                        <GlassSelectItem 
                          key={teacher.value} 
                          value={teacher.value}
                          className="text-white hover:bg-white/30 focus:bg-white/30"
                        >
                          {teacher.label}
                        </GlassSelectItem>
                      ))}
                    </GlassSelectContent>
                  </GlassSelect>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* Status */}
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
                      <GlassSelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-blue-900 focus:border-white/40 focus:bg-white/20">
                        <GlassSelectValue placeholder="Select status" />
                      </GlassSelectTrigger>
                    </FormControl>
                    <GlassSelectContent className="bg-white/20 backdrop-blur-xl border-white/30 rounded-xl">
                      <GlassSelectItem value="Active" className="text-white hover:bg-white/30 focus:bg-white/30">
                        Active
                      </GlassSelectItem>
                      <GlassSelectItem value="Inactive" className="text-white hover:bg-white/30 focus:bg-white/30">
                        Inactive
                      </GlassSelectItem>
                    </GlassSelectContent>
                  </GlassSelect>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <Button
                type="button"
                variant="destructiveOutline"
                onClick={handleCancel}
                className="rounded-xl"
                disabled={isSubmitting}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="rounded-xl transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Subject' : 'Update Subject'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}