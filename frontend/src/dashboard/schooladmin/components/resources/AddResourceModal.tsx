import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';
import { Upload, X, Link as LinkIcon, File, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockSubjects, mockGrades, MockResourceStore, Resource, ResourceType, ResourceStatus } from '@/shared/mocks/schooladmin/mockData';

const resourceSchema = z.object({
  name: z.string()
    .min(2, 'Resource name must be at least 2 characters')
    .max(80, 'Resource name must be less than 80 characters'),
  description: z.string()
    .max(200, 'Description must be less than 200 characters')
    .optional(),
  uploadMode: z.enum(['file', 'link']),
  file: z.instanceof(File).optional(),
  url: z.string().url('Please enter a valid URL').optional(),
  subjectId: z.string().min(1, 'Subject is required'),
  gradeIds: z.array(z.string()).min(1, 'At least one grade must be selected'),
  type: z.enum(['PDF', 'Video', 'Audio', 'Image', 'Document', 'Link', 'Other']),
  status: z.enum(['Active', 'Archived']),
  tags: z.string().optional(),
}).refine(
  (data) => {
    if (data.uploadMode === 'file') {
      return data.file !== undefined;
    } else {
      return data.url !== undefined && data.url.length > 0;
    }
  },
  {
    message: 'Please upload a file or provide a URL',
    path: ['file'],
  }
);

type ResourceFormData = z.infer<typeof resourceSchema>;

interface AddResourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (resource: Resource) => void;
  editResource?: Resource | null;
}

const resourceTypes: ResourceType[] = ['PDF', 'Video', 'Audio', 'Image', 'Document', 'Link', 'Other'];

const acceptedFileTypes = {
  'PDF': '.pdf',
  'Document': '.docx,.doc',
  'Video': '.mp4,.avi,.mov',
  'Audio': '.mp3,.wav,.m4a',
  'Image': '.png,.jpg,.jpeg,.webp,.gif',
  'Other': '.pdf,.docx,.pptx,.xlsx,.mp4,.mp3,.png,.jpg,.webp'
};

