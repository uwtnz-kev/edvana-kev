/** Renders the page header for the assignment edit view. */
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSubjectTheme } from "@/dashboard/teacher/components/shared/subjectTheme";

type Props = {
  subjectId?: string | null;
  subjectName: string;
  onBack: () => void;
};

export function AssignmentEditHeader({ subjectId, subjectName, onBack }: Props) {
  const theme = getSubjectTheme(subjectId ?? "");

  return (
    <header className="teacher-panel-surface rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button type="button" onClick={onBack} className="rounded-2xl border border-white/20 bg-white/15 text-white hover:bg-white/20">
            <ArrowLeft className="mr-2 h-4 w-4 text-[var(--text-secondary)]" />
            Back
          </Button>
          <div className={`h-14 w-14 rounded-2xl border border-white/20 flex items-center justify-center ${theme.bgClass}`}>
            <Pencil className={`h-6 w-6 ${theme.iconClass}`} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Edit Assignment</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">Subject: {subjectName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

