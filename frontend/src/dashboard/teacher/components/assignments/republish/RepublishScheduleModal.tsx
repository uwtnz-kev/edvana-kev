import { CalendarClock, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeacherDateTimePicker } from "@/dashboard/teacher/components/shared";

type Props = {
  open: boolean;
  assessmentLabel: string;
  assignmentTitle: string;
  closeDateTime: string;
  onCloseDateTimeChange: (value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

function parseISODate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function RepublishScheduleModal({
  open,
  assessmentLabel,
  assignmentTitle,
  closeDateTime,
  onCloseDateTimeChange,
  onCancel,
  onConfirm,
}: Props) {
  const assessmentLabelLower = assessmentLabel.toLowerCase();
  const parsedValue = parseISODate(closeDateTime);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onCancel()}>
      <DialogPortal>
        <DialogOverlay className="bg-slate-950/70 backdrop-blur-sm" />
        <DialogContent className="max-w-xl rounded-3xl border border-white/10 bg-[#1b2430]/95 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl [&>button]:hidden">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-white">Choose closing date and time</DialogTitle>
            <DialogDescription className="text-sm leading-6 text-[var(--text-secondary)]">
              Set when the republished {assessmentLabelLower} <span className="text-white">{assignmentTitle}</span> should close for the selected audience.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                  <CalendarClock className="h-4 w-4" />
                </span>
                Closing schedule
              </div>
              <TeacherDateTimePicker
                value={parsedValue}
                onChange={(nextDate) => onCloseDateTimeChange(nextDate ? nextDate.toISOString() : "")}
                placeholder="Pick closing date and time"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onCancel}
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15"
            >
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
                <X className="h-4 w-4" />
              </span>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!closeDateTime.trim()}
              onClick={onConfirm}
              className="rounded-2xl border border-white/20 bg-white/20 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                <RotateCcw className="h-4 w-4" />
              </span>
              Confirm Republish
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
