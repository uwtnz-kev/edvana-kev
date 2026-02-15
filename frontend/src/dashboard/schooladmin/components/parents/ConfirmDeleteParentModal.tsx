import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Parent, mockStudents } from '@/shared/mocks/schooladmin/mockData';

interface ConfirmDeleteParentModalProps {
  parent: Parent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (parent: Parent) => void;
}

export default function ConfirmDeleteParentModal({
  parent,
  open,
  onOpenChange,
  onConfirm
}: ConfirmDeleteParentModalProps) {
  if (!parent) return null;

  const linkedStudents = mockStudents.filter(student => parent.studentIds.includes(student.id));

  const handleConfirm = () => {
    onConfirm(parent);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange(false);
    }
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md bg-white/15 backdrop-blur-xl border border-white/20 text-white"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-semibold flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            Delete Parent
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Parent Info */}
          <div className="bg-white/10 rounded-xl p-4 border border-white/20">
            <div className="font-medium text-white mb-2">
              {parent.firstName} {parent.lastName}
            </div>
            <div className="text-sm text-white/70">
              {parent.email}
            </div>
            <div className="text-sm text-white/70">
              {parent.phone}
            </div>
          </div>

          {/* Warning Message */}
          <div className="flex items-start gap-3 p-4 rounded-xl border bg-red-500/10 border-red-500/30">
            <AlertTriangle className="w-5 h-5 mt-0.5 text-red-400" />
            <div className="text-sm">
              <div className="text-white font-medium mb-1">
                This action cannot be undone!
              </div>
              <div className="text-white/70">
                Deleting this parent will permanently remove their account and all associated data. 
                Student links will be broken and cannot be recovered.
              </div>
            </div>
          </div>

          {/* Linked Students Warning */}
          {linkedStudents.length > 0 && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-red-400">
                ⚠️ This will affect {linkedStudents.length} linked student{linkedStudents.length > 1 ? 's' : ''}
              </div>
              <div className="flex flex-wrap gap-2">
                {linkedStudents.map((student) => (
                  <Badge
                    key={student.id}
                    variant="secondary"
                    className="bg-red-500/20 text-red-400 border border-red-500/40"
                  >
                    {student.firstName} {student.lastName} ({student.grade})
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <strong>Impact:</strong> These students will lose their parent connection. 
                Emergency contact information may be lost. Consider archiving instead of deleting.
              </div>
            </div>
          )}

          {/* Alternative Suggestion */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
            <div className="text-sm text-amber-200">
              <strong>💡 Consider archiving instead:</strong> Archiving preserves all data while hiding the parent from active lists. 
              You can always unarchive later if needed.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-white/20">
            <Button
              type="button"
              variant="destructiveOutline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant="destructive"
              className="bg-red-700 hover:bg-red-800 text-white rounded-xl"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Permanently
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}