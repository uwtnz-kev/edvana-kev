import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
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
import { Textarea } from "@/components/ui/textarea";
import { 
  GlassSelect, 
  GlassSelectContent, 
  GlassSelectItem, 
  GlassSelectTrigger, 
  GlassSelectValue 
} from "../ui/GlassSelect";
import { Subject, SubjectStatus } from './types';
import { useToast } from "@/hooks/use-toast";

// Zod validation schema for new simplified subject model
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

const availableStreams = ['Science', 'Arts', 'Commerce', 'Technical', 'General', 'Humanities', 'Business'];

export default function SubjectForm({ open, mode, initial, onClose, onSubmit }: SubjectFormProps) {
  const { toast } = useToast();
  
  const form = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: initial?.name || '',
      code: initial?.code || '',
      level: initial?.level || SubjectLevel.LOWER_SEC,
      streams: initial?.streams || [],
      status: initial?.status || SubjectStatus.ACTIVE,
      description: initial?.description || '',
      category: initial?.category || SubjectCategory.MATHEMATICS,
      maxCapacity: initial?.maxCapacity || 30,
    },
  });

  const { handleSubmit, control, formState: { errors, isSubmitting }, reset, watch, setValue } = form;
  const watchedStreams = watch('streams');

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
        name: initial?.name || '',
        code: initial?.code || '',
        level: initial?.level || SubjectLevel.LOWER_SEC,
        streams: initial?.streams || [],
        status: initial?.status || SubjectStatus.ACTIVE,
        description: initial?.description || '',
        category: initial?.category || SubjectCategory.MATHEMATICS,
        maxCapacity: initial?.maxCapacity || 30,
      });
    }
  }, [open, initial, reset]);

  const handleFormSubmit = async (data: SubjectFormData) => {
    try {
      await onSubmit(data);
      toast({
        title: mode === 'create' ? 'Subject created' : 'Subject updated',
        description: `${data.name} has been ${mode === 'create' ? 'added to' : 'updated in'} the subjects list.`,
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${mode === 'create' ? 'create' : 'update'} subject. Please try again.`,
      });
      // Handle submission errors if needed
      console.error('Form submission error:', error);
    }
  };

  const handleStreamToggle = (stream: string) => {
    const currentStreams = watchedStreams || [];
    let newStreams;
    
    if (currentStreams.includes(stream)) {
      newStreams = currentStreams.filter(s => s !== stream);
    } else {
      newStreams = [...currentStreams, stream];
    }
    
    setValue('streams', newStreams, { shouldValidate: true });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
        aria-describedby="subject-form-description"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {mode === 'edit' ? 'Edit Subject' : 'Add New Subject'}
          </DialogTitle>
          <p id="subject-form-description" className="sr-only">
            {mode === 'create' 
              ? 'Fill out the form below to create a new subject'
              : 'Update the subject information in the form below'
            }
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject Name */}
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Subject Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter subject name"
                        {...field}
                        aria-label="Subject name"
                        aria-required="true"
                        className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:ring-brand-primary/50 text-white placeholder:text-white/60"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-300" />
                  </FormItem>
                )}
              />

              {/* Subject Code */}
              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Subject Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., MATH-L1"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        aria-label="Subject code"
                        aria-required="true"
                        className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:ring-brand-primary/50 text-white placeholder:text-white/60 font-mono"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-300" />
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Category</FormLabel>
                    <GlassSelect onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <GlassSelectTrigger aria-label="Select subject category">
                          <GlassSelectValue placeholder="Select category" />
                        </GlassSelectTrigger>
                      </FormControl>
                      <GlassSelectContent>
                        {Object.values(SubjectCategory).map(category => (
                          <GlassSelectItem key={category} value={category}>{category}</GlassSelectItem>
                        ))}
                      </GlassSelectContent>
                    </GlassSelect>
                    <FormMessage className="text-xs text-red-300" />
                  </FormItem>
                )}
              />

              {/* Level */}
              <FormField
                control={control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Education Level</FormLabel>
                    <GlassSelect onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <GlassSelectTrigger aria-label="Select education level">
                          <GlassSelectValue placeholder="Select level" />
                        </GlassSelectTrigger>
                      </FormControl>
                      <GlassSelectContent>
                        {Object.values(SubjectLevel).map(level => (
                          <GlassSelectItem key={level} value={level}>{level}</GlassSelectItem>
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
                        <GlassSelectTrigger>
                          <GlassSelectValue placeholder="Select status" />
                        </GlassSelectTrigger>
                      </FormControl>
                      <GlassSelectContent>
                        {Object.values(SubjectStatus).map(status => (
                          <GlassSelectItem key={status} value={status}>{status}</GlassSelectItem>
                        ))}
                      </GlassSelectContent>
                    </GlassSelect>
                    <FormMessage className="text-xs text-red-300" />
                  </FormItem>
                )}
              />

              {/* Max Capacity */}
              <FormField
                control={control}
                name="maxCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Max Capacity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 30)}
                        className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:ring-brand-primary/50 text-white placeholder:text-white/60"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-300" />
                  </FormItem>
                )}
              />
            </div>

            {/* Academic Streams */}
            <FormField
              control={control}
              name="streams"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Academic Streams ({watchedStreams?.length || 0}/20)
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {availableStreams.map(stream => (
                        <button
                          key={stream}
                          type="button"
                          onClick={() => handleStreamToggle(stream)}
                          className={`px-3 py-1 rounded-xl text-sm transition-all ${
                            watchedStreams?.includes(stream)
                              ? 'bg-brand-primary text-white shadow-lg'
                              : 'bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/40 text-white/80'
                          }`}
                        >
                          {stream}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-300" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Description (Optional - Max 240 chars)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter subject description"
                      rows={3}
                      maxLength={240}
                      {...field}
                      className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl focus:ring-brand-primary/50 text-white placeholder:text-white/60 resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-300" />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-white/20">
              <Button
                type="button"
                variant="destructiveOutline"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-accent hover:backdrop-blur-sm hover:bg-white/20 hover:text-brand-accent text-white rounded-xl shadow-xl min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  mode === 'edit' ? 'Update Subject' : 'Create Subject'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}