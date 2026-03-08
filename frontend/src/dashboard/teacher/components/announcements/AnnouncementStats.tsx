/**
 * AnnouncementStats
 * -----------------
 * Renders summary metrics for the teacher dashboard a nn ou nc em en ts feature.
 */
import type { ReactNode } from "react";
import { CheckCircle2, FileText, Megaphone } from "lucide-react";

type Props = {
  stats: { total: number; published: number; drafts: number };
};

function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
      <div className="flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>{icon}</div>
        <div>
          <p className="text-xs text-white/60">{label}</p>
          <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function AnnouncementStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard label="Total" value={stats.total} icon={<Megaphone className="h-5 w-5" />} tone="bg-amber-500/20 text-amber-700" />
      <StatCard label="Published" value={stats.published} icon={<CheckCircle2 className="h-5 w-5" />} tone="bg-teal-500/20 text-teal-700" />
      <StatCard label="Drafts" value={stats.drafts} icon={<FileText className="h-5 w-5" />} tone="bg-yellow-500/20 text-yellow-700" />
    </div>
  );
}

