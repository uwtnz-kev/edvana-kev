import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2, Archive } from 'lucide-react';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'delete' | 'archive' | 'default';
  isLoading?: boolean;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false,
}: ConfirmModalProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onConfirm();
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'delete':
        return <Trash2 className="w-6 h-6 text-red-500" />;
      case 'archive':
        return <Archive className="w-6 h-6 text-amber-500" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getConfirmButton = () => {
    switch (variant) {
      case 'delete':
        return (
          <Button
            onClick={onConfirm}
            variant="destructive"
            disabled={isLoading}
            className="rounded-xl"
          >
            {isLoading ? 'Deleting...' : confirmText}
          </Button>
        );
      case 'archive':
        return (
          <Button
            onClick={onConfirm}
            variant="archiveOutline"
            disabled={isLoading}
            className="rounded-xl"
          >
            {isLoading ? 'Archiving...' : confirmText}
          </Button>
        );
      default:
        return (
          <Button
            onClick={onConfirm}
            variant="primary"
            disabled={isLoading}
            className="rounded-xl"
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-md"
        onKeyDown={handleKeyDown}
        aria-describedby="confirm-description"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {getIcon()}
            <DialogTitle className="text-lg font-semibold text-white">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription 
            id="confirm-description"
            className="text-white/80 leading-relaxed"
          >
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            onClick={onClose}
            variant="destructiveOutline"
            disabled={isLoading}
            className="rounded-xl"
          >
            {cancelText}
          </Button>
          {getConfirmButton()}
        </div>
      </DialogContent>
    </Dialog>
  );
}