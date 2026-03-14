// Renders the subject display and section heading for the quiz edit form.
import { BookOpen } from "lucide-react";
import { getQuizEditTheme } from "./quizEditHelpers";

type Props = { subjectName: string };

export function QuizEditHeader({ subjectName }: Props) {
  const theme = getQuizEditTheme(subjectName);

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm text-[var(--text-secondary)]">Subject</label>
      <div className="h-12 w-full rounded-2xl border border-white/20 bg-white/10 px-3 inline-flex items-center gap-2">
        <span className={`h-7 w-7 rounded-xl inline-flex items-center justify-center ${theme.bg} ${theme.text}`}>
          <BookOpen className="h-4 w-4" />
        </span>
        <span className="truncate text-sm font-medium text-white">{subjectName}</span>
      </div>
    </div>
  );
}
