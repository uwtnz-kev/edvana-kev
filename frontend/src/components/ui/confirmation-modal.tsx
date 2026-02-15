import { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2, Edit, Save, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  type?: 'delete' | 'update' | 'save' | 'general';
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  icon?: ReactNode;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  type = 'general',
  confirmText,
  cancelText = 'Cancel',
  isLoading = false,
  icon
}: ConfirmationModalProps) {
  const getTypeConfig = () => {
    switch (type) {
      case 'delete':
        return {
          icon: icon || <Trash2 className="h-5 w-5" />,
          confirmClass: 'bg-red-600 hover:bg-red-700 text-white border-0',
          confirmText: confirmText || 'Delete',
          iconColor: 'text-red-500'
        };
      case 'update':
        return {
          icon: icon || <Edit className="h-5 w-5" />,
          confirmClass: 'glass-brand-accent border-0',
          confirmText: confirmText || 'Update',
          iconColor: 'text-brand-accent'
        };
      case 'save':
        return {
          icon: icon || <Save className="h-5 w-5" />,
          confirmClass: 'glass-brand-teal border-0',
          confirmText: confirmText || 'Save',
          iconColor: 'text-brand-teal'
        };
      default:
        return {
          icon: icon || <AlertTriangle className="h-5 w-5" />,
          confirmClass: 'glass-brand-accent border-0',
          confirmText: confirmText || 'Confirm',
          iconColor: 'text-brand-accent'
        };
    }
  };

  const config = getTypeConfig();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="glass-card border-white/20 max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={cn("rounded-full p-2 glass-effect", config.iconColor)}>
              {config.icon}
            </div>
            <AlertDialogTitle className="text-white text-xl">
              {title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-white/80 text-base">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              className="bg-transparent border-red-500 text-red-400 hover:bg-red-500/10 hover:text-red-300 glass-transition"
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              {cancelText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className={cn(config.confirmClass, 'glass-transition')}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {config.icon}
                  {config.confirmText}
                </div>
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}