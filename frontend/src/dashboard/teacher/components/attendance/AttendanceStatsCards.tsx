import React from "react";
import { Users, CheckCircle2, XCircle, Clock } from "lucide-react";
import type { AttendanceStats } from "./attendanceTypes";

type Props = {
  stats: AttendanceStats;
};

function StatCard({
  label,
  value,
  icon,
  iconWrapClass,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  iconWrapClass: string;
}) {
  return (
    <div
      className="
        group
        rounded-2xl
        border border-white/30
        bg-white/15
        backdrop-blur-xl
        shadow-[0_18px_45px_rgba(59,36,15,0.15)]
        p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-white/20
        hover:shadow-[0_25px_60px_rgba(59,36,15,0.25)]
      "
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            h-12 w-12
            rounded-xl
            flex items-center justify-center
            transition-transform duration-300
            group-hover:scale-105
            ${iconWrapClass}
          `}
        >
          {icon}
        </div>

        <div>
          <div className="text-3xl font-semibold leading-none text-[#3B240F]">
            {value}
          </div>
          <div className="text-sm text-[#6B4F3A]">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AttendanceStatsCards({ stats }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-4">
      <StatCard
        label="Total Students"
        value={stats.total}
        icon={<Users className="h-6 w-6 text-[#3B240F]" />}
        iconWrapClass="bg-[#1EA896]"
      />

      <StatCard
        label="Present"
        value={stats.present}
        icon={<CheckCircle2 className="h-6 w-6 text-[#3B240F]" />}
        iconWrapClass="bg-[#FF715B]"
      />

      <StatCard
        label="Absent"
        value={stats.absent}
        icon={<XCircle className="h-6 w-6 text-[#3B240F]" />}
        iconWrapClass="bg-[#4F7DFF]"
      />

      <StatCard
        label="Late or Excused"
        value={stats.late + stats.excused}
        icon={<Clock className="h-6 w-6 text-[#3B240F]" />}
        iconWrapClass="bg-[#F2C94C]"
      />
    </div>
  );
}