export default function AddResourceModal({
  open,
  onOpenChange,
  onSubmit,
  editResource
}: AddResourceModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isEditing = !!editResource;
  const { toast } = useToast();

  const form = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      name: '',
      description: '',
      uploadMode: 'file',
      file: undefined,
      url: '',
      subjectId: '',
      gradeIds: [],
      type: 'PDF',
      status: 'Active',
      tags: '',
    },
  });

  const watchUploadMode = form.watch('uploadMode');
  const watchType = form.watch('type');

  // Reset form when modal opens/closes or edit resource changes
  useEffect(() => {
    if (open) {
      if (isEditing && editResource) {
        form.reset({
          name: editResource.name,
          description: editResource.description || '',
          uploadMode: editResource.url ? 'link' : 'file',
          url: editResource.url || '',
          subjectId: editResource.subjectId,
          gradeIds: editResource.gradeIds,
          type: editResource.type,
          status: editResource.status,
          tags: editResource.tags?.join(', ') || '',
        });
      } else {
        form.reset({
          name: '',
          description: '',
          uploadMode: 'file',
          file: undefined,
          url: '',
          subjectId: '',
          gradeIds: [],
          type: 'PDF',
          status: 'Active',
          tags: '',
        });
      }
      setSelectedFile(null);
    }
  }, [open, isEditing, editResource, form]);

  const handleSubmit = (data: ResourceFormData) => {
    try {
      const subjectName = mockSubjects.find(s => s.id === data.subjectId)?.name || '';
      const gradeNames = data.gradeIds.map(id => mockGrades.find(g => g.id === id)?.name || '');
      
      const resourceData = {
        name: data.name,
        description: data.description,
        subjectId: data.subjectId,
        subjectName,
        gradeIds: data.gradeIds,
        gradeNames,
        type: data.type,
        status: data.status,
        url: data.uploadMode === 'link' ? data.url : undefined,
        size: selectedFile ? formatFileSize(selectedFile.size) : undefined,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        uploadedBy: 'Current User' // In real app, get from auth context
      };

      let result: Resource;
      if (isEditing && editResource) {
        result = MockResourceStore.updateResource(editResource.id, resourceData) || editResource;
      } else {
        result = MockResourceStore.addResource(resourceData);
      }

      onSubmit(result);
      handleClose();
      
      toast({
        title: isEditing ? "Resource Updated" : "Resource Added",
        description: isEditing 
          ? `"${data.name}" has been successfully updated.`
          : `"${data.name}" has been successfully added to the library.`,
      });
    } catch (error) {
      console.error('Error saving resource:', error);
      toast({
        title: "Error",
        description: "Failed to save resource. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    form.reset();
    setSelectedFile(null);
    onOpenChange(false);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    form.setValue('file', file);
    form.clearErrors('file');
    
    // Auto-detect type based on file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension) {
      if (['pdf'].includes(extension)) {
        form.setValue('type', 'PDF');
      } else if (['mp4', 'avi', 'mov', 'webm'].includes(extension)) {
        form.setValue('type', 'Video');
      } else if (['mp3', 'wav', 'm4a'].includes(extension)) {
        form.setValue('type', 'Audio');
      } else if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(extension)) {
        form.setValue('type', 'Image');
      } else if (['docx', 'doc', 'pptx', 'xlsx'].includes(extension)) {
        form.setValue('type', 'Document');
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getAcceptedTypes = () => {
    if (watchType && acceptedFileTypes[watchType as keyof typeof acceptedFileTypes]) {
      return acceptedFileTypes[watchType as keyof typeof acceptedFileTypes];
    }
    return '.pdf,.docx,.pptx,.xlsx,.mp4,.mp3,.png,.jpg,.webp';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/15 backdrop-blur-xl border-white/25 text-white rounded-2xl max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {isEditing ? 'Edit Resource' : 'Add New Resource'}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            {isEditing ? 'Update resource information and settings.' : 'Upload educational materials and content for students and teachers.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Resource Information</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Resource Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Algebra Study Guide"
                        {...field}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-teal focus:ring-brand-teal/50 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the resource content... (max 200 characters)"
                        {...field}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-teal focus:ring-brand-teal/50 rounded-xl min-h-[80px]"
                        maxLength={200}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Upload Mode Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Upload Method</h3>
              <FormField
                control={form.control}
                name="uploadMode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="file" id="file" />
                          <Label htmlFor="file" className="text-white">Upload File</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="link" id="link" />
                          <Label htmlFor="link" className="text-white">External Link</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* File Upload or URL Section */}
            {watchUploadMode === 'file' ? (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">File Upload *</FormLabel>
                      <FormControl>
                        <div
                          className={`bg-white/10 rounded-xl p-6 border-2 border-dashed transition-colors ${
                            isDragging ? 'border-brand-teal bg-brand-teal/10' : 'border-white/30'
                          }`}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                        >
                          <div className="text-center">
                            {selectedFile ? (
                              <div className="space-y-2">
                                <File className="w-12 h-12 mx-auto text-brand-teal" />
                                <p className="text-white font-medium">{selectedFile.name}</p>
                                <p className="text-white/70 text-sm">{formatFileSize(selectedFile.size)}</p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedFile(null);
                                    form.setValue('file', undefined);
                                  }}
                                  className="border-red-500/40 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 rounded-xl font-medium"
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  Remove File
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-12 h-12 mx-auto mb-4 text-white/60" />
                                <h4 className="text-lg font-medium text-white mb-2">Upload File</h4>
                                <p className="text-white/70 text-sm mb-4">
                                  Drag and drop your file here, or click to browse
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    const input = document.createElement('input');
                                    input.type = 'file';
                                    input.accept = getAcceptedTypes();
                                    input.onchange = (e) => {
                                      const file = (e.target as HTMLInputElement).files?.[0];
                                      if (file) handleFileSelect(file);
                                    };
                                    input.click();
                                  }}
                                  className="border-brand-teal/40 text-brand-teal bg-brand-teal/10 hover:bg-brand-teal/20 hover:text-brand-teal rounded-xl font-medium"
                                >
                                  <Upload className="w-4 h-4 mr-2" />
                                  Choose File
                                </Button>
                                <p className="text-white/50 text-xs mt-2">
                                  Accepted: {getAcceptedTypes()} (Max 50MB)
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">URL *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                        <Input
                          placeholder="https://example.com/resource"
                          {...field}
                          className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-teal focus:ring-brand-teal/50 rounded-xl"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
            )}

            {/* Classification */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Classification</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Subject *</FormLabel>
                      <FormControl>
                        <GlassSelect
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <GlassSelectTrigger>
                            <GlassSelectValue placeholder="Select subject" />
                          </GlassSelectTrigger>
                          <GlassSelectContent>
                            {mockSubjects.map((subject) => (
                              <GlassSelectItem key={subject.id} value={subject.id}>
                                {subject.name}
                              </GlassSelectItem>
                            ))}
                          </GlassSelectContent>
                        </GlassSelect>
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Resource Type *</FormLabel>
                      <FormControl>
                        <GlassSelect
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <GlassSelectTrigger>
                            <GlassSelectValue placeholder="Select type" />
                          </GlassSelectTrigger>
                          <GlassSelectContent>
                            {resourceTypes.map((type) => (
                              <GlassSelectItem key={type} value={type}>
                                {type}
                              </GlassSelectItem>
                            ))}
                          </GlassSelectContent>
                        </GlassSelect>
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gradeIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Grades *</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="text-sm text-white/80">Select applicable grade levels:</div>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 p-4 bg-white/5 rounded-xl">
                          {mockGrades.map((grade) => (
                            <div key={grade.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={grade.id}
                                checked={field.value.includes(grade.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, grade.id]);
                                  } else {
                                    field.onChange(field.value.filter((id: string) => id !== grade.id));
                                  }
                                }}
                                className="border-white/30 data-[state=checked]:bg-brand-teal data-[state=checked]:border-brand-teal"
                              />
                              <Label htmlFor={grade.id} className="text-white text-sm cursor-pointer">
                                {grade.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Status</FormLabel>
                      <FormControl>
                        <GlassSelect
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <GlassSelectTrigger>
                            <GlassSelectValue />
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

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Tags (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="exam-prep, homework, lab-work"
                          {...field}
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-teal focus:ring-brand-teal/50 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                      <p className="text-xs text-white/60 mt-1">
                        Comma-separated tags to help categorize this resource
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="destructiveOutline"
                onClick={handleClose}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-brand-accent hover:bg-brand-accent/80 text-white"
              >
                {isEditing ? (
                  <>
                    <File className="w-4 h-4 mr-2" />
                    Update Resource
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Add Resource
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}