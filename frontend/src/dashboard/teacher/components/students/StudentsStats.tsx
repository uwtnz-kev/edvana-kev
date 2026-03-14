/**
 * StudentsStats
 * -------------
 * Renders summary metrics for the teacher dashboard s tu de nt s feature.
 */
import { Users, BarChart3 } from "lucide-react";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";

interface StudentsStatsProps {
  studentsCount: number;
  attendanceRate?: number;
}

export default function StudentsStats({
  studentsCount,
  attendanceRate = 92,
}: StudentsStatsProps) {
  const totalTheme = getSubjectIconTheme("students-total");
  const attendanceTheme = getSubjectIconTheme("students-attendance");

  const cards = [
    {
      icon: <Users className={`h-5 w-5 ${totalTheme.iconClass}`} />,
      value: studentsCount,
      label: "Total Students",
      bg: totalTheme.bgClass,
    },
    {
      icon: <BarChart3 className={`h-5 w-5 ${attendanceTheme.iconClass}`} />,
      value: `${attendanceRate}%`,
      label: "Attendance Rate",
      bg: attendanceTheme.bgClass,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group rounded-2xl teacher-panel-surface p-4 teacher-panel-hover-lift"
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${card.bg}`}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-xs text-white/60">{card.label}</p>
              <p className="mt-1 text-lg font-semibold text-white">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


