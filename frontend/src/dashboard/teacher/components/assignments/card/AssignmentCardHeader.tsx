/** Renders the shared assessment card header for assignments. */
import { ClipboardList } from "lucide-react";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import type { TeacherAssignment } from "../AssignmentsTypes";
import { getAssignmentStatusChipLabel, getAssignmentStatusClass } from "./assignmentCardHelpers";

type Props = { assignment: TeacherAssignment };

function StatusChip({ label, className }: { label: string; className: string }) {
  return <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] ${className}`}>{label}</span>;
}

export function AssignmentCardHeader({ assignment }: Props) {
  const theme = getSubjectIconTheme(assignment.subject);

  return (
    <div className="flex items-start gap-1.5">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg p-1.5 transition-transform duration-200 group-hover:scale-105 ${theme.bgClass}`}>
        <ClipboardList className={`h-3.5 w-3.5 ${theme.iconClass}`} />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className="min-w-0 flex-1 truncate text-xs font-semibold leading-tight text-white">{assignment.title}</h3>
          <StatusChip label={getAssignmentStatusChipLabel(assignment.status)} className={getAssignmentStatusClass(assignment.status)} />
        </div>
      </div>
    </div>
  );
}
