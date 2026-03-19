import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { DUPLICATE_FILE_MESSAGE, type DuplicateDecision } from "./subjectFileDuplicateUtils";

type Props = {
  open: boolean;
  duplicateFileName: string | null;
  existingLocations?: string[];
  onDecision: (decision: DuplicateDecision) => void;
  onOpenChange: (open: boolean) => void;
  busy?: boolean;
};

export function SubjectFileDuplicateDialog({ open, duplicateFileName, existingLocations = [], onDecision, onOpenChange, busy = false }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-slate-950/70 backdrop-blur-sm" />
        <DialogContent className="max-w-xl rounded-3xl border border-white/10 bg-[#1b2430]/95 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight text-white">Duplicate file found</DialogTitle>
          </DialogHeader>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{DUPLICATE_FILE_MESSAGE}</p>
          {duplicateFileName ? (
            <p className="mt-2 text-xs text-white/55">
              Existing file: <span className="font-medium text-white/80">{duplicateFileName}</span>
            </p>
          ) : null}

          {existingLocations.length > 0 ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Already Exists In</p>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                {existingLocations.map((location) => (
                  <li key={location} className="flex items-start gap-2">
                    <span className="mt-1 text-[10px] text-cyan-300">•</span>
                    <span className="leading-5">{location}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              onClick={() => onDecision("cancel")}
              disabled={busy}
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => onDecision("keep-both")}
              disabled={busy}
              className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Keep Both
            </Button>
            <Button
              type="button"
              onClick={() => onDecision("replace")}
              disabled={busy}
              className="rounded-2xl border border-red-400/30 bg-[#ff6b57] px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#ff5a44] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Replace
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
