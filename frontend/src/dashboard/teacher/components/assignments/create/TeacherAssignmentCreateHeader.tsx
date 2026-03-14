/**
 * TeacherAssignmentCreateHeader
 * -----------------------------
 * Renders the header for the teacher dashboard a ss ig nm en ts c re at e feature.
 */
import { ArrowLeft, ClipboardPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSubjectIconTheme } from "../../shared/subjectIconTheme";

type Props = {
  subjectName: string;
  onBack: () => void;
};

export function TeacherAssignmentCreateHeader({ subjectName, onBack }: Props) {
  const theme = getSubjectIconTheme(subjectName);

  return (
    <header className="teacher-panel-surface rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={onBack}
            className="bg-white/15 hover:bg-white/20 text-white border border-white/20 rounded-2xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2 text-white" />
            Back
          </Button>

          <div className={`h-14 w-14 rounded-xl p-3 flex items-center justify-center ${theme.bgClass}`}>
            <ClipboardPlus className={`h-7 w-7 ${theme.iconClass}`} />
          </div>

          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">Create Assignment</h1>
            <p className="text-white text-sm mt-1">Subject: {subjectName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}




