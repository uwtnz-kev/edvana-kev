// State hook for weekly progress editing, percentages, and status text.
import { useMemo, useState } from "react";
import {
  applyWeeklyProgressPatch,
  getProgressPercent,
  getWeeklyProgressStatus,
  type WeeklyProgressState,
} from "./weeklyProgressHelpers";

const initialState: WeeklyProgressState = {
  lessonsGoal: 12,
  lessonsCompleted: 8,
  gradingGoal: 25,
  gradingCompleted: 14,
};

export function useWeeklyProgressState() {
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState<WeeklyProgressState>(initialState);
  const lessonsPct = useMemo(() => getProgressPercent(state.lessonsCompleted, state.lessonsGoal), [state.lessonsCompleted, state.lessonsGoal]);
  const gradingPct = useMemo(() => getProgressPercent(state.gradingCompleted, state.gradingGoal), [state.gradingCompleted, state.gradingGoal]);
  const status = useMemo(() => getWeeklyProgressStatus(lessonsPct, gradingPct), [lessonsPct, gradingPct]);

  return {
    expanded,
    setExpanded,
    state,
    status,
    update: (patch: Partial<WeeklyProgressState>) => setState((prev) => applyWeeklyProgressPatch(prev, patch)),
  };
}
