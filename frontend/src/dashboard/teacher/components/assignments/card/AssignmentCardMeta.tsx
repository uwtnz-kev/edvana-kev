// Renders subject, status, and scheduling metadata for the assignment card.
import { CalendarDays, Clock3 } from "lucide-react";
import type { TeacherAssignment } from "../AssignmentsTypes";
import { formatAssignmentDate } from "./assignmentCardHelpers";

type Props = { assignment: TeacherAssignment };

function Chip({ className = "", label }: { className?: string; label: string }) {
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] ${className}`}>{label}</span>;
}

function Dot() {
  return <span className="shrink-0 text-white/35">&bull;</span>;
}

export function AssignmentCardMeta({ assignment }: Props) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1 overflow-hidden">
        <Chip label={assignment.subject} className="border-white/20 bg-white/10 text-white" />
        <Chip label={assignment.classLabel} className="border-white/20 bg-white/10 text-white" />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/80">
        <span className="inline-flex min-w-0 items-center gap-1"><CalendarDays className="h-3 w-3 shrink-0 text-white/60" /><span className="truncate">Due: {formatAssignmentDate(assignment.dueAt)}</span></span>
        <Dot />
        <span className="inline-flex min-w-0 items-center gap-1"><Clock3 className="h-3 w-3 shrink-0 text-white/60" /><span className="truncate">Est: {assignment.estimatedMinutes} min</span></span>
        <Dot />
        <span className="truncate">Submissions: {assignment.totalSubmissions}</span>
        <Dot />
        <span className="truncate">Pending: {assignment.pendingToGrade}</span>
      </div>
    </div>
  );
}
