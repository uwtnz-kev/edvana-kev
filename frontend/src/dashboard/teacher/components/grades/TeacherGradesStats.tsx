/**
 * TeacherGradesStats
 * ------------------
 * Renders summary metrics for the teacher dashboard g ra de s feature.
 */
import { ArrowDownRight, ArrowUpRight, CheckCircle2, ClipboardCheck } from "lucide-react";
import type { ReactNode } from "react";
import type { TeacherGradesStatsData } from "./gradesTypes";

type Props = {
  stats: TeacherGradesStatsData;
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
    <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white/20">
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

export function TeacherGradesStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Grade Entries"
        value={stats.total}
        icon={<ClipboardCheck className="h-5 w-5" />}
        iconClassName="bg-teal-500/20 text-teal-700"
      />
      <StatCard
        label="Graded"
        value={stats.graded}
        icon={<CheckCircle2 className="h-5 w-5" />}
        iconClassName="bg-gray-700/20 text-gray-800"
      />
      <StatCard
        label="Class Average"
        value={`${stats.average.toFixed(1)}%`}
        icon={<ArrowUpRight className="h-5 w-5" />}
        iconClassName="bg-blue-400/20 text-blue-700"
      />
      <StatCard
        label="Missing"
        value={stats.missing}
        icon={<ArrowDownRight className="h-5 w-5" />}
        iconClassName="bg-orange-400/20 text-orange-600"
      />
    </div>
  );
}

