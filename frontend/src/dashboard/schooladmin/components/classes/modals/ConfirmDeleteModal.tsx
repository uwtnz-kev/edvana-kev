import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  itemName: string;
  itemType: 'level' | 'grade' | 'section';
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName,
  itemType
}: ConfirmDeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-white/80">
            {description}
          </p>
          
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="text-red-300 text-sm">
              <strong>Warning:</strong> This action cannot be undone. 
              {itemType === 'level' && ' All grades and sections within this level will also be deleted.'}
              {itemType === 'grade' && ' All sections within this grade will also be deleted.'}
              {itemType === 'section' && ' All student assignments to this section will be removed.'}
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white font-medium">
              {itemType.charAt(0).toUpperCase() + itemType.slice(1)}: <span className="text-red-300">{itemName}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-red-500/10 border-red-500/40 text-red-500 hover:bg-red-500/20 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-red-700 hover:bg-red-800 text-white rounded-xl"
          >
            Delete {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}