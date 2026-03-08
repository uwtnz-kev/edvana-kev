// Renders the question builder edit header with back navigation and subject context.
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SubjectTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";

type Props = {
  title: string;
  totalPoints: number;
  theme: SubjectTheme;
  onBack: () => void;
};

export function QuestionBuilderHeader({ title, totalPoints, theme, onBack }: Props) {
  return (
    <section className="rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Button type="button" onClick={onBack} className="rounded-2xl border border-white/25 bg-white/20 text-[#3B240F] hover:bg-white/30">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${theme.bg}`}>
            <BookOpen className={`h-6 w-6 ${theme.iconText}`} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#3B240F]">{title}</h1>
            <p className="text-sm text-[#3B240F]/70">Update the question set for this published assessment.</p>
          </div>
        </div>
        <div className="rounded-xl border border-white/20 bg-white/20 px-4 py-2 text-sm text-[#3B240F]">
          Total Points: <span className="font-semibold">{totalPoints}</span>
        </div>
      </div>
    </section>
  );
}
