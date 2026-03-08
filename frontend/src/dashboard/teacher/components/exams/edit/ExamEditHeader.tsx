// Renders the subject display block for the exam edit form.
import { BookOpen } from "lucide-react";
import { getExamEditTheme } from "./examEditHelpers";

type Props = { subjectName: string };

export function ExamEditHeader({ subjectName }: Props) {
  const theme = getExamEditTheme(subjectName);

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm text-[#3B240F]/70">Subject</label>
      <div className="h-12 w-full rounded-2xl border border-white/20 bg-white/10 px-3 inline-flex items-center gap-2">
        <span className={`h-7 w-7 rounded-xl inline-flex items-center justify-center ${theme.bg} ${theme.text}`}>
          <BookOpen className="h-4 w-4" />
        </span>
        <span className="text-[#3B240F] text-sm font-medium truncate">{subjectName}</span>
      </div>
    </div>
  );
}
