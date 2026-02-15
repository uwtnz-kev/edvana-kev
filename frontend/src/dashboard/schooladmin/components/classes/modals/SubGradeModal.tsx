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
import { SubGrade, Grade, Level, canAddSubGrades, getValidationMessage } from '@/shared/mocks/schooladmin/classes';

const subGradeSchema = z.object({
  name: z.string()
    .min(1, 'Sub-grade name is required')
    .max(30, 'Sub-grade name must be 30 characters or less')
    .trim()
    .refine(val => val.length > 0, 'Sub-grade name cannot be empty')
});

type SubGradeFormData = z.infer<typeof subGradeSchema>;

interface SubGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubGradeFormData) => void;
  subGrade?: SubGrade;
  parentGrade: Grade;
  parentLevel: Level;
  mode: 'create' | 'edit';
}

export default function SubGradeModal({
  isOpen,
  onClose,
  onSubmit,
  subGrade,
  parentGrade,
  parentLevel,
  mode
}: SubGradeModalProps) {
  const form = useForm<SubGradeFormData>({
    resolver: zodResolver(subGradeSchema),
    defaultValues: {
      name: subGrade?.name || ''
    }
  });

  const handleSubmit = (data: SubGradeFormData) => {
    // Check if subgrades can be added to this grade
    if (mode === 'create' && !canAddSubGrades(parentGrade)) {
      form.setError('name', { 
        message: getValidationMessage(parentGrade, 'subgrades')
      });
      return;
    }

    // Check for duplicate names within the same parent grade
    const duplicateName = parentGrade?.subGrades?.some(sg => 
      sg.name.toLowerCase() === data.name.toLowerCase() && 
      (mode === 'create' || sg.id !== subGrade?.id)
    ) || false;

    if (duplicateName) {
      form.setError('name', { message: 'A sub-grade with this name already exists in this grade' });
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
            {mode === 'create' ? 'Add New Sub-grade' : 'Edit Sub-grade'}
          </DialogTitle>
          <div className="text-white/70 text-sm space-y-1">
            <p>Level: <span className="font-medium text-brand-teal">{parentLevel?.name || 'Unknown Level'}</span></p>
            <p>Grade: <span className="font-medium text-brand-accent">{parentGrade?.name || 'Unknown Grade'}</span></p>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Sub-grade Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Section A, Stream A, etc."
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
                {mode === 'create' ? 'Add Sub-grade' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}