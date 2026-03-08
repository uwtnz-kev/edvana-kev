// Renders the dialog calendar panel and footer actions for date selection.
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { calendarClassNames } from "./datePickerConstants";
import { isDateDisabled } from "./datePickerHelpers";

type Props = {
  maxDate?: Date;
  minDate?: Date;
  onApply: () => void;
  onClose: () => void;
  selectedDate?: Date;
  setSelectedDate: (value: Date | undefined) => void;
};

export function DatePickerCalendarPanel({ maxDate, minDate, onApply, onClose, selectedDate, setSelectedDate }: Props) {
  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 max-h-[80vh] overflow-hidden rounded-3xl border border-white/30 bg-white/20 backdrop-blur-2xl shadow-lg text-[#3B240F] p-0">
        <DialogHeader className="sr-only"><DialogTitle>Select date</DialogTitle><DialogDescription>Choose a date and apply changes.</DialogDescription></DialogHeader>
        <div className="p-4 sm:p-5 flex flex-col gap-5 max-h-[80vh] overflow-y-auto overscroll-contain">
          <div className="rounded-2xl border border-white/20 bg-white/15 p-2 text-[#3B240F]">
            <Calendar mode="single" selected={selectedDate} onSelect={(date) => setSelectedDate(date ?? selectedDate)} disabled={(date) => isDateDisabled(date, minDate, maxDate)} className="text-[#3B240F]" classNames={calendarClassNames} />
          </div>
          <div className="flex justify-end gap-2 border-t border-white/15 pt-3">
            <Button type="button" onClick={onClose} className="bg-white/20 hover:bg-white/30 text-[#3B240F] border border-white/25 rounded-2xl">Cancel</Button>
            <Button type="button" onClick={onApply} disabled={!selectedDate} className="bg-[#3B240F]/90 text-white hover:bg-[#3B240F]/80 transition-colors duration-200 border border-[#3B240F]/90 rounded-2xl">Apply</Button>
          </div>
        </div>
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#3B240F]/40 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}
