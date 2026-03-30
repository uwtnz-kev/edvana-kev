// Orchestrates the shared teacher date-time picker from extracted dialog parts.
import { useEffect, useMemo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type Meridiem, type TeacherDateTimePickerProps } from "./dateTimeConstants";
import { buildDateWithTime, formatTriggerLabel, toTimeParts } from "./dateTimeHelpers";
import { DateTimeCalendarPanel } from "./DateTimeCalendarPanel";
import { DateTimeTimePanel } from "./DateTimeTimePanel";
import { DateTimeTrigger } from "./DateTimeTrigger";
export type { TeacherDateTimePickerProps } from "./dateTimeConstants";

export function TeacherDateTimePicker({ value, onChange, placeholder = "Pick date and time", disabled = false, minDate, maxDate, timeStepMinutes = 15, showActionIcons = false }: TeacherDateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedMeridiem, setSelectedMeridiem] = useState<Meridiem>("PM");
  const hasValue = useMemo(() => Boolean(value), [value]);
  void timeStepMinutes;

  useEffect(() => {
    if (!open) return;
    const source = value ?? new Date();
    const parts = toTimeParts(source);
    setSelectedDate(source);
    setSelectedHour(parts.hour);
    setSelectedMinute(parts.minute);
    setSelectedMeridiem(parts.meridiem);
  }, [open, value]);

  const onApply = () => {
    if (!selectedDate) return;
    onChange(buildDateWithTime(selectedDate, selectedHour, selectedMinute, selectedMeridiem));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><DateTimeTrigger disabled={disabled} hasValue={hasValue} label={formatTriggerLabel(value, placeholder)} /></DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-[1200] bg-black/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[1201] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 max-h-[80vh] overflow-hidden rounded-3xl border border-white/20 bg-[#161b22]/95 p-0 text-white shadow-lg backdrop-blur-2xl pointer-events-auto">
          <DialogHeader className="sr-only"><DialogTitle>Select date and time</DialogTitle><DialogDescription>Choose date and time, then apply changes.</DialogDescription></DialogHeader>
          <div className="p-4 sm:p-5 flex flex-col gap-5 max-h-[80vh] overflow-y-auto overscroll-contain">
            <DateTimeCalendarPanel selectedDate={selectedDate} onSelectDate={setSelectedDate} minDate={minDate} maxDate={maxDate} />
            <DateTimeTimePanel selectedDate={selectedDate} selectedHour={selectedHour} selectedMinute={selectedMinute} selectedMeridiem={selectedMeridiem} onHourChange={setSelectedHour} onMinuteChange={setSelectedMinute} onMeridiemChange={setSelectedMeridiem} onClose={() => setOpen(false)} onApply={onApply} showActionIcons={showActionIcons} />
          </div>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:pointer-events-none"><X className="h-4 w-4" /><span className="sr-only">Close</span></DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
