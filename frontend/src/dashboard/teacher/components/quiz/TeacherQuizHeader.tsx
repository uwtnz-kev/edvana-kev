/**
 * TeacherQuizHeader
 * -----------------
 * Renders the header for the teacher dashboard q ui z feature.
 */
import { ArrowLeft, ClipboardList, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUBJECT_ICON_THEME } from "./QuizTheme";

type Props = {
  title?: string;
  subtitle: string;
  subjectName?: string | null;
  showBack: boolean;
  showCreate: boolean;
  onBack: () => void;
  canCreate: boolean;
  onCreate: () => void;
};

export function TeacherQuizHeader({
  title = "Quiz",
  subtitle,
  subjectName,
  showBack,
  showCreate,
  onBack,
  canCreate,
  onCreate,
}: Props) {
  const theme =
    (subjectName ? SUBJECT_ICON_THEME[subjectName] : null) ?? {
      bg: "bg-white/10",
      text: "text-[var(--accent-primary)]",
    };

  return (
    <header className="teacher-panel-surface rounded-2xl px-6 py-5">
      <div className={`flex flex-col sm:flex-row sm:items-center gap-4 ${showCreate ? "sm:justify-between" : "sm:justify-start"}`}>
        <div className="flex items-center gap-4">
          {showBack ? (
            <Button
              type="button"
              onClick={onBack}
              className="bg-white/10 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          ) : null}

          <div className={`h-12 w-12 rounded-xl p-3 flex items-center justify-center ${theme.bg}`}>
            <ClipboardList className={`h-6 w-6 ${theme.text}`} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            <p className="mt-1 text-[var(--text-secondary)]">{subtitle}</p>
          </div>
        </div>

        {showCreate ? (
          <Button
            type="button"
            onClick={onCreate}
            disabled={!canCreate}
            className="bg-white/15 hover:bg-white/30 hover:shadow-sm transition-all duration-200 text-white border border-white/20 rounded-2xl disabled:opacity-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        ) : null}
      </div>
    </header>
  );
}


