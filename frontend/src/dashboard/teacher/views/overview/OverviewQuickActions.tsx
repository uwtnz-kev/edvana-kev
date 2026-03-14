// Renders the recent activity section for the teacher overview page.
import { getActivityToneClass } from "./overviewHelpers";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
import type { useOverviewState } from "./useOverviewState";

type Props = { state: ReturnType<typeof useOverviewState> };

export function OverviewQuickActions({ state }: Props) {
  return (
    <section className={`${teacherDashboardTheme.surfaces.card} min-w-0`} aria-label="Recent activity">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className={`text-xl font-bold ${teacherDashboardTheme.text.primary}`}>Recent Activity</h2>
        <button type="button" className="rounded-lg border border-[var(--card-border)] bg-white/[0.03] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--sidebar-item-hover)] hover:text-[var(--text-primary)]" onClick={state.toggleActivityExpanded} aria-expanded={state.activityExpanded}>
          {state.activityExpanded ? "Hide" : "View all"}
        </button>
      </div>
      <div className="space-y-3">
        {state.visibleActivities.map((item) => (
          <div key={item.id} className={`flex min-w-0 items-start gap-3 p-3 ${teacherDashboardTheme.surfaces.insetCard}`}>
            <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${getActivityToneClass(item.tone)}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium break-words text-[var(--text-primary)]">{item.title}</p>
              <p className="text-xs break-words text-[var(--text-secondary)]">{item.meta}</p>
            </div>
          </div>
        ))}
      </div>
      {!state.activityExpanded && state.activities.length > 3 ? <p className="mt-4 text-xs text-[var(--text-muted)]">Showing 3 of {state.activities.length}</p> : null}
    </section>
  );
}
