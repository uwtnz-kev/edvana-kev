/** Renders the schedule workspace header in the shared teacher dashboard style. */
import { CalendarDays } from "lucide-react";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";

export function ScheduleHeader() {
  const theme = getSubjectIconTheme("schedule");

  return (
    <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}>
          <CalendarDays className={`h-6 w-6 ${theme.iconClass}`} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[#3B240F]">Teaching Schedule</h1>
          <p className="mt-1 text-[#3B240F]/70">Your weekly timetable across classes</p>
        </div>
      </div>
    </header>
  );
}
