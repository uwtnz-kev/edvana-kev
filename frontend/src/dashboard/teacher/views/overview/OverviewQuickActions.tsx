// Renders the recent activity section for the teacher overview page.
import { getActivityToneClass } from "./overviewHelpers";
import type { useOverviewState } from "./useOverviewState";

type Props = { state: ReturnType<typeof useOverviewState> };

export function OverviewQuickActions({ state }: Props) {
  return (
    <section className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1 min-w-0" aria-label="Recent activity">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-white">Recent Activity</h2>
        <button type="button" className="text-white/80 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-white/15 bg-white/5" onClick={state.toggleActivityExpanded} aria-expanded={state.activityExpanded}>
          {state.activityExpanded ? "Hide" : "View all"}
        </button>
      </div>
      <div className="space-y-3">
        {state.visibleActivities.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200 min-w-0">
            <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${getActivityToneClass(item.tone)}`} />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium break-words">{item.title}</p>
              <p className="text-white/60 text-xs break-words">{item.meta}</p>
            </div>
          </div>
        ))}
      </div>
      {!state.activityExpanded && state.activities.length > 3 ? <p className="mt-4 text-white/50 text-xs">Showing 3 of {state.activities.length}</p> : null}
    </section>
  );
}
