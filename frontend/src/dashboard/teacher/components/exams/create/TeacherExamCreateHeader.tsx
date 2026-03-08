/**
 * TeacherExamCreateHeader
 * -----------------------
 * Renders the header for the teacher dashboard e xa ms c re at e feature.
 */
import { ArrowLeft, ClipboardPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUBJECT_ICON_THEME } from "../examsTheme";

type Props = {
  subjectName: string;
  onBack: () => void;
};

export function TeacherExamCreateHeader({ subjectName, onBack }: Props) {
  const theme =
    (subjectName ? SUBJECT_ICON_THEME[subjectName] : null) ?? {
      bg: "bg-teal-500/20",
      text: "text-teal-700",
    };

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

          <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${theme.bg}`}>
            <ClipboardPlus className={`h-7 w-7 ${theme.text}`} />
          </div>

          <div>
            <h1 className="text-[#3B240F] text-2xl sm:text-3xl font-bold">Create Exam</h1>
            <p className="text-[#3B240F]/70 text-sm mt-1">Subject: {subjectName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

