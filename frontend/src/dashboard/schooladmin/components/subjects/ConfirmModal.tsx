import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  variant: 'danger' | 'neutral' | 'archive';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ 
  open, 
  title,
  message,
  confirmLabel,
  variant,
  onConfirm, 
  onCancel
}: ConfirmModalProps) {
  // Keyboard support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent 
        className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl max-w-md"
        onKeyDown={handleKeyDown}
        aria-describedby="confirm-description"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p id="confirm-description" className="text-white/80 text-sm">
            {message}
          </p>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/20">
            <Button
              variant="destructiveOutline"
              onClick={onCancel}
              className="rounded-xl"
              aria-label="Cancel action"
            >
              Cancel
            </Button>
            <Button
              variant={variant === 'danger' ? 'destructive' : variant === 'archive' ? 'archiveOutline' : 'secondary'}
              onClick={onConfirm}
              className="rounded-xl"
              aria-label={`Confirm ${confirmLabel.toLowerCase()}`}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}