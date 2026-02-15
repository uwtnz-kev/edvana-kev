import React from 'react';
import { AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Level, Grade, SubGrade } from '../types';

interface CascadeDeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemType: 'level' | 'grade' | 'subgrade';
  item: Level | Grade | SubGrade | null;
  cascadeInfo?: {
    gradeCount?: number;
    subGradeCount?: number;
    studentCount?: number;
  };
}

export default function CascadeDeleteModal({
  open,
  onOpenChange,
  onConfirm,
  itemType,
  item,
  cascadeInfo
}: CascadeDeleteModalProps) {
  
  if (!item) {
    return null;
  }
  
  const getDeleteWarningMessage = () => {
    switch (itemType) {
      case 'level':
        return `Deleting this level will permanently remove ${cascadeInfo?.gradeCount || 0} grades and ${cascadeInfo?.subGradeCount || 0} sub-grades, affecting ${cascadeInfo?.studentCount || 0} students.`;
      case 'grade':
        return `Deleting this grade will permanently remove ${cascadeInfo?.subGradeCount || 0} sub-grades, affecting ${cascadeInfo?.studentCount || 0} students.`;
      case 'subgrade':
        return `Deleting this sub-grade will affect ${cascadeInfo?.studentCount || 0} students who will need to be reassigned.`;
      default:
        return 'This action cannot be undone.';
    }
  };

  const getItemTypeLabel = () => {
    switch (itemType) {
      case 'level':
        return 'Level';
      case 'grade':
        return 'Grade';
      case 'subgrade':
        return 'Sub-grade';
      default:
        return 'Item';
    }
  };

  const hasChildren = (cascadeInfo?.gradeCount || 0) > 0 || (cascadeInfo?.subGradeCount || 0) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/15 backdrop-blur-xl border-white/25 text-white rounded-2xl max-w-lg">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          
          <DialogTitle className="text-xl font-semibold text-white">
            Delete {getItemTypeLabel()}?
          </DialogTitle>
          
          <DialogDescription className="text-white/80 mt-2">
            You are about to delete <strong className="text-white">"{item?.name || 'this item'}"</strong>
          </DialogDescription>
        </DialogHeader>

        {/* Warning Message */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 text-sm font-medium mb-2">Warning: Cascade Delete</p>
              <p className="text-white/90 text-sm">{getDeleteWarningMessage()}</p>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        {hasChildren && (
          <div className="bg-white/10 rounded-xl p-4 mb-4">
            <p className="text-white font-medium mb-3">Impact Summary:</p>
            <div className="flex flex-wrap gap-2">
              {cascadeInfo?.gradeCount && cascadeInfo.gradeCount > 0 && (
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  {cascadeInfo.gradeCount} grades will be deleted
                </Badge>
              )}
              {cascadeInfo?.subGradeCount && cascadeInfo.subGradeCount > 0 && (
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  {cascadeInfo.subGradeCount} sub-grades will be deleted
                </Badge>
              )}
              {cascadeInfo?.studentCount && cascadeInfo.studentCount > 0 && (
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                  {cascadeInfo.studentCount} students affected
                </Badge>
              )}
            </div>
          </div>
        )}

        <DialogFooter className="flex gap-3 pt-4">
          <Button
            variant="destructiveOutline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="flex-1"
          >
            Delete {getItemTypeLabel()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}