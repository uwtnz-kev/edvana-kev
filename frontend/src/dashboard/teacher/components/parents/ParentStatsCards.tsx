/**
 * ParentStatsCards
 * ----------------
 * Renders summary metrics for the teacher dashboard p ar en ts feature.
 */
import { Users } from "lucide-react";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";

type Props = {
  totalParents: number;
};

export default function ParentStatsCards({
  totalParents,
}: Props) {
  const totalTheme = getSubjectIconTheme("parents-total");

  const cards = [
    {
      label: "Total Parents",
      value: totalParents,
      icon: <Users className={`h-6 w-6 ${totalTheme.iconClass}`} />,
      bgClass: totalTheme.bgClass,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="group max-w-md bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/20"
        >
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${card.bgClass}`}>
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

