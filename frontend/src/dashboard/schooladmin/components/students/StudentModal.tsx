import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { parseStudentCSV, generateStudentTemplate } from '@/shared/mocks/schooladmin/csvUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus, Edit3, Upload, Download, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { StudentFormData, StudentMode, Student } from './types';
import { classOptions } from './mock';

// Status options for the modal
const modalStatusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'On Leave' },
  { value: 'Transferred', label: 'Transferred' },
  { value: 'Graduated', label: 'Graduated' },
  { value: 'Suspended', label: 'Archived' },
];

// Gender options
const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

// Form validation schema
const studentSchema = z.object({
  // Required fields
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(60, 'First name must not exceed 60 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(60, 'Last name must not exceed 60 characters'),
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  phone: z.string()
    .regex(/^[\d\s+\-()]+$/, 'Phone number can only contain digits, spaces, +, -, and parentheses')
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number must not exceed 20 characters'),
  class: z.string()
    .min(1, 'Please select a class'),
  status: z.string()
    .min(1, 'Please select a status'),
  enrollmentDate: z.string()
    .min(1, 'Enrollment date is required'),
  
  // Optional fields
  dateOfBirth: z.string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true; // Optional field, allow empty
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 3 && age <= 25; // Reasonable age range for students
      },
      { message: 'Date of birth must result in age between 3 and 25 years' }
    ),
  gender: z.string().optional().or(z.literal('')),
  parentEmail: z.string()
    .optional()
    .refine(
      (email) => {
        if (!email || email === '') return true; // Optional field
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
      },
      { message: 'Invalid parent email address' }
    ),
  parentNationalId: z.string()
    .max(50, 'Parent National ID/Passport must not exceed 50 characters')
    .optional()
    .or(z.literal('')),
});

interface StudentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData | Student[]) => void;
  mode: StudentMode;
  initialData?: Partial<StudentFormData>;
}

interface CSVValidationError {
  row: number;
  field: string;
  message: string;
}

interface CSVPreviewData {
  data: any[];
  validRows: Student[];
  errors: CSVValidationError[];
}

// CSV status options mapping
const csvStatusMapping: Record<string, string> = {
  'Active': 'Active',
  'On Leave': 'Inactive',
  'Transferred': 'Transferred',
  'Graduated': 'Graduated',
  'Archived': 'Suspended',
  '': 'Active', // Default to Active if blank
};

