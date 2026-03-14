/**
 * TeacherSubjectsHeader
 * ---------------------
 * Renders the header for the teacher dashboard subjects feature.
 */
import { ArrowLeft, BookOpen } from "lucide-react";
import type { SubjectTheme } from "@/dashboard/teacher/components/shared";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import { Button } from "@/components/ui/button";

type Props = {
  title?: string;
  subtitle: string;
  showBack?: boolean;
  onBack?: () => void;
  theme?: SubjectTheme;
};

export function TeacherSubjectsHeader({
  title = "Subjects",
  subtitle,
  showBack = false,
  onBack,
  theme,
}: Props) {
  const iconTheme = theme ?? getSubjectIconTheme("subjects");

  return (
    <header className="teacher-panel-surface rounded-2xl px-6 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start">
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
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconTheme.bgClass}`}>
            <BookOpen className={`h-6 w-6 ${iconTheme.iconClass}`} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            <p className="mt-1 text-[var(--text-secondary)]">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
