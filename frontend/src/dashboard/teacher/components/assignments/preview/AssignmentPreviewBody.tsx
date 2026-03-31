/** Renders the metadata cards and badges inside the assignment preview page. */
import { BookOpen, Calendar, ClipboardList, FolderOpen, GraduationCap, Shapes, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared";
import { SUBMISSION_METHOD_OPTIONS } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import { useTeacherAssignmentSubmissionTotal } from "../store/assignmentSubmissionRecords";
import {
  formatAssignmentDate,
  getAssignmentPreviewStatus,
  getAssignmentStatusClass,
} from "./assignmentPreviewHelpers";
import { getAssignmentPreviewStudentRecords } from "./assignmentPreviewStudentData";
import type { TeacherAssignment } from "../AssignmentsTypes";

type Props = {
  assignment: TeacherAssignment;
};

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  iconClassName: string;
};

function PreviewStatCard({ icon: Icon, label, value, iconClassName }: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-3.5">
      <div className="text-[11px] text-white/70">{label}</div>
      <div className="mt-1.5 inline-flex items-center gap-2 text-white">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${iconClassName}`}>
          <Icon className="h-4.5 w-4.5" />
        </div>
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}

function getSubmissionMethodsLabel(methods: TeacherAssignment["submissionMethods"]) {
  const labels = methods
    .map((method) => SUBMISSION_METHOD_OPTIONS.find((option) => option.value === method)?.label ?? method)
    .filter((label, index, values) => values.indexOf(label) === index);

  return labels.length > 0 ? labels.join(", ") : "Not set";
}

function getSubmissionRateLabel(assignment: TeacherAssignment) {
  const students = getAssignmentPreviewStudentRecords(assignment);
  if (students.length === 0) return "0%";

  const submittedCount = students.filter((student) => student.submitted).length;
  return `${Math.round((submittedCount / students.length) * 100)}%`;
}

export function AssignmentPreviewBody({ assignment }: Props) {
  const totalSubmissions = useTeacherAssignmentSubmissionTotal(assignment.id, assignment.totalSubmissions);
  const subjectTheme = getSubjectIconTheme(assignment.subject);
  const subjectBorderClass = subjectTheme.ringClass?.replace("ring-", "border-") ?? "border-white/10";
  const classIconClassName = `${subjectBorderClass} ${subjectTheme.bgClass.replace("/15", "/10").replace("/20", "/10")} ${subjectTheme.iconClass}`;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${subjectTheme.bgClass} ${subjectTheme.iconClass} ${subjectBorderClass}`}>
          <BookOpen className="h-5 w-5" />
        </div>
        <Badge className="bg-white/10 text-white border border-white/20 rounded-full px-2 py-1 text-xs font-medium">
          {assignment.subject}
        </Badge>
        <Badge className="bg-white/10 text-white border border-white/20 rounded-full px-2 py-1 text-xs font-medium inline-flex items-center gap-2">
          <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${classIconClassName}`}>
            <GraduationCap className="h-3 w-3" />
          </span>
          {assignment.classLabel}
        </Badge>
        <Badge
          className={`${getAssignmentStatusClass(assignment)} rounded-full px-2 py-1 text-xs font-medium`}
        >
          {getAssignmentPreviewStatus(assignment)}
        </Badge>
      </div>

      <div className="border-t border-white/20 pt-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <PreviewStatCard
            icon={Calendar}
            label="Due Date"
            value={formatAssignmentDate(assignment.dueAt)}
            iconClassName="border-sky-400/20 bg-sky-400/15 text-sky-300"
          />
          <PreviewStatCard
            icon={FolderOpen}
            label="Submissions"
            value={totalSubmissions}
            iconClassName="border-violet-400/20 bg-violet-400/15 text-violet-300"
          />
          {assignment.status !== "draft" ? (
            <PreviewStatCard
              icon={TrendingUp}
              label="Submission Rate"
              value={getSubmissionRateLabel(assignment)}
              iconClassName="border-emerald-400/20 bg-emerald-500/15 text-emerald-300"
            />
          ) : null}
          <PreviewStatCard
            icon={ClipboardList}
            label="Total Points"
            value={assignment.maxScore ?? "Not set"}
            iconClassName="border-indigo-400/20 bg-indigo-400/15 text-indigo-300"
          />
          <PreviewStatCard
            icon={Shapes}
            label="Submission Method"
            value={getSubmissionMethodsLabel(assignment.submissionMethods)}
            iconClassName="border-cyan-400/20 bg-cyan-400/15 text-cyan-300"
          />
        </div>
      </div>
    </>
  );
}
