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

import { Combination, Level, Grade } from '../types';

// Validation schema
const combinationSchema = z.object({
  name: z.string().min(1, 'Combination name is required').max(50, 'Name must be less than 50 characters')
});

type CombinationFormData = z.infer<typeof combinationSchema>;

interface CombinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CombinationFormData) => void;
  combination?: Combination;
  parentLevel?: Level;
  parentGrade?: Grade;
  mode: 'create' | 'edit';
}

export default function CombinationModal({
  isOpen,
  onClose,
  onSubmit,
  combination,
  parentLevel,
  parentGrade,
  mode
}: CombinationModalProps) {
  const form = useForm<CombinationFormData>({
    resolver: zodResolver(combinationSchema),
    defaultValues: {
      name: combination?.name || ''
    }
  });

  const handleSubmit = (data: CombinationFormData) => {
    // Check for duplicate names within the same parent grade
    const duplicateName = parentGrade?.combinations?.some(c => 
      c.name.toLowerCase() === data.name.toLowerCase() && 
      (mode === 'create' || c.id !== combination?.id)
    ) || false;

    if (duplicateName) {
      form.setError('name', { message: 'A combination with this name already exists in this grade' });
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
            {mode === 'create' ? 'Add New Combination' : 'Edit Combination'}
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
                  <FormLabel className="text-white">Combination Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., MCB, PCM, HEG"
                      {...field}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-brand-teal focus:ring-brand-teal/50 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                {mode === 'create' ? 'Create Combination' : 'Update Combination'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}