/**
 * ConfirmDeleteModal
 * ------------------
 * Renders the modal UI for the teacher dashboard e xa ms feature.
 */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
};

export function ConfirmDeleteModal({
  open,
  onOpenChange,
  title = "Delete exam",
  description = "Are you sure you want to delete this exam This cannot be undone",
  confirmLabel = "Yes delete",
  cancelLabel = "No",
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-slate-950/70 backdrop-blur-sm" />
        <DialogContent className="max-w-xl rounded-3xl border border-white/10 bg-[#1b2430]/95 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight text-white">{title}</DialogTitle>
          </DialogHeader>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>

          <div className="mt-8 flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15"
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className="rounded-2xl border border-red-400/30 bg-[#ff6b57] px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-[#ff5a44]"
            >
              {confirmLabel}
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

