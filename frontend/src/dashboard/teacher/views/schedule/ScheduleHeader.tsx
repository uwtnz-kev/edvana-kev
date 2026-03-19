/** Renders the schedule workspace header in the shared teacher dashboard style. */
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";

type Props = {
  showBack?: boolean;
  onBack?: () => void;
};

export function ScheduleHeader({ showBack = false, onBack }: Props) {
  const theme = getSubjectIconTheme("schedule");

  return (
    <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {showBack ? (
          <Button
            type="button"
            onClick={onBack}
            className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : null}
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}>
          <CalendarDays className={`h-6 w-6 ${theme.iconClass}`} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Teaching Schedule</h1>
          <p className="mt-1 text-[var(--text-secondary)]">Your weekly timetable across classes</p>
        </div>
      </div>
    </header>
  );
}

