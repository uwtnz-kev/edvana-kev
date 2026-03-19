/** Renders assignment card actions through the shared assessment action row. */
import { Eye, Files, Pencil, RotateCcw, Send, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  "inline-flex h-8 min-w-[90px] items-center justify-center gap-1.5 rounded-md px-2.5 text-xs font-medium";

export function AssignmentCardActions({ assignment, onDelete, onDuplicate, onEdit, onPreview, onPublish, onRepublish }: Props) {
  const publishDisabled = assignment.status === "closed";

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" onClick={() => onPreview(assignment.id)} className={`${assignmentActionButtonClass} border border-white/10 bg-white/10 text-white transition-all duration-200 hover:bg-white/20`}><Eye className="h-3.5 w-3.5 text-[var(--text-secondary)]" />Preview</Button>
      <Button type="button" onClick={() => onDuplicate(assignment.id)} className={`${assignmentActionButtonClass} border border-white/10 bg-white/10 text-white transition-all duration-200 hover:bg-white/20`}><Files className="h-3.5 w-3.5 text-[var(--text-secondary)]" />Duplicate</Button>
      <Button type="button" onClick={() => onPublish(assignment.id)} disabled={publishDisabled} className={`${assignmentActionButtonClass} border border-white/10 bg-emerald-500/15 text-white transition-all duration-200 hover:bg-emerald-500/25 disabled:opacity-50`}><Send className="h-3.5 w-3.5 text-emerald-300" />Publish</Button>
      {assignment.status === "closed" ? <Button type="button" onClick={onRepublish} className={`${assignmentActionButtonClass} border border-white/10 bg-white/10 text-white transition-all duration-200 hover:bg-white/20`}><RotateCcw className="h-3.5 w-3.5 text-sky-300" />Republish</Button> : null}
      <Button type="button" onClick={() => onEdit(assignment.id)} className={`${assignmentActionButtonClass} border border-white/10 bg-white/10 text-white transition-all duration-200 hover:bg-white/20`}><Pencil className="h-3.5 w-3.5 text-[var(--accent-primary)]" />Edit</Button>
      <Button type="button" onClick={onDelete} className={`${assignmentActionButtonClass} border border-white/10 bg-white/10 text-white transition-all duration-200 hover:bg-white/20`}><Trash2 className="h-3.5 w-3.5 text-red-300" />Delete</Button>
    </div>
  );
}
