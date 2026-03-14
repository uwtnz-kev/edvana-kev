/**
 * TeacherExamsStats
 * -----------------
 * Renders summary metrics for the teacher dashboard e xa ms feature.
 */
import { CalendarClock, CheckCircle2, ClipboardCheck, FileText } from "lucide-react";
import type { ReactNode } from "react";

export interface TeacherExamsStatsData {
  total: number;
  published: number;
  drafts: number;
  scheduledSoon: number;
}

type Props = {
  stats: TeacherExamsStatsData;
};

function StatCard({
  label,
  value,
  icon,
  iconClassName,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconClassName: string;
}) {
  return (
    <div className="group rounded-2xl teacher-panel-surface p-4 teacher-panel-hover-lift">
      <div className="flex items-center gap-3">
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${iconClassName}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-white/60">{label}</p>
          <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function TeacherExamsStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total"
        value={stats.total}
        icon={<ClipboardCheck className="h-5 w-5" />}
        iconClassName="rounded-xl p-3 bg-[var(--sidebar-item-active)] text-[var(--accent-primary)]"
      />
      <StatCard
        label="Published"
        value={stats.published}
        icon={<CheckCircle2 className="h-5 w-5" />}
        iconClassName="rounded-xl p-3 bg-emerald-500/15 text-emerald-300"
      />
      <StatCard
        label="Drafts"
        value={stats.drafts}
        icon={<FileText className="h-5 w-5" />}
        iconClassName="rounded-xl p-3 bg-blue-500/15 text-blue-300"
      />
      <StatCard
        label="Scheduled Soon"
        value={stats.scheduledSoon}
        icon={<CalendarClock className="h-5 w-5" />}
        iconClassName="rounded-xl p-3 bg-amber-500/15 text-amber-300"
      />
    </div>
  );
}



