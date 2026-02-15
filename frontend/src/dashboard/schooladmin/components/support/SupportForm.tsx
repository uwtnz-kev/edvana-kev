import React, { useState } from 'react';
import { Send, AlertCircle, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue } from '../ui/GlassSelect';
import { useTickets } from './TicketsContext';

const supportSchema = z.object({
  category: z.enum(['Technical Issue', 'Billing', 'Account', 'Other'], {
    required_error: 'Please select a category',
  }),
  subject: z.string().min(4, 'Subject must be at least 4 characters').max(120, 'Subject must be less than 120 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(3000, 'Description must be less than 3000 characters'),
});

type SupportFormData = z.infer<typeof supportSchema>;

export default function SupportForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const { toast } = useToast();
  const { addTicket } = useTickets();

  const form = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      category: '',
      subject: '',
      description: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image (JPG, PNG, GIF) or PDF file.",
          variant: "destructive",
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      setAttachment(file);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    // Reset file input
    const fileInput = document.getElementById('attachment') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (data: SupportFormData) => {
    setIsLoading(true);
    
    try {
      // Create ticket using context
      const ticketData = {
        category: data.category,
        subject: data.subject,
        description: data.description,
        attachment: attachment ? {
          name: attachment.name,
          size: attachment.size,
          type: attachment.type
        } : undefined,
      };

      const ticketId = addTicket(ticketData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form and attachment
      form.reset();
      setAttachment(null);
      const fileInput = document.getElementById('attachment') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
      toast({
        title: "Support request submitted",
        description: `Your ticket ${ticketId} has been created successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit support request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-brand-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">Submit a Request</h3>
          <p className="text-sm text-blue-900/70">Describe your issue and we'll help you resolve it</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-blue-900 font-medium">Category *</Label>
          <GlassSelect value={form.watch('category')} onValueChange={(value) => form.setValue('category', value)}>
            <GlassSelectTrigger className="bg-white/20 border-white/20 text-blue-900 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2">
              <GlassSelectValue placeholder="Select category" className="text-blue-900" />
            </GlassSelectTrigger>
            <GlassSelectContent className="bg-white/20 border-white/20 backdrop-blur-xl">
              <GlassSelectItem value="Technical Issue" className="text-blue-900 hover:bg-white/30">Technical Issue</GlassSelectItem>
              <GlassSelectItem value="Billing" className="text-blue-900 hover:bg-white/30">Billing</GlassSelectItem>
              <GlassSelectItem value="Account" className="text-blue-900 hover:bg-white/30">Account</GlassSelectItem>
              <GlassSelectItem value="Other" className="text-blue-900 hover:bg-white/30">Other</GlassSelectItem>
            </GlassSelectContent>
          </GlassSelect>
          {form.formState.errors.category && (
            <p className="text-red-300 text-sm">{form.formState.errors.category.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject" className="text-blue-900 font-medium">Subject *</Label>
          <Input
            id="subject"
            {...form.register('subject')}
            className="bg-white/20 border-white/20 text-blue-900 placeholder:text-blue-900/60 rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            placeholder="Brief description of your issue (4-120 characters)"
          />
          {form.formState.errors.subject && (
            <p className="text-red-300 text-sm">{form.formState.errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-blue-900 font-medium">Description *</Label>
          <Textarea
            id="description"
            {...form.register('description')}
            className="bg-white/20 border-white/20 text-blue-900 placeholder:text-blue-900/60 rounded-xl min-h-32 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            placeholder="Please provide detailed information about your issue (20-3000 characters)..."
          />
          {form.formState.errors.description && (
            <p className="text-red-300 text-sm">{form.formState.errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="attachment" className="text-blue-900 font-medium">Attachment (Optional)</Label>
          <div className="space-y-2">
            <input
              id="attachment"
              type="file"
              accept="image/jpeg,image/png,image/gif,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('attachment')?.click()}
                className="bg-white/20 border-white/20 text-blue-900 hover:bg-white/30 hover:text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
                aria-label="Choose file to attach"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <span className="text-sm text-blue-900/60">
                Images (JPG, PNG, GIF) or PDF, max 10MB
              </span>
            </div>
            
            {attachment && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-brand-accent" />
                  <span className="text-sm text-blue-900 font-medium">{attachment.name}</span>
                  <span className="text-xs text-blue-900/60">
                    ({(attachment.size / 1024 / 1024).toFixed(1)} MB)
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeAttachment}
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/20 rounded-lg focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
                  aria-label="Remove attachment"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-brand-accent hover:bg-brand-accent/80 text-white rounded-xl focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </form>
    </div>
  );
}