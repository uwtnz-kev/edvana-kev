// Renders the status chips and key exam metadata rows.
import { CalendarDays, Clock3, FolderOpen, TrendingUp } from "lucide-react";
import type { TeacherExam } from "../ExamsTypes";
import { getBaseExamSubmissionCount, getExamPreviewRoster } from "../preview/examPreviewStudentData";
import { useTeacherExamSubmissionTotal } from "../store/examSubmissionRecords";
import { formatExamDate, getExamDerivedStatusLabel, getExamStatusChipClass } from "./teacherExamCardHelpers";

type Props = {
  exam: TeacherExam;
};

function Chip({ label, className = "" }: { label: string; className?: string }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${className}`}>{label}</span>;
}

export function TeacherExamCardMeta({ exam }: Props) {
  const roster = getExamPreviewRoster(exam);
  const totalSubmissions = useTeacherExamSubmissionTotal(exam.id, getBaseExamSubmissionCount(exam, roster.length));
  const submissionRate = roster.length > 0 ? `${Math.round((Math.min(totalSubmissions, roster.length) / roster.length) * 100)}%` : "0%";

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap gap-2">
        <Chip label={exam.subject} className="bg-white/10 border-white/20 text-white" />
        <Chip label={exam.classLabel} className="bg-white/10 border-white/20 text-white" />
        <Chip label={getExamDerivedStatusLabel(exam)} className={getExamStatusChipClass(exam)} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/80">
        <span className="inline-flex min-w-0 items-center gap-1"><CalendarDays className="h-3 w-3 shrink-0 text-white/60" /><span className="truncate">Close: {formatExamDate(exam.scheduledAt)}</span></span>
        <span className="shrink-0 text-white/35">&bull;</span>
        <span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3 shrink-0 text-white/60" /><span>{exam.totalAttempts} attempt{exam.totalAttempts === 1 ? "" : "s"}</span></span>
        <span className="shrink-0 text-white/35">&bull;</span>
        <span className="inline-flex items-center gap-1"><FolderOpen className="h-3 w-3 shrink-0 text-white/60" /><span>Submissions: {Math.min(totalSubmissions, roster.length)}</span></span>
        <span className="shrink-0 text-white/35">&bull;</span>
        <span className="inline-flex items-center gap-1"><TrendingUp className="h-3 w-3 shrink-0 text-white/60" /><span>Rate: {submissionRate}</span></span>
      </div>
    </div>
  );
}
