// Renders metadata chips and summary values for the teacher quiz card.
import { CalendarDays, FolderOpen, GraduationCap, TrendingUp } from "lucide-react";
import type { TeacherQuiz } from "../QuizTypes";
import { getBaseQuizSubmissionCount, getQuizPreviewRoster } from "../preview/quizPreviewStudentData";
import { useTeacherQuizSubmissionTotal } from "../store/quizSubmissionRecords";
import { formatQuizDate, getQuizDerivedStatusLabel, getQuizStatusClass } from "./quizCardHelpers";

type Props = { quiz: TeacherQuiz };

function Chip({ label, className = "" }: { className?: string; label: string }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${className}`}>{label}</span>;
}

export function QuizCardMeta({ quiz }: Props) {
  const roster = getQuizPreviewRoster(quiz);
  const totalSubmissions = useTeacherQuizSubmissionTotal(quiz.id, getBaseQuizSubmissionCount(quiz, roster.length));
  const submissionRate = roster.length > 0 ? `${Math.round((Math.min(totalSubmissions, roster.length) / roster.length) * 100)}%` : "0%";

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap gap-2">
        <Chip label={quiz.subject} className="bg-white/10 border-white/20 text-white" />
        <Chip label={quiz.classLabel} className="bg-white/10 border-white/20 text-white" />
        <Chip label={getQuizDerivedStatusLabel(quiz)} className={getQuizStatusClass(quiz)} />
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-white/80">
        <span className="inline-flex min-w-0 items-center gap-1"><CalendarDays className="h-3 w-3 shrink-0 text-white/60" /><span className="truncate">Due: {formatQuizDate(quiz.dueAt)}</span></span>
        <span className="shrink-0 text-white/35">&bull;</span>
        <span className="inline-flex items-center gap-1"><GraduationCap className="h-3 w-3 shrink-0 text-white/60" /><span>{quiz.totalAttempts} attempt{quiz.totalAttempts === 1 ? "" : "s"}</span></span>
        <span className="shrink-0 text-white/35">&bull;</span>
        <span className="inline-flex items-center gap-1"><FolderOpen className="h-3 w-3 shrink-0 text-white/60" /><span>Submissions: {Math.min(totalSubmissions, roster.length)}</span></span>
        <span className="shrink-0 text-white/35">&bull;</span>
        <span className="inline-flex items-center gap-1"><TrendingUp className="h-3 w-3 shrink-0 text-white/60" /><span>Rate: {submissionRate}</span></span>
      </div>
    </div>
  );
}
