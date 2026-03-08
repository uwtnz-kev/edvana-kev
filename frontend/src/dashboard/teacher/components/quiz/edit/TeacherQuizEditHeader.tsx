// Renders the page-level header for the quiz edit view.
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_SUBJECT_ICON_THEME,
  SUBJECT_ICON_THEME,
} from "@/dashboard/teacher/components/quiz/QuizTheme";

type Props = {
  subjectName: string;
  onBack: () => void;
};

export function TeacherQuizEditHeader({ subjectName, onBack }: Props) {
  const theme = SUBJECT_ICON_THEME[subjectName] ?? DEFAULT_SUBJECT_ICON_THEME;

  return (
    <header className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={onBack}
            className="bg-white/15 hover:bg-white/20 text-[#3B240F] border border-white/20 rounded-2xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2 text-[#3B240F]/80" />
            Back
          </Button>

          <div
            className={`h-14 w-14 rounded-2xl border border-white/20 flex items-center justify-center ${theme.bg}`}
          >
            <Pencil className={`h-7 w-7 ${theme.text}`} />
          </div>

          <div>
            <h1 className="text-[#3B240F] text-2xl sm:text-3xl font-bold">Edit Quiz</h1>
            <p className="text-[#3B240F]/70 text-sm mt-1">Update quiz details and save changes.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[#3B240F] text-sm font-medium">
        Subject: {subjectName}
      </div>
    </header>
  );
}
