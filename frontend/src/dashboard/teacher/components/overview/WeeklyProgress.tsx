// Orchestrates the weekly progress card using extracted chart, summary, and helper modules.
import { Clock, Target } from "lucide-react";
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
        bg-white/5
        backdrop-blur-lg
        border border-white/10
        rounded-2xl
        shadow-xl
        p-6
        transition-all duration-300
        hover:bg-white/10
        hover:border-white/20
        hover:shadow-2xl
        hover:-translate-y-1
      "
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white transition-colors duration-300">
            Weekly Progress
          </h2>
          <p className="text-white/60 text-sm mt-1">
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
          icon={<Clock className="h-5 w-5 text-[#FF715B]" />}
          completed={state.lessonsCompleted}
          goal={state.lessonsGoal}
          barClassName="bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80"
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
          icon={<Target className="h-5 w-5 text-[#1EA896]" />}
          completed={state.gradingCompleted}
          goal={state.gradingGoal}
          barClassName="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80"
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
