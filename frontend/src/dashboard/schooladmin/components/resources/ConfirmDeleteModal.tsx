import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Resource } from '@/shared/mocks/schooladmin/mockData';

interface ConfirmDeleteModalProps {
  resource: Resource | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (resource: Resource) => void;
}

export default function ConfirmDeleteModal({
  resource,
  open,
  onOpenChange,
  onConfirm
}: ConfirmDeleteModalProps) {
  if (!resource) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(resource);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/15 backdrop-blur-xl border-white/25 text-white rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            Delete Resource
          </DialogTitle>
          <DialogDescription className="text-white/70 pt-2">
            This action cannot be undone. The resource will be permanently deleted from the system.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-white font-medium mb-2">Resource to be deleted:</h4>
            <div className="space-y-1 text-sm">
              <div className="text-white">
                <span className="text-white/70">Name:</span> {resource.name}
              </div>
              <div className="text-white">
                <span className="text-white/70">Subject:</span> {resource.subjectName}
              </div>
              <div className="text-white">
                <span className="text-white/70">Type:</span> {resource.type}
              </div>
              <div className="text-white">
                <span className="text-white/70">Downloads:</span> {resource.downloads || 0}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button
            type="button"
            variant="destructiveOutline"
            onClick={handleCancel}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            className="flex-1"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Resource
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}