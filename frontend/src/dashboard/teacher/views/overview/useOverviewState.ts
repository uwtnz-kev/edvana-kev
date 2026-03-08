// Manages greeting, activity expansion, and derived overview dashboard state.
import { useMemo, useState } from "react";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import { useAuth } from "@/context/AuthContext";
import {
  getGreeting,
  getOverviewActivities,
  getOverviewSummaryCards,
} from "./overviewHelpers";

export function useOverviewState() {
  const { user } = useAuth();
  const [activityExpanded, setActivityExpanded] = useState(false);
  const currentHour = new Date().getHours();
  const greetingTheme = getSubjectIconTheme("default");
  const activities = useMemo(() => getOverviewActivities(), []);
  const summaryCards = useMemo(() => getOverviewSummaryCards(), []);

  return {
    activities,
    activityExpanded,
    greeting: getGreeting(user, currentHour),
    greetingTheme,
    summaryCards,
    userLevelLabel: "Level 12",
    visibleActivities: activityExpanded ? activities : activities.slice(0, 3),
    toggleActivityExpanded: () => setActivityExpanded((current) => !current),
  };
}
