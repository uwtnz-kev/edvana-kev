import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  generateSubjectCSVTemplate, 
  downloadCSVTemplate, 
  parseCSVFile, 
  validateSubjectCSV, 
  transformSubjectCSVData 
} from '../shared/CSVUploadUtils';
import { Loader2, Plus, X, Upload, Download } from 'lucide-react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCSVMode, setIsCSVMode] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  
  const form = useForm<AddSubjectFormData>({
    resolver: zodResolver(addSubjectSchema),
    defaultValues: {
      name: '',
      code: '',
      classes: [],
      teacherName: 'none', // Use 'none' instead of empty string
      status: 'Active', // Default to Active
    },
  });

  const { handleSubmit, control, formState: { errors, isSubmitting }, reset, watch, setValue } = form;
  const selectedClasses = watch('classes');

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
        teacherName: 'none',
        status: 'Active',
      });
      setIsCSVMode(false);
      setCsvData([]);
    }
  }, [open, reset]);

  // CSV Upload Handlers
  const handleDownloadTemplate = () => {
    const csvContent = generateSubjectCSVTemplate();
    downloadCSVTemplate('subject_template.csv', csvContent);
    toast({
      title: 'Template downloaded',
      description: 'Subject CSV template has been downloaded successfully.',
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const results = await parseCSVFile(file);
      const validation = validateSubjectCSV(results.data);

      if (!validation.isValid) {
        toast({
          variant: "destructive",
          title: "CSV Validation Error",
          description: validation.errors.slice(0, 3).join(', ') + (validation.errors.length > 3 ? '...' : ''),
        });
        return;
      }

      const transformedData = transformSubjectCSVData(results.data);
      setCsvData(transformedData);
      setIsCSVMode(true);

      toast({
        title: 'CSV uploaded successfully',
        description: `${transformedData.length} subject records loaded for preview.`,
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
      for (const subjectData of csvData) {
        onSubmit(subjectData);
      }
      toast({
        title: 'Subjects imported',
        description: `${csvData.length} subjects have been successfully imported.`,
      });
      handleCancel();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Import Error",
        description: "Failed to import some subjects. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (data: AddSubjectFormData) => {
    try {
      // Convert 'none' back to empty string for teacher
      const processedData = {
        ...data,
        teacherName: data.teacherName === 'none' ? '' : data.teacherName
      };
      
      // Pass data to parent for processing
      onSubmit(processedData);
      
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

  const handleClassToggle = (classValue: string, checked: boolean) => {
    const currentClasses = selectedClasses || [];
    if (checked) {
      setValue('classes', [...currentClasses, classValue]);
    } else {
      setValue('classes', currentClasses.filter(c => c !== classValue));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
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

        {/* CSV Upload Section */}
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
            Upload a CSV file to add multiple subjects at once. Download the template to see the required format.
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
                {csvData.length} subjects ready to import:
              </p>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {csvData.slice(0, 5).map((subject, index) => (
                  <div key={index} className="text-xs text-white/80">
                    {subject.name} ({subject.code}) - {subject.classes?.join(', ')}
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
                  Import All Subjects
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

        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid gap-4">
              {/* Subject Name - Required */}
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
                name="code"
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

              {/* Classes Selection - Required */}
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

              {/* Teacher Assignment - Optional */}
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
                        <GlassSelectTrigger className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl text-blue-900 focus:border-white/40 focus:bg-white/20">
                          <GlassSelectValue placeholder="Select status" />
                        </GlassSelectTrigger>
                      </FormControl>
                      <GlassSelectContent className="bg-white/20 backdrop-blur-xl border-white/30 rounded-xl">
                        {statusOptions.map((status) => (
                          <GlassSelectItem 
                            key={status.value} 
                            value={status.value}
                            className="text-white hover:bg-white/30 focus:bg-white/30"
                          >
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
                  <Plus className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? 'Creating...' : 'Create Subject'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}