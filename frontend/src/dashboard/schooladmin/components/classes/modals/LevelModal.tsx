import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Level } from '../types';
import { X, Plus, Edit } from 'lucide-react';

const levelSchema = z.object({
  name: z.string()
    .min(1, 'Level name is required')
    .max(30, 'Level name must be 30 characters or less')
    .trim()
    .refine(val => val.length > 0, 'Level name cannot be empty')
});

type LevelFormData = z.infer<typeof levelSchema>;

interface LevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LevelFormData) => void;
  level?: Level;
  existingLevels: Level[];
  mode: 'create' | 'edit';
}

export default function LevelModal({
  isOpen,
  onClose,
  onSubmit,
  level,
  existingLevels,
  mode
}: LevelModalProps) {
  const form = useForm<LevelFormData>({
    resolver: zodResolver(levelSchema),
    defaultValues: {
      name: level?.name || ''
    }
  });

  const handleSubmit = (data: LevelFormData) => {
    // Check for duplicate names (excluding current level in edit mode)
    const duplicateName = existingLevels.some(l => 
      l.name.toLowerCase() === data.name.toLowerCase() && 
      (mode === 'create' || l.id !== level?.id)
    );

    if (duplicateName) {
      form.setError('name', { message: 'A level with this name already exists' });
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
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
            {mode === 'create' ? (
              <>
                <Plus className="w-5 h-5" />
                Add Education Level
              </>
            ) : (
              <>
                <Edit className="w-5 h-5" />
                Edit Education Level
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Level Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Primary, O-Level, A-Level"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:bg-white/20 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="destructiveOutline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex-1 bg-brand-teal hover:bg-brand-teal/80 hover:backdrop-blur-sm text-white rounded-xl"
              >
                {mode === 'create' ? 'Add Level' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}