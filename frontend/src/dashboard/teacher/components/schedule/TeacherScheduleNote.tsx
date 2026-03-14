/**
 * TeacherScheduleNote
 * -------------------
 * Displays the schedule note inside a dashboard-styled information card.
 */
import { AlertCircle } from "lucide-react";

export function TeacherScheduleNote() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-700">
          <AlertCircle className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm text-white">
            <strong>Note:</strong> This schedule is based on the school timetable. If you need changes, contact the school admin.
          </p>
        </div>
      </div>
    </div>
  );
}

