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

export function AssignmentCardActions({ assignment, onDelete, onDuplicate, onEdit, onPreview, onPublish, onRepublish }: Props) {
  const publishDisabled = assignment.status === "closed";

  return (
    <div className="flex flex-wrap gap-2">
      <Button type="button" onClick={() => onPreview(assignment.id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl transition-all duration-200"><Eye className="h-4 w-4 mr-2 text-[var(--text-secondary)]" />Preview</Button>
      <Button type="button" onClick={() => onDuplicate(assignment.id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl transition-all duration-200"><Files className="h-4 w-4 mr-2 text-[var(--text-secondary)]" />Duplicate</Button>
      <Button type="button" onClick={() => onPublish(assignment.id)} disabled={publishDisabled} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl disabled:opacity-50 transition-all duration-200"><Send className="h-4 w-4 mr-2 text-emerald-300" />Publish</Button>
      {assignment.status === "closed" ? <Button type="button" onClick={onRepublish} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl transition-all duration-200"><RotateCcw className="h-4 w-4 mr-2 text-sky-300" />Republish</Button> : null}
      <Button type="button" onClick={() => onEdit(assignment.id)} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl"><Pencil className="h-4 w-4 mr-2 text-[var(--accent-primary)]" />Edit</Button>
      <Button type="button" onClick={onDelete} className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl transition-all duration-200"><Trash2 className="h-4 w-4 mr-2 text-red-300" />Delete</Button>
    </div>
  );
}
