// Helpers for weekly progress values, status text, and constrained updates.
export type WeeklyProgressState = {
  lessonsGoal: number;
  lessonsCompleted: number;
  gradingGoal: number;
  gradingCompleted: number;
};

export function clampInt(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function getProgressPercent(completed: number, goal: number) {
  if (goal <= 0) return 0;
  return Math.round((completed / goal) * 100);
}

export function getWeeklyProgressStatus(lessonsPct: number, gradingPct: number) {
  const average = Math.round((lessonsPct + gradingPct) / 2);
  if (average >= 90) return { label: "Ahead", hint: "You are ahead this week." };
  if (average >= 65) return { label: "On track", hint: "Your week is progressing well." };
  return { label: "Behind", hint: "Consider prioritizing the next tasks." };
}

// Clamp goals first, then keep completed values inside the active goal range.
export function applyWeeklyProgressPatch(prev: WeeklyProgressState, patch: Partial<WeeklyProgressState>) {
  const next: WeeklyProgressState = {
    lessonsGoal: clampInt(patch.lessonsGoal ?? prev.lessonsGoal, 1, 200),
    lessonsCompleted: clampInt(patch.lessonsCompleted ?? prev.lessonsCompleted, 0, 200),
    gradingGoal: clampInt(patch.gradingGoal ?? prev.gradingGoal, 1, 500),
    gradingCompleted: clampInt(patch.gradingCompleted ?? prev.gradingCompleted, 0, 500),
  };
  next.lessonsCompleted = clampInt(next.lessonsCompleted, 0, next.lessonsGoal);
  next.gradingCompleted = clampInt(next.gradingCompleted, 0, next.gradingGoal);
  return next;
}
