import React, { useMemo, useState } from "react";
import { Clock, Target, TrendingUp, Minus, Plus } from "lucide-react";

type WeeklyProgressState = {
  lessonsGoal: number;
  lessonsCompleted: number;
  gradingGoal: number;
  gradingCompleted: number;
};

function clampInt(n: number, min: number, max: number) {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, Math.round(n)));
}

function pct(done: number, goal: number) {
  if (goal <= 0) return 0;
  return Math.round((done / goal) * 100);
}

function statusFrom(lessonsPct: number, gradingPct: number) {
  const avg = Math.round((lessonsPct + gradingPct) / 2);
  if (avg >= 90) return { label: "Ahead", hint: "You are ahead this week." };
  if (avg >= 65) return { label: "On track", hint: "Your week is progressing well." };
  return { label: "Behind", hint: "Consider prioritizing the next tasks." };
}

function ProgressBlock(props: {
  label: string;
  icon: React.ReactNode;
  completed: number;
  goal: number;
  barClassName: string;
  onChangeCompleted?: (next: number) => void;
  editable?: boolean;
}) {
  const { label, icon, completed, goal, barClassName, onChangeCompleted, editable } = props;
  const progress = pct(completed, goal);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-white font-medium">{label}</span>
        </div>
        <span className="text-white/70 text-sm">
          {completed}/{goal}
        </span>
      </div>

      <div className="w-full bg-white/10 rounded-full h-3">
        <div
          className={`h-3 rounded-full shadow-lg transition-all duration-300 ${barClassName}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-white/60 text-xs">{progress}% completed</p>

        {editable && onChangeCompleted && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-lg border border-white/15 bg-white/5 text-white/90 hover:text-white"
              onClick={() => onChangeCompleted(completed - 1)}
              aria-label={`${label} minus 1`}
            >
              <Minus className="h-4 w-4" />
            </button>

            <input
              className="w-40"
              type="range"
              min={0}
              max={goal}
              value={completed}
              onChange={(e) => onChangeCompleted(Number(e.target.value))}
              aria-label={`${label} completed slider`}
            />

            <button
              type="button"
              className="p-2 rounded-lg border border-white/15 bg-white/5 text-white/90 hover:text-white"
              onClick={() => onChangeCompleted(completed + 1)}
              aria-label={`${label} plus 1`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function WeeklyProgress() {
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState<WeeklyProgressState>({
    lessonsGoal: 12,
    lessonsCompleted: 8,
    gradingGoal: 25,
    gradingCompleted: 14,
  });

  const lessonsPct = useMemo(
    () => pct(state.lessonsCompleted, state.lessonsGoal),
    [state.lessonsCompleted, state.lessonsGoal]
  );

  const gradingPct = useMemo(
    () => pct(state.gradingCompleted, state.gradingGoal),
    [state.gradingCompleted, state.gradingGoal]
  );

  const status = useMemo(
    () => statusFrom(lessonsPct, gradingPct),
    [lessonsPct, gradingPct]
  );

  const update = (patch: Partial<WeeklyProgressState>) => {
    setState((prev) => {
      const next: WeeklyProgressState = {
        lessonsGoal: clampInt(patch.lessonsGoal ?? prev.lessonsGoal, 1, 200),
        lessonsCompleted: clampInt(patch.lessonsCompleted ?? prev.lessonsCompleted, 0, 200),
        gradingGoal: clampInt(patch.gradingGoal ?? prev.gradingGoal, 1, 500),
        gradingCompleted: clampInt(patch.gradingCompleted ?? prev.gradingCompleted, 0, 500),
      };

      next.lessonsCompleted = clampInt(next.lessonsCompleted, 0, next.lessonsGoal);
      next.gradingCompleted = clampInt(next.gradingCompleted, 0, next.gradingGoal);

      return next;
    });
  };

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

        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2 text-[#1EA896]">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">{status.label}</span>
          </div>

          <button
            type="button"
            className="text-white/80 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-white/15 bg-white/5"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Hide" : "Edit"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <ProgressBlock
          label="Lessons"
          icon={<Clock className="h-5 w-5 text-[#FF715B]" />}
          completed={state.lessonsCompleted}
          goal={state.lessonsGoal}
          barClassName="bg-gradient-to-r from-[#FF715B] to-[#FF715B]/80"
          editable={expanded}
          onChangeCompleted={(n) => update({ lessonsCompleted: n })}
        />

        {expanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-white/70 text-xs">Lessons goal</span>
              <input
                className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 text-white px-3 py-2"
                type="number"
                min={1}
                max={200}
                value={state.lessonsGoal}
                onChange={(e) => update({ lessonsGoal: Number(e.target.value) })}
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-xs">Lessons completed</span>
              <input
                className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 text-white px-3 py-2"
                type="number"
                min={0}
                max={state.lessonsGoal}
                value={state.lessonsCompleted}
                onChange={(e) => update({ lessonsCompleted: Number(e.target.value) })}
              />
            </label>
          </div>
        )}

        <ProgressBlock
          label="Grading"
          icon={<Target className="h-5 w-5 text-[#1EA896]" />}
          completed={state.gradingCompleted}
          goal={state.gradingGoal}
          barClassName="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/80"
          editable={expanded}
          onChangeCompleted={(n) => update({ gradingCompleted: n })}
        />

        {expanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="text-white/70 text-xs">Grading goal</span>
              <input
                className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 text-white px-3 py-2"
                type="number"
                min={1}
                max={500}
                value={state.gradingGoal}
                onChange={(e) => update({ gradingGoal: Number(e.target.value) })}
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-xs">Grading completed</span>
              <input
                className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 text-white px-3 py-2"
                type="number"
                min={0}
                max={state.gradingGoal}
                value={state.gradingCompleted}
                onChange={(e) => update({ gradingCompleted: Number(e.target.value) })}
              />
            </label>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="text-white/70 text-sm text-center">{status.hint}</p>
      </div>
    </div>
  );
}