// Time selection panel and dialog actions for the teacher date-time picker.
import { useEffect, useState, type ReactNode } from "react";
import { Check, Clock3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HOURS, type Meridiem } from "./dateTimeConstants";
import { clampMinuteInput } from "./dateTimeHelpers";

type Props = {
  onApply: () => void;
  onClose: () => void;
  onHourChange: (value: string) => void;
  onMeridiemChange: (value: Meridiem) => void;
  onMinuteChange: (value: string) => void;
  selectedDate?: Date;
  selectedHour: string;
  selectedMeridiem: Meridiem;
  selectedMinute: string;
  showActionIcons?: boolean;
};

function SelectField(props: { children: ReactNode; label: string }) {
  return <div className="space-y-1"><p className="text-xs text-[var(--text-secondary)]">{props.label}</p>{props.children}</div>;
}

function Trigger({ placeholder }: { placeholder: string }) {
  return <SelectTrigger className="rounded-xl border border-white/25 bg-white/20 text-white hover:bg-white/30 focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-white/70 [&>svg]:text-[var(--text-secondary)]"><SelectValue placeholder={placeholder} /></SelectTrigger>;
}

export function DateTimeTimePanel(props: Props) {
  const [minuteInput, setMinuteInput] = useState(props.selectedMinute);

  useEffect(() => {
    setMinuteInput(props.selectedMinute);
  }, [props.selectedMinute]);

  const handleMinuteChange = (value: string) => {
    const nextMinute = clampMinuteInput(value);
    setMinuteInput(nextMinute);
    props.onMinuteChange(nextMinute);
  };

  const handleMinuteBlur = () => {
    const normalizedMinute = clampMinuteInput(minuteInput);
    const nextMinute = normalizedMinute ? normalizedMinute.padStart(2, "0") : "00";
    setMinuteInput(nextMinute);
    props.onMinuteChange(nextMinute);
  };

  return (
    <div className="flex-1 min-w-0 space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-white"><Clock3 className="h-4 w-4 text-[var(--text-secondary)]" />Time</div>
      <div className="grid grid-cols-3 gap-2">
        <SelectField label="Hour"><Select value={props.selectedHour} onValueChange={props.onHourChange}><Trigger placeholder="Hour" /><SelectContent className="z-[1302] rounded-2xl border border-white/25 bg-[#161b22] text-white backdrop-blur-xl">{HOURS.map((hour) => <SelectItem key={hour} value={hour} className="text-white focus:bg-white/10 focus:text-white">{hour}</SelectItem>)}</SelectContent></Select></SelectField>
        <SelectField label="Minute"><Input type="text" inputMode="numeric" pattern="[0-9]*" min={0} max={59} value={minuteInput} onChange={(event) => handleMinuteChange(event.target.value)} onBlur={handleMinuteBlur} placeholder="Minute" className="min-h-10 rounded-xl border border-white/25 bg-white/20 text-white hover:bg-white/30 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/70" /></SelectField>
        <SelectField label="AM/PM"><Select value={props.selectedMeridiem} onValueChange={(value) => props.onMeridiemChange(value as Meridiem)}><Trigger placeholder="AM/PM" /><SelectContent className="z-[1302] rounded-2xl border border-white/25 bg-[#161b22] text-white backdrop-blur-xl"><SelectItem value="AM" className="text-white focus:bg-white/10 focus:text-white">AM</SelectItem><SelectItem value="PM" className="text-white focus:bg-white/10 focus:text-white">PM</SelectItem></SelectContent></Select></SelectField>
      </div>
      <div className="flex justify-end gap-2 border-t border-white/15 pt-3">
        <Button type="button" onClick={props.onClose} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-white hover:bg-[var(--card-hover)]">{props.showActionIcons ? <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300"><X className="h-4 w-4" /></span> : null}Cancel</Button>
        <Button type="button" onClick={props.onApply} disabled={!props.selectedDate} className="rounded-2xl border border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[#0d1117] transition-colors duration-200 hover:bg-[#7ab8ff]">{props.showActionIcons ? <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300"><Check className="h-4 w-4" /></span> : null}Apply</Button>
      </div>
    </div>
  );
}


