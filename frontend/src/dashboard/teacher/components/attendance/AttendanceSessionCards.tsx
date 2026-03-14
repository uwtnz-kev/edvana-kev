import { AlertTriangle, CalendarDays, CheckCircle2, ClipboardCheck, Eye, Pencil, Users, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AttendanceSessionSummary } from "./attendanceTypes";

type Props = {
  onEdit: (sessionId: string) => void;
  sessions: AttendanceSessionSummary[];
  onOpen: (sessionId: string) => void;
};

function formatDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function AttendanceSessionCards({ onEdit, sessions, onOpen }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="teacher-panel-surface rounded-2xl p-8 text-center">
        <p className="text-white/70 text-lg">No attendance sessions found</p>
        <p className="text-white/50 text-sm mt-2">Create an attendance list or adjust your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sessions.map((session) => (
        <article
          key={session.id}
          className="group teacher-panel-surface rounded-2xl border border-white/10 p-4 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--sidebar-item-active)] text-[var(--accent-primary)]">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-white">{session.title}</h3>
              <p className="mt-1 truncate text-xs text-white/60">{session.subjectName}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-white/70">
            <div>Class: <span className="text-white">{session.className}</span></div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
              <span>Date: <span className="text-white">{formatDate(session.date)}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-[var(--text-secondary)]" />
              <span>Students: <span className="text-white">{session.totalStudents}</span></span>
            </div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1 text-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Present: {session.presentCount}
              </span>
              <span className="inline-flex items-center gap-1 text-amber-200">
                <AlertTriangle className="h-3.5 w-3.5" />
                Late: {session.lateCount}
              </span>
              <span className="inline-flex items-center gap-1 text-red-200">
                <XCircle className="h-3.5 w-3.5" />
                Absent: {session.absentCount}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-white/10 pt-3">
            <Button
              type="button"
              onClick={() => onEdit(session.id)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl h-8 px-3"
            >
              <Pencil className="mr-1.5 h-3.5 w-3.5 text-[var(--accent-primary)]" />
              Edit
            </Button>
            <Button
              type="button"
              onClick={() => onOpen(session.id)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl h-8 px-3"
            >
              <Eye className="mr-1.5 h-3.5 w-3.5 text-[var(--text-secondary)]" />
              View
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
