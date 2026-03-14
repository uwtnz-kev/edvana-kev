// Renders the page-level header for the exam edit view.
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_SUBJECT_ICON_THEME,
  SUBJECT_ICON_THEME,
} from "@/dashboard/teacher/components/exams/ExamsTheme";

type Props = {
  subjectName: string;
  onBack: () => void;
};

export function TeacherExamEditHeader({ subjectName, onBack }: Props) {
  const theme = SUBJECT_ICON_THEME[subjectName] ?? DEFAULT_SUBJECT_ICON_THEME;

  return (
    <header className="teacher-panel-surface rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={onBack}
            className="rounded-2xl border border-white/20 bg-white/15 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-[var(--text-secondary)]" />
            Back
          </Button>

          <div
            className={`h-14 w-14 rounded-2xl border border-white/20 flex items-center justify-center ${theme.bg}`}
          >
            <Pencil className={`h-7 w-7 ${theme.text}`} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Edit Exam</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Update exam details and save changes.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
        Subject: {subjectName}
      </div>
    </header>
  );
}

