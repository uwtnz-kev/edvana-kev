// Table header row for the schedule grid.
type Props = { days: string[] };

export function ScheduleTableHeader({ days }: Props) {
  return (
    <thead>
      <tr className="border-b border-white/10">
        <th className="min-w-[104px] bg-white/10 px-3 py-3 text-left text-sm font-semibold text-white">Time</th>
        {days.map((day) => (
          <th key={day} className="min-w-[148px] bg-white/10 px-3 py-3 text-center text-sm font-semibold text-white">
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
}

