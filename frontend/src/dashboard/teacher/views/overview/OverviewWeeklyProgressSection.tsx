// Re-exports the shared weekly progress card for the teacher overview page.
import { WeeklyProgress } from "@/dashboard/teacher/components/overview";

export function OverviewWeeklyProgressSection() {
  return <WeeklyProgress lessonsGoal={12} lessonsCompleted={8} gradingGoal={25} gradingCompleted={14} />;
}
