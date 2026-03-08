// Renders the trigger button that opens the date picker dialog.
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateTriggerLabel } from "./datePickerHelpers";

type Props = {
  disabled: boolean;
  placeholder: string;
  value: Date | null;
};

export function DatePickerTrigger({ disabled, placeholder, value }: Props) {
  const hasValue = Boolean(value);

  return (
    <Button
      type="button"
      disabled={disabled}
      className="w-full justify-start bg-white/20 hover:bg-white/30 text-[#3B240F] border border-white/20 rounded-2xl disabled:opacity-50"
    >
      <CalendarIcon className="h-4 w-4 mr-2 text-amber-700" />
      <span className={hasValue ? "text-[#3B240F]" : "text-[#3B240F]/70"}>
        {formatDateTriggerLabel(value, placeholder)}
      </span>
    </Button>
  );
}
