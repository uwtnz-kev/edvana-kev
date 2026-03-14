// Renders the greeting hero section for the teacher overview page.
import { Star, User } from "lucide-react";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
import type { useOverviewState } from "./useOverviewState";

type Props = { state: ReturnType<typeof useOverviewState> };

export function OverviewHeader({ state }: Props) {
  return (
    <div className={teacherDashboardTheme.surfaces.card}>
      <div className="flex items-center space-x-4">
        <div className={`w-16 h-16 ${state.greetingTheme.bgClass} rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105`}>
          <User className={`h-8 w-8 ${state.greetingTheme.iconClass}`} />
        </div>
        <div className="flex-1">
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${teacherDashboardTheme.text.primary}`}>{state.greeting}</h1>
          <p className={`text-lg ${teacherDashboardTheme.text.secondary}`}>Ready to teach today?</p>
        </div>
        <div className={`hidden items-center space-x-2 rounded-xl px-4 py-2 transition-transform duration-300 group-hover:scale-105 sm:flex ${teacherDashboardTheme.accents.badge}`}>
          <Star className="h-5 w-5 text-[var(--accent-yellow)]" />
          <span className="font-medium text-[var(--text-primary)]">{state.userLevelLabel}</span>
        </div>
      </div>
    </div>
  );
}
