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
    <div className="rounded-2xl border border-white/20 bg-white/15 p-2 text-[#3B240F]">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => onSelectDate(date ?? selectedDate)}
        disabled={(date) => (minDate ? date < minDate : false) || (maxDate ? date > maxDate : false)}
        className="text-[#3B240F]"
        classNames={{
          caption_label: "text-[#3B240F] font-semibold",
          head_cell: "text-[#3B240F]/70 rounded-md w-9 font-normal text-[0.8rem]",
          day: "h-9 w-9 p-0 font-normal text-[#3B240F] hover:bg-white/20 rounded-md",
          day_selected: "bg-[#3B240F]/85 text-white shadow-none ring-1 ring-[#3B240F]/30 hover:bg-[#3B240F]/90 focus:bg-[#3B240F]/90 focus:text-white",
          day_today: "bg-white/20 text-[#3B240F]",
          day_outside: "text-[#3B240F]/40",
          nav_button: "h-7 w-7 bg-white/15 border-white/20 text-[#3B240F]/70 hover:bg-white/25",
        }}
      />
    </div>
  );
}
