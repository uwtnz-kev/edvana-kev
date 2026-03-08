// Time selection panel and dialog actions for the teacher date-time picker.
import type { ReactNode } from "react";
import { Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HOURS, type Meridiem } from "./dateTimeConstants";

type Props = {
  minuteOptions: string[];
  onApply: () => void;
  onClose: () => void;
  onHourChange: (value: string) => void;
  onMeridiemChange: (value: Meridiem) => void;
  onMinuteChange: (value: string) => void;
  selectedDate?: Date;
  selectedHour: string;
  selectedMeridiem: Meridiem;
  selectedMinute: string;
};

function SelectField(props: { children: ReactNode; label: string }) {
  return <div className="space-y-1"><p className="text-xs text-[#3B240F]/70">{props.label}</p>{props.children}</div>;
}

function Trigger({ placeholder }: { placeholder: string }) {
  return <SelectTrigger className="bg-white/20 hover:bg-white/30 border border-white/25 text-[#3B240F] rounded-xl focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-[#3B240F]/50 [&>svg]:text-[#3B240F]/70"><SelectValue placeholder={placeholder} /></SelectTrigger>;
}

export function DateTimeTimePanel(props: Props) {
  return (
    <div className="flex-1 min-w-0 space-y-4">
      <div className="flex items-center gap-2 text-sm text-[#3B240F] font-semibold"><Clock3 className="h-4 w-4 text-[#3B240F]/70" />Time</div>
      <div className="grid grid-cols-3 gap-2">
        <SelectField label="Hour"><Select value={props.selectedHour} onValueChange={props.onHourChange}><Trigger placeholder="Hour" /><SelectContent className="bg-white/25 border border-white/25 backdrop-blur-xl text-[#3B240F] rounded-2xl">{HOURS.map((hour) => <SelectItem key={hour} value={hour} className="text-[#3B240F] focus:bg-white/30 focus:text-[#3B240F]">{hour}</SelectItem>)}</SelectContent></Select></SelectField>
        <SelectField label="Minute"><Select value={props.selectedMinute} onValueChange={props.onMinuteChange}><Trigger placeholder="Minute" /><SelectContent className="bg-white/25 border border-white/25 backdrop-blur-xl text-[#3B240F] rounded-2xl max-h-60">{props.minuteOptions.map((minute) => <SelectItem key={minute} value={minute} className="text-[#3B240F] focus:bg-white/30 focus:text-[#3B240F]">{minute}</SelectItem>)}</SelectContent></Select></SelectField>
        <SelectField label="AM/PM"><Select value={props.selectedMeridiem} onValueChange={(value) => props.onMeridiemChange(value as Meridiem)}><Trigger placeholder="AM/PM" /><SelectContent className="bg-white/25 border border-white/25 backdrop-blur-xl text-[#3B240F] rounded-2xl"><SelectItem value="AM" className="text-[#3B240F] focus:bg-white/30 focus:text-[#3B240F]">AM</SelectItem><SelectItem value="PM" className="text-[#3B240F] focus:bg-white/30 focus:text-[#3B240F]">PM</SelectItem></SelectContent></Select></SelectField>
      </div>
      <div className="flex justify-end gap-2 border-t border-white/15 pt-3">
        <Button type="button" onClick={props.onClose} className="bg-white/20 hover:bg-white/30 text-[#3B240F] border border-white/25 rounded-2xl">Cancel</Button>
        <Button type="button" onClick={props.onApply} disabled={!props.selectedDate} className="bg-[#3B240F]/90 text-white hover:bg-[#3B240F]/80 transition-colors duration-200 border border-[#3B240F]/90 rounded-2xl">Apply</Button>
      </div>
    </div>
  );
}


