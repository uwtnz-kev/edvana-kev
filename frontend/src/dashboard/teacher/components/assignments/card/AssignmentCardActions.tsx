/** Renders assignment card actions through the shared assessment action row. */
import { Eye, RotateCcw, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destructiveActionButtonClass, destructiveActionIconClass } from "@/dashboard/teacher/components/shared/destructiveActionStyles";
import type { TeacherAssignment } from "../AssignmentsTypes";

type Props = {
  assignment: TeacherAssignment;
  onPreview: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPublish: (id: string) => void;
  onEdit: (id: string) => void;
  onRepublish: () => void;
  onDelete: () => void;
};

const assignmentActionButtonClass =
  "inline-flex items-center justify-center !h-8 !min-h-[2rem] !min-w-[90px] !gap-1.5 !rounded-md !px-2.5 !py-0 !text-xs font-medium";

export function AssignmentCardActions({ assignment, onDelete, onDuplicate, onEdit, onPreview, onPublish, onRepublish }: Props) {
  const showDraftActions = assignment.status === "draft";

  return (
    <div className="flex flex-nowrap items-center gap-1.5">
      <Button type="button" onClick={() => onPreview(assignment.id)} className={`${assignmentActionButtonClass} border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/20`}><Eye className="h-3.5 w-3.5 text-sky-300" />Preview</Button>
      {showDraftActions ? <Button type="button" onClick={() => onPublish(assignment.id)} className={`${assignmentActionButtonClass} border border-white/10 bg-emerald-500/15 text-white transition-all duration-200 hover:bg-emerald-500/25`}><Send className="h-3.5 w-3.5 text-emerald-300" />Publish</Button> : null}
      {assignment.status === "closed" ? <Button type="button" onClick={onRepublish} className={`${assignmentActionButtonClass} border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/20`}><RotateCcw className="h-3.5 w-3.5 text-sky-300" />Republish</Button> : null}
      {showDraftActions ? <Button type="button" onClick={onDelete} className={`${assignmentActionButtonClass} ${destructiveActionButtonClass} transition-all duration-200`}><Trash2 className={`h-3.5 w-3.5 ${destructiveActionIconClass}`} />Delete</Button> : null}
    </div>
  );
}
