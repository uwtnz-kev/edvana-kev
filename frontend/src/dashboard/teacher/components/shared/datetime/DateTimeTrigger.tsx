// Trigger button used to open the teacher date-time picker dialog.
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = React.ComponentPropsWithoutRef<typeof Button> & {
  disabled: boolean;
  hasValue: boolean;
  label: string;
};

export const DateTimeTrigger = React.forwardRef<HTMLButtonElement, Props>(function DateTimeTrigger(
  { className, disabled, hasValue, label, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      type="button"
      disabled={disabled}
      className={["w-full justify-start rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30 disabled:opacity-50", className].filter(Boolean).join(" ")}
      {...props}
    >
      <CalendarIcon className="h-4 w-4 mr-2 text-[var(--text-secondary)]" />
      <span className={hasValue ? "text-white" : "text-white/70"}>{label}</span>
    </Button>
  );
});
