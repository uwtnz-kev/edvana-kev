/** Orchestrates the teacher assignment preview modal layout. */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AssignmentPreviewBody } from "./preview/AssignmentPreviewBody";
import { AssignmentPreviewFooter } from "./preview/AssignmentPreviewFooter";
import { AssignmentPreviewHeader } from "./preview/AssignmentPreviewHeader";
import type { TeacherAssignment } from "./assignmentsTypes";

type Props = {
  assignment: TeacherAssignment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TeacherAssignmentPreviewModal({ assignment, open, onOpenChange }: Props) {
  if (!assignment) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={[
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100vw-2rem)] sm:w-full max-w-6xl",
          "max-h-[88vh] overflow-hidden",
          "bg-white/15 backdrop-blur-xl border border-white/25 text-white rounded-2xl shadow-xl",
          "p-0",
        ].join(" ")}
      >
        <div className="flex flex-col max-h-[88vh]">
          <AssignmentPreviewHeader title={assignment.title} />
          <div className="px-6 py-6 overflow-y-auto overscroll-contain max-h-[calc(88vh-72px)]">
            <div className="space-y-6">
              <AssignmentPreviewBody assignment={assignment} />
              <AssignmentPreviewFooter onClose={() => onOpenChange(false)} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
