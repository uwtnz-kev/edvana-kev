// Trigger button used to open the teacher date-time picker dialog.
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  disabled: boolean;
  hasValue: boolean;
  label: string;
};

export function DateTimeTrigger({ disabled, hasValue, label }: Props) {
  return (
    <Button
      type="button"
      disabled={disabled}
      className="w-full justify-start bg-white/20 hover:bg-white/30 text-[#3B240F] border border-white/20 rounded-2xl disabled:opacity-50"
    >
      <CalendarIcon className="h-4 w-4 mr-2 text-amber-700" />
      <span className={hasValue ? "text-[#3B240F]" : "text-[#3B240F]/70"}>{label}</span>
    </Button>
  );
}
