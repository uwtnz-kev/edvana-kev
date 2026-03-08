// Renders the editable metric inputs shown when weekly progress is expanded.
type Props = {
  completedLabel: string;
  completedMax: number;
  completedValue: number;
  goalLabel: string;
  goalMax: number;
  goalValue: number;
  onCompletedChange: (next: number) => void;
  onGoalChange: (next: number) => void;
};

function NumberField(props: { label: string; max: number; min: number; onChange: (next: number) => void; value: number }) {
  return (
    <label className="block">
      <span className="text-white/70 text-xs">{props.label}</span>
      <input className="mt-1 w-full rounded-lg bg-white/5 border border-white/15 text-white px-3 py-2" type="number" min={props.min} max={props.max} value={props.value} onChange={(e) => props.onChange(Number(e.target.value))} />
    </label>
  );
}

export function WeeklyProgressSummary(props: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <NumberField label={props.goalLabel} min={1} max={props.goalMax} value={props.goalValue} onChange={props.onGoalChange} />
      <NumberField label={props.completedLabel} min={0} max={props.completedMax} value={props.completedValue} onChange={props.onCompletedChange} />
    </div>
  );
}
