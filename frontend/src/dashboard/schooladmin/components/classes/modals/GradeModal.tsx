import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit2 } from 'lucide-react';

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
import { Grade, Level } from '../types';

const gradeSchema = z.object({
  name: z.string()
    .min(1, 'Grade name is required')
    .max(30, 'Grade name must be 30 characters or less')
    .trim()
    .refine(val => val.length > 0, 'Grade name cannot be empty')
});

type GradeFormData = z.infer<typeof gradeSchema>;

interface GradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GradeFormData) => void;
  grade?: Grade;
  parentLevel: Level;
  mode: 'create' | 'edit';
}

export default function GradeModal({
  isOpen,
  onClose,
  onSubmit,
  grade,
  parentLevel,
  mode
}: GradeModalProps) {
  const form = useForm<GradeFormData>({
    resolver: zodResolver(gradeSchema),
    defaultValues: {
      name: grade?.name || ''
    }
  });

  const handleSubmit = (data: GradeFormData) => {
    // Check for duplicate names within the same parent level
    const duplicateName = parentLevel?.grades?.some(g => 
      g.name.toLowerCase() === data.name.toLowerCase() && 
      (mode === 'create' || g.id !== grade?.id)
    ) || false;

    if (duplicateName) {
      form.setError('name', { message: 'A grade with this name already exists in this level' });
      return;
    }

    onSubmit(data);
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            {mode === 'create' ? <Plus className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
            {mode === 'create' ? 'Add New Grade' : 'Edit Grade'}
          </DialogTitle>
          <p className="text-white/70 text-sm">
            Adding grade to: <span className="font-medium text-brand-teal">{parentLevel?.name || 'Unknown Level'}</span>
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Grade Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., P1, S1, etc."
                      {...field}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-teal focus:ring-brand-teal/50 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={handleClose}
                variant="destructiveOutline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-brand-accent hover:bg-brand-accent/80 text-white"
                disabled={form.formState.isSubmitting}
              >
                {mode === 'create' ? <Plus className="w-4 h-4 mr-2" /> : <Edit2 className="w-4 h-4 mr-2" />}
                {mode === 'create' ? 'Add Grade' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}