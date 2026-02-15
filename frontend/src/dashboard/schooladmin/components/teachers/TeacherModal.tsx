import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Plus, X, Upload, Download } from 'lucide-react';
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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  GlassSelect, 
  GlassSelectContent, 
  GlassSelectItem, 
  GlassSelectTrigger, 
  GlassSelectValue 
} from "../ui/GlassSelect";

import { Teacher, TeacherStatus, TeacherRole, TeacherSpecialization, TeacherQualification } from './types';
import { useToast } from "@/hooks/use-toast";
import { 
  generateTeacherCSVTemplate, 
  downloadCSVTemplate, 
  parseCSVFile, 
  validateTeacherCSV, 
  transformTeacherCSVData 
} from '../shared/CSVUploadUtils';

// Available options for new fields
const specializationOptions = [
  'Sciences', 'Languages', 'Arts', 'ICT', 'Humanities', 'Business', 'Sports'
] as const;

const qualificationOptions = [
  'Diploma', 'Bachelor', 'Postgraduate', 'Masters', 'PhD'
] as const;

const roleOptions = [
  'Teacher', 'Dean', 'HOD', 'Assistant Teacher', 'School Admin'
] as const;

// Updated Zod validation schema with all required fields
const teacherSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s']+$/, 'First name can only contain letters, spaces, and apostrophes'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s']+$/, 'Last name can only contain letters, spaces, and apostrophes'),
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  phone: z.string()
    .optional()
    .refine((val) => !val || (val.length >= 10 && val.length <= 15 && /^\+?\d[\d\s-()]+$/.test(val)), 
      'Please enter a valid phone number'),
  specialization: z.array(z.string())
    .min(1, 'Please select at least one specialization')
    .max(5, 'Please select no more than 5 specializations'),
  qualification: z.string()
    .min(1, 'Please select a qualification'),
  experience: z.coerce.number()
    .int('Experience must be a whole number')
    .min(0, 'Experience cannot be negative')
    .max(50, 'Experience cannot exceed 50 years'),
  role: z.string()
    .min(1, 'Please select a role'),
  status: z.nativeEnum(TeacherStatus, {
    errorMap: () => ({ message: 'Please select a valid status' })
  }),
});

type TeacherFormData = z.infer<typeof teacherSchema>;

interface TeacherModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  initial?: Teacher;
  onClose: () => void;
  onSubmit: (data: TeacherFormData) => Promise<void> | void;
}

