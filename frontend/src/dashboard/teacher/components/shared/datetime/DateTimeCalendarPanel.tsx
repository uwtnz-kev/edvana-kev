// Calendar panel for selecting the date portion of the teacher picker.
import { Calendar } from "@/components/ui/calendar";

type Props = {
  maxDate?: Date;
  minDate?: Date;
  selectedDate?: Date;
  onSelectDate: (date: Date | undefined) => void;
};

export function DateTimeCalendarPanel({ maxDate, minDate, onSelectDate, selectedDate }: Props) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-2 text-white">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => onSelectDate(date ?? selectedDate)}
        disabled={(date) => (minDate ? date < minDate : false) || (maxDate ? date > maxDate : false)}
        className="text-white"
        classNames={{
          caption_label: "text-white font-semibold",
          head_cell: "text-[var(--text-secondary)] rounded-md w-9 font-normal text-[0.8rem]",
          day: "h-9 w-9 p-0 font-normal text-white hover:bg-white/20 rounded-md",
          day_selected: "bg-[var(--accent-primary)] text-[#0d1117] shadow-none ring-1 ring-[var(--accent-primary)]/30 hover:bg-[var(--accent-primary)]/90 focus:bg-[var(--accent-primary)]/90 focus:text-[#0d1117]",
          day_today: "bg-white/20 text-white",
          day_outside: "text-[var(--text-muted)]",
          nav_button: "h-7 w-7 bg-white/15 border-white/20 text-[var(--text-secondary)] hover:bg-white/25",
        }}
      />
    </div>
  );
}
