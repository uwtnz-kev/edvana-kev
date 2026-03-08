/** Renders the metadata cards and badges inside the assignment preview modal. */
import { BookOpen, Calendar, ClipboardList, Clock3, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  formatAssignmentDate,
  getAssignmentPreviewStatus,
  getAssignmentStatusClass,
} from "./assignmentPreviewHelpers";
import type { TeacherAssignment } from "../assignmentsTypes";

type Props = {
  assignment: TeacherAssignment;
};

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
};

function PreviewStatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-4">
      <div className="text-white/70 text-xs">{label}</div>
      <div className="mt-2 inline-flex items-center gap-2 text-white">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/10">
          <Icon className="h-5 w-5 text-white/80" />
        </div>
        <span>{value}</span>
      </div>
    </div>
  );
}

export function AssignmentPreviewBody({ assignment }: Props) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/10">
          <BookOpen className="h-5 w-5 text-white/80" />
        </div>
        <Badge className="bg-white/10 text-white border border-white/20 rounded-full px-2 py-1 text-xs font-medium">
          {assignment.subject}
        </Badge>
        <Badge className="bg-white/10 text-white border border-white/20 rounded-full px-2 py-1 text-xs font-medium">
          {assignment.classLabel}
        </Badge>
        <Badge
          className={`${getAssignmentStatusClass(assignment.status)} rounded-full px-2 py-1 text-xs font-medium`}
        >
          {getAssignmentPreviewStatus(assignment.status)}
        </Badge>
      </div>

      <div className="border-t border-white/20 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <PreviewStatCard
            icon={Calendar}
            label="Due Date"
            value={formatAssignmentDate(assignment.dueAt)}
          />
          <PreviewStatCard
            icon={Clock3}
            label="Estimated Minutes"
            value={assignment.estimatedMinutes}
          />
          <PreviewStatCard
            icon={FolderOpen}
            label="Submissions"
            value={assignment.totalSubmissions}
          />
          <PreviewStatCard
            icon={ClipboardList}
            label="Pending to Grade"
            value={assignment.pendingToGrade}
          />
        </div>
      </div>
    </>
  );
}
