import React from 'react';
import { Archive, RotateCcw, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Parent, mockStudents } from '@/shared/mocks/schooladmin/mockData';

interface ConfirmArchiveModalProps {
  parent: Parent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (parent: Parent) => void;
}

export default function ConfirmArchiveModal({
  parent,
  open,
  onOpenChange,
  onConfirm
}: ConfirmArchiveModalProps) {
  if (!parent) return null;

  const isArchiving = parent.status === 'Active';
  const linkedStudents = mockStudents.filter(student => parent.studentIds.includes(student.id));

  const handleConfirm = () => {
    onConfirm(parent);
    onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onOpenChange(false);
    if (e.key === 'Enter') handleConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onKeyDown={handleKeyDown}
        className={[
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100vw-2rem)] sm:w-full max-w-4xl",
          "max-h-[85vh] overflow-hidden",
          "bg-white/15 backdrop-blur-xl border border-white/20 text-white",
          "p-0",
        ].join(" ")}
      >
        <div className="flex flex-col max-h-[85vh]">

          <DialogHeader className="px-6 py-4 border-b border-white/20">
            <DialogTitle className="text-white text-xl font-semibold flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isArchiving ? 'bg-amber-500/20' : 'bg-green-500/20'
              }`}>
                {isArchiving ? (
                  <Archive className="w-6 h-6 text-amber-400" />
                ) : (
                  <RotateCcw className="w-6 h-6 text-green-400" />
                )}
              </div>
              {isArchiving ? 'Archive Parent' : 'Unarchive Parent'}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 py-6 overflow-y-auto overscroll-contain max-h-[calc(85vh-72px)]">
            <div className="space-y-6">

              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="font-medium text-white mb-2">
                  {parent.firstName} {parent.lastName}
                </div>
                <div className="text-sm text-white/70">{parent.email}</div>
                <div className="text-sm text-white/70">{parent.phone}</div>
              </div>

              <div className={`flex items-start gap-3 p-4 rounded-xl border ${
                isArchiving
                  ? 'bg-amber-500/10 border-amber-500/30'
                  : 'bg-green-500/10 border-green-500/30'
              }`}>
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  isArchiving ? 'text-amber-400' : 'text-green-400'
                }`} />
                <div className="text-sm">
                  {isArchiving ? (
                    <>
                      <div className="text-white font-medium mb-1">
                        Are you sure you want to archive this parent?
                      </div>
                      <div className="text-white/70">
                        Archived parents will no longer receive notifications and will be hidden from the active parents list.
                        Student links will remain intact and can be restored by unarchiving.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-white font-medium mb-1">
                        Are you sure you want to unarchive this parent?
                      </div>
                      <div className="text-white/70">
                        This parent will be restored to active status and will start receiving notifications again.
                      </div>
                    </>
                  )}
                </div>
              </div>

              {linkedStudents.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm font-medium text-white">
                    Linked Students ({linkedStudents.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {linkedStudents.map((student) => (
                      <Badge
                        key={student.id}
                        variant="secondary"
                        className="bg-brand-accent/20 text-brand-accent border border-brand-accent/40"
                      >
                        {student.firstName} {student.lastName} ({student.grade})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

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
                  className={`text-white rounded-xl ${
                    isArchiving
                      ? 'bg-amber-500 hover:bg-amber-600'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isArchiving ? (
                    <>
                      <Archive className="w-4 h-4 mr-2" />
                      Archive Parent
                    </>
                  ) : (
                    <>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Unarchive Parent
                    </>
                  )}
                </Button>
              </div>

            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}