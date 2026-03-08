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
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="max-w-2xl rounded-2xl bg-[#E9DEC9]/95 text-[#3B240F] border border-white/20 backdrop-blur-xl p-10 shadow-2xl [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold text-[#3B240F]">{title}</DialogTitle>
          </DialogHeader>

          <p className="text-[#3B240F]/70 text-base mt-3 leading-relaxed">{description}</p>

          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="bg-white/20 border border-[#3B240F]/20 text-[#3B240F] rounded-xl px-8 py-3 hover:bg-white/30"
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className="bg-[#FF715B] text-[#3B240F] rounded-xl px-8 py-3 font-semibold hover:opacity-90"
            >
              {confirmLabel}
            </Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

