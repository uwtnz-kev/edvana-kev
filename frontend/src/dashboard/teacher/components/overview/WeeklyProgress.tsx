// Orchestrates the weekly progress card using extracted chart, summary, and helper modules.
import { Clock, Target } from "lucide-react";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
import { WeeklyProgressChart } from "./WeeklyProgressChart";
import { WeeklyProgressFooter } from "./WeeklyProgressFooter";
import { WeeklyProgressLegend } from "./WeeklyProgressLegend";
import { WeeklyProgressSummary } from "./WeeklyProgressSummary";
import { useWeeklyProgressState } from "./useWeeklyProgressState";

export function WeeklyProgress() {
  const { expanded, setExpanded, state, status, update } = useWeeklyProgressState();

  return (
    <div
      className="
        group
        teacher-card-surface
        rounded-2xl
        p-6
        transition-all duration-300
        hover:shadow-2xl
        hover:-translate-y-1
      "
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className={`text-xl font-bold transition-colors duration-300 ${teacherDashboardTheme.text.primary}`}>
            Weekly Progress
          </h2>
          <p className={`mt-1 text-sm ${teacherDashboardTheme.text.secondary}`}>
            Track weekly goals and completions.
          </p>
        </div>

        <WeeklyProgressLegend
          expanded={expanded}
          label={status.label}
          onToggleExpanded={() => setExpanded((value) => !value)}
        />
      </div>

      <div className="space-y-6">
        <WeeklyProgressChart
          label="Lessons"
          icon={<Clock className="h-5 w-5 text-[var(--accent-primary)]" />}
          completed={state.lessonsCompleted}
          goal={state.lessonsGoal}
          barClassName="bg-gradient-to-r from-[var(--accent-primary)] to-[#7ab8ff]"
          editable={expanded}
          onChangeCompleted={(n) => update({ lessonsCompleted: n })}
        />

        {expanded && (
          <WeeklyProgressSummary
            goalLabel="Lessons goal"
            goalMax={200}
            goalValue={state.lessonsGoal}
            completedLabel="Lessons completed"
            completedMax={state.lessonsGoal}
            completedValue={state.lessonsCompleted}
            onGoalChange={(next) => update({ lessonsGoal: next })}
            onCompletedChange={(next) => update({ lessonsCompleted: next })}
          />
        )}

        <WeeklyProgressChart
          label="Grading"
          icon={<Target className="h-5 w-5 text-[var(--accent-green)]" />}
          completed={state.gradingCompleted}
          goal={state.gradingGoal}
          barClassName="bg-gradient-to-r from-[var(--accent-green)] to-[#74d47f]"
          editable={expanded}
          onChangeCompleted={(n) => update({ gradingCompleted: n })}
        />

        {expanded && (
          <WeeklyProgressSummary
            goalLabel="Grading goal"
            goalMax={500}
            goalValue={state.gradingGoal}
            completedLabel="Grading completed"
            completedMax={state.gradingGoal}
            completedValue={state.gradingCompleted}
            onGoalChange={(next) => update({ gradingGoal: next })}
            onCompletedChange={(next) => update({ gradingCompleted: next })}
          />
        )}
      </div>

      <WeeklyProgressFooter hint={status.hint} />
    </div>
  );
}