export default function TeacherModal({ open, mode, initial, onClose, onSubmit }: TeacherModalProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCSVMode, setIsCSVMode] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  
  const form = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      firstName: initial?.firstName || '',
      lastName: initial?.lastName || '',
      email: initial?.email || '',
      phone: initial?.phone || '',
      specialization: [],
      qualification: '',
      experience: 0,
      role: '',
      status: initial?.status || TeacherStatus.ACTIVE,
    },
  });

  const { handleSubmit, control, formState: { errors, isSubmitting }, reset } = form;

  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Reset form when modal opens/closes or initial data changes
  React.useEffect(() => {
    if (open) {
      reset({
        firstName: initial?.firstName || '',
        lastName: initial?.lastName || '',
        email: initial?.email || '',
        phone: initial?.phone || '',
        specialization: [],
        qualification: '',
        experience: 0,
        role: '',
        status: initial?.status || TeacherStatus.ACTIVE,
      });
      setIsCSVMode(false);
      setCsvData([]);
    }
  }, [open, initial, reset]);

  // CSV Upload Handlers
  const handleDownloadTemplate = () => {
    const csvContent = generateTeacherCSVTemplate();
    downloadCSVTemplate('teacher_template.csv', csvContent);
    toast({
      title: 'Template downloaded',
      description: 'Teacher CSV template has been downloaded successfully.',
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const results = await parseCSVFile(file);
      const validation = validateTeacherCSV(results.data);

      if (!validation.isValid) {
        toast({
          variant: "destructive",
          title: "CSV Validation Error",
          description: validation.errors.slice(0, 3).join(', ') + (validation.errors.length > 3 ? '...' : ''),
        });
        return;
      }

      const transformedData = transformTeacherCSVData(results.data);
      setCsvData(transformedData);
      setIsCSVMode(true);

      toast({
        title: 'CSV uploaded successfully',
        description: `${transformedData.length} teacher records loaded for preview.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: "Failed to parse CSV file. Please check the format and try again.",
      });
    }

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCSVSubmit = async () => {
    try {
      for (const teacherData of csvData) {
        await onSubmit(teacherData);
      }
      toast({
        title: 'Teachers imported',
        description: `${csvData.length} teachers have been successfully imported.`,
      });
      onClose();
      reset();
      setIsCSVMode(false);
      setCsvData([]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Import Error",
        description: "Failed to import some teachers. Please try again.",
      });
    }
  };

  const handleFormSubmit = async (data: TeacherFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: mode === 'create' ? 'Teacher added' : 'Teacher updated',
        description: `${data.firstName} ${data.lastName} has been ${mode === 'create' ? 'added to' : 'updated in'} the teachers list.`,
      });
      onClose();
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${mode === 'create' ? 'add' : 'update'} teacher. Please try again.`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
        aria-describedby="teacher-form-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {mode === 'edit' ? 'Edit Teacher' : 'Add Teacher'}
          </DialogTitle>
          <p id="teacher-form-description" className="sr-only">
            {mode === 'create' 
              ? 'Fill out teacher information to add a new teacher to the system.'
              : 'Update the teacher information.'
            }
          </p>
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-3 mb-4">
              <p className="text-sm text-white font-medium">Please fix the following errors:</p>
              <ul className="text-sm text-white/90 mt-1 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>• {error?.message}</li>
                ))}
              </ul>
            </div>
          )}
        </DialogHeader>

        {/* CSV Upload Section */}
        {mode === 'create' && (
          <div className="border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-white">Bulk Import</h3>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleDownloadTemplate}
                  className="rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CSV
                </Button>
              </div>
            </div>
            <p className="text-sm text-white/70 mb-3">
              Upload a CSV file to add multiple teachers at once. Download the template to see the required format.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            {isCSVMode && csvData.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                <p className="text-sm text-white mb-2">
                  {csvData.length} teachers ready to import:
                </p>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {csvData.slice(0, 5).map((teacher, index) => (
                    <div key={index} className="text-xs text-white/80">
                      {teacher.firstName} {teacher.lastName} - {teacher.email}
                    </div>
                  ))}
                  {csvData.length > 5 && (
                    <div className="text-xs text-white/60">
                      ... and {csvData.length - 5} more
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleCSVSubmit}
                    className="rounded-xl"
                  >
                    Import All Teachers
                  </Button>
                  <Button
                    type="button"
                    variant="destructiveOutline"
                    size="sm"
                    onClick={() => {
                      setIsCSVMode(false);
                      setCsvData([]);
                    }}
                    className="rounded-xl"
                  >
                    Cancel Import
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Core Teacher Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">First Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter first name"
                          {...field}
                          aria-label="Teacher first name"
                          aria-required="true"
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:ring-brand-primary/50 text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                {/* Last Name */}
                <FormField
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Last Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter last name"
                          {...field}
                          aria-label="Teacher last name"
                          aria-required="true"
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:ring-brand-primary/50 text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="teacher@school.edu.rw"
                          {...field}
                          aria-label="Teacher email address"
                          aria-required="true"
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:ring-brand-primary/50 text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+250 700 000 000 (optional)"
                          {...field}
                          aria-label="Teacher phone number"
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:ring-brand-primary/50 text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Professional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Specialization */}
                <FormField
                  control={control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Specialization *</FormLabel>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 space-y-2">
                        <p className="text-xs text-white/70">Select 1-5 specializations</p>
                        <div className="grid grid-cols-2 gap-2">
                          {specializationOptions.map((spec) => (
                            <div key={spec} className="flex items-center space-x-2">
                              <Checkbox
                                id={`spec-${spec}`}
                                checked={field.value.includes(spec)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    if (current.length < 5) {
                                      field.onChange([...current, spec]);
                                    }
                                  } else {
                                    field.onChange(current.filter(s => s !== spec));
                                  }
                                }}
                                className="border-white/40 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                              />
                              <label
                                htmlFor={`spec-${spec}`}
                                className="text-xs text-white cursor-pointer"
                              >
                                {spec}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                {/* Qualification */}
                <FormField
                  control={control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Qualification *</FormLabel>
                      <GlassSelect onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <GlassSelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-blue-900 focus:border-white/40 focus:bg-white/20" aria-label="Select qualification">
                            <GlassSelectValue placeholder="Select qualification" />
                          </GlassSelectTrigger>
                        </FormControl>
                        <GlassSelectContent className="bg-white/20 backdrop-blur-xl border-white/30 rounded-xl">
                          {qualificationOptions.map(qual => (
                            <GlassSelectItem key={qual} value={qual} className="text-white hover:bg-white/30 focus:bg-white/30">
                              {qual}
                            </GlassSelectItem>
                          ))}
                        </GlassSelectContent>
                      </GlassSelect>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                {/* Experience */}
                <FormField
                  control={control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Experience (Years) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="50"
                          placeholder="0"
                          {...field}
                          aria-label="Years of experience"
                          aria-required="true"
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:ring-brand-primary/50 text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Role *</FormLabel>
                      <GlassSelect onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <GlassSelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-blue-900 focus:border-white/40 focus:bg-white/20" aria-label="Select role">
                            <GlassSelectValue placeholder="Select role" />
                          </GlassSelectTrigger>
                        </FormControl>
                        <GlassSelectContent className="bg-white/20 backdrop-blur-xl border-white/30 rounded-xl">
                          {roleOptions.map(role => (
                            <GlassSelectItem key={role} value={role} className="text-white hover:bg-white/30 focus:bg-white/30">
                              {role}
                            </GlassSelectItem>
                          ))}
                        </GlassSelectContent>
                      </GlassSelect>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Status</FormLabel>
                      <GlassSelect onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <GlassSelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-blue-900 focus:border-white/40 focus:bg-white/20" aria-label="Select status">
                            <GlassSelectValue placeholder="Select status" />
                          </GlassSelectTrigger>
                        </FormControl>
                        <GlassSelectContent className="bg-white/20 backdrop-blur-xl border-white/30 rounded-xl">
                          <GlassSelectItem value={TeacherStatus.ACTIVE} className="text-white hover:bg-white/30 focus:bg-white/30">
                            Active
                          </GlassSelectItem>
                          <GlassSelectItem value={TeacherStatus.ON_LEAVE} className="text-white hover:bg-white/30 focus:bg-white/30">
                            On Leave
                          </GlassSelectItem>
                          <GlassSelectItem value={TeacherStatus.ARCHIVED} className="text-white hover:bg-white/30 focus:bg-white/30">
                            Archived
                          </GlassSelectItem>
                        </GlassSelectContent>
                      </GlassSelect>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 border-t border-white/20">
              <Button
                type="button"
                variant="destructiveOutline"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-xl disabled:opacity-50"
                aria-label="Cancel and close form"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="rounded-xl px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={mode === 'create' ? 'Add teacher' : 'Update teacher'}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isSubmitting 
                  ? (mode === 'create' ? 'Adding...' : 'Updating...')
                  : (mode === 'create' ? 'Add Teacher' : 'Update Teacher')
                }
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}