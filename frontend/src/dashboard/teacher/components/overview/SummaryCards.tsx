/**
 * SummaryCards
 * ------------
 * Implements the S um ma ry Ca rd s module for the teacher dashboard o ve rv ie w feature.
 */
import type { LucideIcon } from "lucide-react";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
import type { SubjectIconTheme } from "../shared/subjectIconTheme";

export interface SummaryCardItem {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  theme: SubjectIconTheme;
}

interface SummaryCardProps {
  card: SummaryCardItem;
}

function SummaryCard({ card }: SummaryCardProps) {
  const Icon = card.icon;

  return (
    <div
      className="
        group
        teacher-card-surface
        rounded-xl
        p-4
        transition-all duration-300
        hover:shadow-2xl
        hover:-translate-y-1
      "
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className={`
            w-10 h-10
            ${card.theme.bgClass}
            rounded-xl
            flex items-center justify-center
            shadow-lg
            transition-transform duration-300
            group-hover:scale-105
          `}
        >
          <Icon className={`h-5 w-5 ${card.theme.iconClass}`} />
        </div>

        <span
          className="
            ml-auto text-2xl font-bold
            text-[var(--accent-primary)]
            transition-transform duration-300
            group-hover:scale-105
          "
        >
          {card.value}
        </span>
      </div>

      <h3 className={`mb-1 text-lg font-semibold transition-colors duration-300 ${teacherDashboardTheme.text.primary}`}>
        {card.title}
      </h3>

      <p className={`text-sm ${teacherDashboardTheme.text.secondary}`}>{card.subtitle}</p>
    </div>
  );
}

interface SummaryCardsProps {
  cards: SummaryCardItem[];
}

export function SummaryCards({ cards }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <SummaryCard key={card.id} card={card} />
      ))}
    </div>
  );
}

