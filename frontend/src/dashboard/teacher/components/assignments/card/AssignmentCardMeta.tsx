// Renders subject, status, and scheduling metadata for the assignment card.
import { CalendarDays, Clock3 } from "lucide-react";
import type { TeacherAssignment } from "../AssignmentsTypes";
import { formatAssignmentDate, getAssignmentStatusChipLabel, getAssignmentStatusClass } from "./assignmentCardHelpers";

type Props = { assignment: TeacherAssignment };

function Chip({ className = "", label }: { className?: string; label: string }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${className}`}>{label}</span>;
}

export function AssignmentCardMeta({ assignment }: Props) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Chip label={assignment.subject} className="bg-white/10 border-white/20 text-white" />
        <Chip label={assignment.classLabel} className="bg-white/10 border-white/20 text-white" />
        <Chip label={getAssignmentStatusChipLabel(assignment.status)} className={getAssignmentStatusClass(assignment.status)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-white/80"><CalendarDays className="h-4 w-4 text-white/60" /><span>Due: {formatAssignmentDate(assignment.dueAt)}</span></div>
        <div className="flex items-center gap-2 text-white/80"><Clock3 className="h-4 w-4 text-white/60" /><span>Est: {assignment.estimatedMinutes} min</span></div>
        <div className="text-white/80">Submissions: {assignment.totalSubmissions}</div>
        <div className="text-white/80">Pending to grade: {assignment.pendingToGrade}</div>
      </div>
    </>
  );
}
