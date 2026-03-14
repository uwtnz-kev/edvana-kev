/**
 * TeacherScheduleCard
 * -------------------
 * Renders a single schedule entry using the shared teacher dashboard card styling.
 */
import { BookOpen, MapPin, Users } from "lucide-react";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";

interface TeacherScheduleCardProps {
  subject: string;
  classNameLabel: string;
  room: string;
  variant?: "desktop" | "mobile";
}

export function TeacherScheduleCard({
  subject,
  classNameLabel,
  room,
  variant = "desktop",
}: TeacherScheduleCardProps) {
  const theme = getSubjectIconTheme(subject);
  const isBreakSlot = subject === "Break" || subject === "Lunch Break" || subject === "Free Period";
  const baseClasses = `rounded-xl border border-white/10 bg-white/10 p-2.5 shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/20 hover:shadow-md`;
  const textSize = variant === "mobile" ? "text-xs" : "text-[11px]";
  const titleSize =
    variant === "mobile"
      ? "mb-1 font-medium text-sm"
      : "mb-0.5 text-[13px] font-medium leading-tight";

  return (
    <div className={baseClasses}>
      <div className="mb-1.5 flex items-start gap-2">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${theme.bgClass}`}>
          <BookOpen className={`h-3.5 w-3.5 ${theme.iconClass}`} />
        </div>
        <div className="min-w-0">
          <div className={`text-white ${titleSize}`}>{subject}</div>
          {isBreakSlot ? <span className="inline-flex rounded-full border border-white/15 bg-white/20 px-1.5 py-0.5 text-[10px] font-medium text-white/80">Break</span> : null}
        </div>
      </div>

      {classNameLabel && (
        <div className={`mb-0.5 flex items-center gap-1 text-white ${textSize}`}>
          <Users className="h-3 w-3 shrink-0" />
          <span>{classNameLabel}</span>
        </div>
      )}

      {room && (
        <div className={`flex items-center gap-1 text-white ${textSize}`}>
          <MapPin className="h-3 w-3 shrink-0" />
          <span>{room}</span>
        </div>
      )}
    </div>
  );
}
