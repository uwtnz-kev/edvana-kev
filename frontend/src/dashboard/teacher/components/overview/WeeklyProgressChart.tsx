// Renders a single weekly progress bar block with optional inline editing controls.
import type React from "react";
import { Minus, Plus } from "lucide-react";
import { getProgressPercent } from "./weeklyProgressHelpers";

type Props = {
  barClassName: string;
  completed: number;
  editable?: boolean;
  goal: number;
  icon: React.ReactNode;
  label: string;
  onChangeCompleted?: (next: number) => void;
};

export function WeeklyProgressChart(props: Props) {
  const progress = getProgressPercent(props.completed, props.goal);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {props.icon}
          <span className="font-medium text-[var(--text-primary)]">{props.label}</span>
        </div>
        <span className="text-sm text-[var(--text-secondary)]">{props.completed}/{props.goal}</span>
      </div>
      <div className="h-3 w-full rounded-full bg-white/10">
        <div className={`h-3 rounded-full shadow-lg transition-all duration-300 ${props.barClassName}`} style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-[var(--text-secondary)]">{progress}% completed</p>
        {props.editable && props.onChangeCompleted ? (
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-lg border border-[var(--card-border)] bg-white/[0.03] p-2 text-[var(--text-primary)] hover:bg-[var(--sidebar-item-hover)]" onClick={() => props.onChangeCompleted?.(props.completed - 1)} aria-label={`${props.label} minus 1`}><Minus className="h-4 w-4" /></button>
            <input className="w-40" type="range" min={0} max={props.goal} value={props.completed} onChange={(e) => props.onChangeCompleted?.(Number(e.target.value))} aria-label={`${props.label} completed slider`} />
            <button type="button" className="rounded-lg border border-[var(--card-border)] bg-white/[0.03] p-2 text-[var(--text-primary)] hover:bg-[var(--sidebar-item-hover)]" onClick={() => props.onChangeCompleted?.(props.completed + 1)} aria-label={`${props.label} plus 1`}><Plus className="h-4 w-4" /></button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
