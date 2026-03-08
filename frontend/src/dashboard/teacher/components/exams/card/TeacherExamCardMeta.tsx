// Renders the status chips and key exam metadata rows.
import { CalendarDays, Clock3, HelpCircle } from "lucide-react";
import type { TeacherExam } from "../examsTypes";
import { formatExamDate, getExamStatusChipClass, getExamStatusLabel } from "./teacherExamCardHelpers";

type Props = {
  exam: TeacherExam;
};

function Chip({ label, className = "" }: { label: string; className?: string }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${className}`}>{label}</span>;
}

export function TeacherExamCardMeta({ exam }: Props) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Chip label={exam.subject} className="bg-white/10 border-white/20 text-white" />
        <Chip label={exam.classLabel} className="bg-white/10 border-white/20 text-white" />
        <Chip label={getExamStatusLabel(exam.status)} className={getExamStatusChipClass(exam.status)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-white/80"><CalendarDays className="h-4 w-4 text-white/60" /><span>Scheduled: {formatExamDate(exam.scheduledAt)}</span></div>
        <div className="flex items-center gap-2 text-white/80"><Clock3 className="h-4 w-4 text-white/60" /><span>Duration: {exam.durationMinutes} min</span></div>
        <div className="text-white/80">Questions: {exam.totalQuestions}</div>
        <div className="flex items-center gap-2 text-white/80"><HelpCircle className="h-4 w-4 text-white/60" /><span>Max Score: {exam.maxScore ?? "-"}</span></div>
      </div>
    </>
  );
}
