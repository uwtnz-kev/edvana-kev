// Renders metadata chips and summary values for the teacher quiz card.
import { CalendarDays, Clock3, HelpCircle, Layers } from "lucide-react";
import type { TeacherQuiz } from "../quizTypes";
import { formatQuizDate, getQuizStatusClass, getQuizStatusLabel } from "./quizCardHelpers";

type Props = { quiz: TeacherQuiz };

function Chip({ label, className = "" }: { className?: string; label: string }) {
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${className}`}>{label}</span>;
}

export function QuizCardMeta({ quiz }: Props) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Chip label={quiz.subject} className="bg-white/10 border-white/20 text-white" />
        <Chip label={quiz.classLabel} className="bg-white/10 border-white/20 text-white" />
        <Chip label={getQuizStatusLabel(quiz.status)} className={getQuizStatusClass(quiz.status)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-white/80"><CalendarDays className="h-4 w-4 text-white/60" /><span>Due: {formatQuizDate(quiz.dueAt)}</span></div>
        <div className="flex items-center gap-2 text-white/80"><Clock3 className="h-4 w-4 text-white/60" /><span>Duration: {quiz.durationMinutes} min</span></div>
        <div className="flex items-center gap-2 text-white/80"><Layers className="h-4 w-4 text-white/60" /><span>Questions: {quiz.totalQuestions}</span></div>
        <div className="flex items-center gap-2 text-white/80"><HelpCircle className="h-4 w-4 text-white/60" /><span>Max Score: {quiz.maxScore ?? "-"}</span></div>
      </div>
    </>
  );
}
