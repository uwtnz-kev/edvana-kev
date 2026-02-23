import { Users, ClipboardList, BarChart3, AlertTriangle } from "lucide-react";

interface StudentsStatsProps {
  studentsCount: number;
  pendingGrading?: number;
  attendanceRate?: number;
  atRiskCount?: number;
}

export default function StudentsStats({
  studentsCount,
  pendingGrading = 12,
  attendanceRate = 92,
  atRiskCount = 3,
}: StudentsStatsProps) {
  const cards = [
    {
      icon: <Users className="h-5 w-5 text-white" />,
      value: studentsCount,
      label: "Total Students",
      bg: "bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80",
    },
    {
      icon: <ClipboardList className="h-5 w-5 text-white" />,
      value: pendingGrading,
      label: "Pending Grading",
      bg: "bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80",
    },
    {
  icon: <BarChart3 className="h-5 w-5 text-white" />,
  value: `${attendanceRate}%`,
  label: "Attendance Rate",
  bg: "bg-gradient-to-br from-[#3B82F6]/80 to-[#2563EB]/70",
},
{
  icon: <AlertTriangle className="h-5 w-5 text-white" />,
  value: atRiskCount,
  label: "At Risk Students",
  bg: "bg-gradient-to-br from-[#FACC15]/80 to-[#EAB308]/70",
},
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="
            group
            bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4
            transition-all duration-300
            hover:bg-white/10 hover:border-white/20
            hover:shadow-2xl hover:-translate-y-1
          "
        >
          <div className="flex items-center space-x-3">
            <div
              className={`
                w-10 h-10
                ${card.bg}
                rounded-lg flex items-center justify-center
                transition-transform duration-300
                group-hover:scale-105
              `}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {card.value}
              </p>
              <p className="text-white/60 text-sm">
                {card.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}