export default function StudentModal({
  open,
  onClose,
  onSubmit,
  mode,
  initialData,
}: StudentModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'manual' | 'csv'>('manual');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<CSVPreviewData | null>(null);
  const [isProcessingCsv, setIsProcessingCsv] = useState(false);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      class: '',
      status: 'Active',
      enrollmentDate: new Date().toISOString().split('T')[0], // Default to today
      dateOfBirth: '',
      gender: '',
      parentEmail: '',
      parentNationalId: '',
      ...initialData,
    },
  });

  const { handleSubmit, control, formState: { errors, isSubmitting }, reset } = form;

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (open) {
      setActiveTab('manual');
      setCsvFile(null);
      setCsvPreview(null);
      setIsProcessingCsv(false);
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        class: '',
        status: 'Active',
        enrollmentDate: new Date().toISOString().split('T')[0], // Default to today
        dateOfBirth: '',
        gender: '',
        parentEmail: '',
        parentNationalId: '',
        ...initialData,
      });
    }
  }, [open, reset, initialData]);

  const handleFormSubmit = async (data: StudentFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: mode === 'create' ? 'Student added' : 'Student updated',
        description: `${data.firstName} ${data.lastName} has been ${mode === 'create' ? 'added to' : 'updated in'} the students list.`,
      });
      onClose();
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${mode === 'create' ? 'add' : 'update'} student. Please try again.`,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // CSV Upload Functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a CSV file.',
        variant: 'destructive',
      });
      return;
    }

    setCsvFile(file);
    processCSVFile(file);
  };

  const processCSVFile = async (file: File) => {
    setIsProcessingCsv(true);
    
    try {
      const result = await parseStudentCSV(file);
      
      if (result.errors.length > 0) {
        toast({
          title: 'CSV Validation Errors',
          description: `Found ${result.errors.length} error(s). Please check the file and try again.`,
          variant: 'destructive',
        });
      }
      
      if (result.warnings.length > 0) {
        toast({
          title: 'CSV Warnings',
          description: `Found ${result.warnings.length} warning(s). Data will still be processed.`,
        });
      }
      
      setCsvPreview({
        data: result.data,
        validRows: result.data,
        errors: result.errors.map((error, index) => ({
          row: index + 1,
          field: 'General',
          message: error
        }))
      });
      
    } catch (error) {
      toast({
        title: 'CSV Parse Error',
        description: 'Failed to parse CSV file. Please check the format and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessingCsv(false);
    }
  };

  const validateCSVData = (data: any[]): CSVPreviewData => {
    const validRows: Student[] = [];
    const errors: CSVValidationError[] = [];

    data.forEach((row, index) => {
      const rowNumber = index + 2; // Account for header row
      const rowErrors: CSVValidationError[] = [];

      // Required field validation
      if (!row['First Name'] || row['First Name'].trim().length < 2) {
        rowErrors.push({ row: rowNumber, field: 'First Name', message: 'Required, minimum 2 characters' });
      }
      if (!row['Last Name'] || row['Last Name'].trim().length < 2) {
        rowErrors.push({ row: rowNumber, field: 'Last Name', message: 'Required, minimum 2 characters' });
      }
      if (!row['Email'] || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row['Email'])) {
        rowErrors.push({ row: rowNumber, field: 'Email', message: 'Required, must be valid email format' });
      }
      if (!row['Phone Number'] || !/^[\d\s+\-()]+$/.test(row['Phone Number'])) {
        rowErrors.push({ row: rowNumber, field: 'Phone Number', message: 'Required, invalid format' });
      }
      if (!row['Class']) {
        rowErrors.push({ row: rowNumber, field: 'Class', message: 'Required' });
      }

      // Status validation (with default)
      const status = csvStatusMapping[row['Status']] || 'Active';
      
      // Date validation
      if (row['Enrollment Date (YYYY-MM-DD)'] && !/^\d{4}-\d{2}-\d{2}$/.test(row['Enrollment Date (YYYY-MM-DD)'])) {
        rowErrors.push({ row: rowNumber, field: 'Enrollment Date', message: 'Must be YYYY-MM-DD format' });
      }
      if (row['Date of Birth (YYYY-MM-DD)'] && !/^\d{4}-\d{2}-\d{2}$/.test(row['Date of Birth (YYYY-MM-DD)'])) {
        rowErrors.push({ row: rowNumber, field: 'Date of Birth', message: 'Must be YYYY-MM-DD format' });
      }

      // If no errors, add to valid rows
      if (rowErrors.length === 0) {
        const student: Student = {
          id: `csv-${Date.now()}-${index}`,
          firstName: row['First Name'].trim(),
          lastName: row['Last Name'].trim(),
          email: row['Email'].trim(),
          phone: row['Phone Number'].trim(),
          class: row['Class'].trim(),
          status: status as any,
          enrollmentDate: row['Enrollment Date (YYYY-MM-DD)'] || new Date().toISOString().split('T')[0],
          dateOfBirth: row['Date of Birth (YYYY-MM-DD)'] || '',
          gender: row['Gender'] || '',
          parentEmail: row['Parent Email'] || '',
          parentNationalId: row['Parent National ID/Passport'] || '',
        };
        validRows.push(student);
      } else {
        errors.push(...rowErrors);
      }
    });

    return { data, validRows, errors };
  };

  const handleCSVImport = async () => {
    if (!csvPreview?.validRows.length) return;

    try {
      await onSubmit(csvPreview.validRows);
      
      toast({
        title: 'CSV Import Successful',
        description: `${csvPreview.validRows.length} students imported successfully.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Import Error',
        description: 'Failed to import students. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const downloadTemplate = () => {
    generateStudentTemplate();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
        aria-describedby="student-form-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {mode === 'edit' ? 'Edit Student' : 'Add Student'}
          </DialogTitle>
          <p id="student-form-description" className="sr-only">
            {mode === 'create' 
              ? 'Fill out student information to add a new student to the system.'
              : 'Update the student information.'
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

        {mode === 'create' ? (
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'manual' | 'csv')} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm rounded-xl p-1">
              <TabsTrigger value="manual" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
                Manual Entry
              </TabsTrigger>
              <TabsTrigger value="csv" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white rounded-lg">
                CSV Upload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="mt-6">
              <Form {...form}>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Required Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Required Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

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
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          {...field}
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Phone Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter phone number"
                          {...field}
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="class"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Class *</FormLabel>
                      <FormControl>
                        <GlassSelect
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <GlassSelectTrigger>
                            <GlassSelectValue placeholder="Select class" />
                          </GlassSelectTrigger>
                          <GlassSelectContent>
                            {classOptions.map((option) => (
                              <GlassSelectItem key={option.value} value={option.value}>
                                {option.label}
                              </GlassSelectItem>
                            ))}
                          </GlassSelectContent>
                        </GlassSelect>
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Status *</FormLabel>
                      <FormControl>
                        <GlassSelect
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <GlassSelectTrigger>
                            <GlassSelectValue placeholder="Select status" />
                          </GlassSelectTrigger>
                          <GlassSelectContent>
                            {modalStatusOptions.map((option) => (
                              <GlassSelectItem key={option.value} value={option.value}>
                                {option.label}
                              </GlassSelectItem>
                            ))}
                          </GlassSelectContent>
                        </GlassSelect>
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="enrollmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Enrollment Date *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Optional Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Optional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Gender</FormLabel>
                      <FormControl>
                        <GlassSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                        >
                          <GlassSelectTrigger>
                            <GlassSelectValue placeholder="Select gender" />
                          </GlassSelectTrigger>
                          <GlassSelectContent>
                            {genderOptions.map((option) => (
                              <GlassSelectItem key={option.value} value={option.value}>
                                {option.label}
                              </GlassSelectItem>
                            ))}
                          </GlassSelectContent>
                        </GlassSelect>
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="parentEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Parent Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter parent email"
                          {...field}
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="parentNationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Parent National ID/Passport</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter parent ID/passport"
                          {...field}
                          className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-300" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Student Code Placeholder */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <FormLabel className="text-sm font-medium text-white">Student Code</FormLabel>
                <p className="text-white/60 text-sm mt-1">Auto-generated after enrollment (backend managed)</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <Button
                type="button"
                onClick={onClose}
                variant="destructiveOutline"
                className="rounded-xl text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {mode === 'create' ? 'Adding...' : 'Updating...'}
                  </>
                ) : (
                  <>
                    {mode === 'create' ? (
                      <UserPlus className="w-4 h-4 mr-2" />
                    ) : (
                      <Edit3 className="w-4 h-4 mr-2" />
                    )}
                    {mode === 'create' ? 'Add Student' : 'Update Student'}
                  </>
                )}
              </Button>
            </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="csv" className="mt-6">
              <div className="space-y-6">
                {/* File Upload Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Upload CSV File</h3>
                  
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Upload className="h-12 w-12 text-white/60" />
                      
                      <div className="text-center">
                        <p className="text-white text-sm mb-2">Select a CSV file to upload</p>
                        <p className="text-white/60 text-xs">Maximum file size: 10MB</p>
                      </div>

                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="csv-upload"
                      />
                      <label
                        htmlFor="csv-upload"
                        className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-xl cursor-pointer inline-flex items-center gap-2 transition-colors"
                      >
                        <FileText className="h-4 w-4" />
                        Choose CSV File
                      </label>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={downloadTemplate}
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Processing State */}
                {isProcessingCsv && (
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-brand-accent" />
                      <span className="text-white">Processing CSV file...</span>
                    </div>
                  </div>
                )}

                {/* Preview Section */}
                {csvPreview && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Import Preview</h3>
                    
                    {/* Validation Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-400" />
                          <span className="text-white text-sm">Total Rows</span>
                        </div>
                        <p className="text-2xl font-bold text-white mt-1">{csvPreview.data.length}</p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-white text-sm">Valid Rows</span>
                        </div>
                        <p className="text-2xl font-bold text-green-400 mt-1">{csvPreview.validRows.length}</p>
                      </div>

                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-red-400" />
                          <span className="text-white text-sm">Errors</span>
                        </div>
                        <p className="text-2xl font-bold text-red-400 mt-1">{csvPreview.errors.length}</p>
                      </div>
                    </div>

                    {/* Errors List */}
                    {csvPreview.errors.length > 0 && (
                      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                        <h4 className="text-red-300 font-medium mb-3">Validation Errors</h4>
                        <div className="max-h-40 overflow-y-auto space-y-2">
                          {csvPreview.errors.slice(0, 10).map((error, index) => (
                            <div key={index} className="text-red-300 text-sm">
                              Row {error.row}: {error.field} - {error.message}
                            </div>
                          ))}
                          {csvPreview.errors.length > 10 && (
                            <div className="text-red-300/70 text-sm">
                              ... and {csvPreview.errors.length - 10} more errors
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Preview Table */}
                    {csvPreview.validRows.length > 0 && (
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                        <h4 className="text-white font-medium mb-3">Preview (First 5 Valid Rows)</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="text-left text-white/80 p-2">Name</th>
                                <th className="text-left text-white/80 p-2">Email</th>
                                <th className="text-left text-white/80 p-2">Class</th>
                                <th className="text-left text-white/80 p-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {csvPreview.validRows.slice(0, 5).map((student, index) => (
                                <tr key={index} className="border-b border-white/5">
                                  <td className="text-white p-2">{student.firstName} {student.lastName}</td>
                                  <td className="text-white p-2">{student.email}</td>
                                  <td className="text-white p-2">{student.class}</td>
                                  <td className="text-white p-2">{student.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Import Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <Button
                        type="button"
                        onClick={onClose}
                        variant="destructiveOutline"
                        className="text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCSVImport}
                        disabled={csvPreview.validRows.length === 0}
                        className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Import {csvPreview.validRows.length} Students
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
              {/* Edit mode - show manual form only */}
              {/* Required Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Required Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />

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
                            className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            {...field}
                            className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter phone number"
                            {...field}
                            className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">Class *</FormLabel>
                        <FormControl>
                          <GlassSelect
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <GlassSelectTrigger>
                              <GlassSelectValue placeholder="Select class" />
                            </GlassSelectTrigger>
                            <GlassSelectContent>
                              {classOptions.map((option) => (
                                <GlassSelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </GlassSelectItem>
                              ))}
                            </GlassSelectContent>
                          </GlassSelect>
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">Status *</FormLabel>
                        <FormControl>
                          <GlassSelect
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <GlassSelectTrigger>
                              <GlassSelectValue placeholder="Select status" />
                            </GlassSelectTrigger>
                            <GlassSelectContent>
                              {modalStatusOptions.map((option) => (
                                <GlassSelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </GlassSelectItem>
                              ))}
                            </GlassSelectContent>
                          </GlassSelect>
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="enrollmentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">Enrollment Date *</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Optional Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Optional Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">Date of Birth</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">Gender</FormLabel>
                        <FormControl>
                          <GlassSelect
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <GlassSelectTrigger>
                              <GlassSelectValue placeholder="Select gender" />
                            </GlassSelectTrigger>
                            <GlassSelectContent>
                              {genderOptions.map((option) => (
                                <GlassSelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </GlassSelectItem>
                              ))}
                            </GlassSelectContent>
                          </GlassSelect>
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="parentEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">Parent Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter parent email"
                            {...field}
                            className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="parentNationalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">Parent National ID/Passport</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter parent ID/passport"
                            {...field}
                            className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-white placeholder:text-white/60"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-300" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Student Code Placeholder */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <FormLabel className="text-sm font-medium text-white">Student Code</FormLabel>
                  <p className="text-white/60 text-sm mt-1">Auto-generated after enrollment (backend managed)</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="destructiveOutline"
                  className="rounded-xl text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {mode === 'create' ? 'Adding...' : 'Updating...'}
                    </>
                  ) : (
                    <>
                      {mode === 'create' ? (
                        <UserPlus className="w-4 h-4 mr-2" />
                      ) : (
                        <Edit3 className="w-4 h-4 mr-2" />
                      )}
                      {mode === 'create' ? 'Add Student' : 'Update Student'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}