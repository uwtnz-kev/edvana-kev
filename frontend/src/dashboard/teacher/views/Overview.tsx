// Orchestrates the teacher overview page using focused overview sections.
import { OverviewHeader } from "./overview/OverviewHeader";
import { OverviewQuickActions } from "./overview/OverviewQuickActions";
import { OverviewSummaryCards } from "./overview/OverviewSummaryCards";
import { OverviewWeeklyProgressSection } from "./overview/OverviewWeeklyProgressSection";
import { useOverviewState } from "./overview/useOverviewState";

export default function Overview() {
  const state = useOverviewState();

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <div className="space-y-8">
        <OverviewHeader state={state} />
        <OverviewSummaryCards cards={state.summaryCards} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OverviewWeeklyProgressSection />
          <OverviewQuickActions state={state} />
        </div>
      </div>
    </div>
  );
}
