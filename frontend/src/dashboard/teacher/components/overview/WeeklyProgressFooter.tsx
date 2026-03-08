// Footer hint shown below the weekly progress metrics.
type Props = {
  hint: string;
};

export function WeeklyProgressFooter({ hint }: Props) {
  return (
    <div className="mt-6 pt-4 border-t border-white/10">
      <p className="text-white/70 text-sm text-center">{hint}</p>
    </div>
  );
}
