// Renders the trigger button that opens the date picker dialog.
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateTriggerLabel } from "./datePickerHelpers";

type Props = React.ComponentPropsWithoutRef<typeof Button> & {
  disabled: boolean;
  placeholder: string;
  value: Date | null;
};

export const DatePickerTrigger = React.forwardRef<HTMLButtonElement, Props>(function DatePickerTrigger(
  { className, disabled, placeholder, value, ...props },
  ref,
) {
  const hasValue = Boolean(value);

  return (
    <Button
      ref={ref}
      type="button"
      disabled={disabled}
      className={["w-full justify-start rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30 disabled:opacity-50", className].filter(Boolean).join(" ")}
      {...props}
    >
      <CalendarIcon className="h-4 w-4 mr-2 text-[var(--text-secondary)]" />
      <span className={hasValue ? "text-white" : "text-white/70"}>
        {formatDateTriggerLabel(value, placeholder)}
      </span>
    </Button>
  );
});
