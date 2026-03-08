// Orchestrates the teacher date picker dialog and local selection state.
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DatePickerCalendarPanel } from "./DatePickerCalendarPanel";
import { DatePickerTrigger } from "./DatePickerTrigger";

export type TeacherDatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
};

export function TeacherDatePicker({
  value,
  onChange,
  placeholder = "Pick date",
  minDate,
  maxDate,
  disabled = false,
}: TeacherDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    setSelectedDate(value ?? new Date());
  }, [open, value]);

  const onApply = () => {
    if (!selectedDate) return;
    onChange(selectedDate);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DatePickerTrigger disabled={disabled} placeholder={placeholder} value={value} />
      </DialogTrigger>
      <DatePickerCalendarPanel
        maxDate={maxDate}
        minDate={minDate}
        onApply={onApply}
        onClose={() => setOpen(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Dialog>
  );
}
