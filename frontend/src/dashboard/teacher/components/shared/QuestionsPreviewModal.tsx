/**
 * QuestionsPreviewModal
 * ---------------------
 * Renders the modal UI for the teacher dashboard s ha re d feature.
 */
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type QuestionsPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  content: string;
  title?: string;
};

export function QuestionsPreviewModal({
  open,
  onClose,
  content,
  title = "Questions Preview",
}: QuestionsPreviewModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 h-full w-full bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl max-h-[85vh] overflow-hidden rounded-2xl teacher-panel-surface shadow-2xl">
          <div className="flex items-start justify-between px-7 py-6">
            <div className="min-w-0">
              <div className="text-white text-2xl font-semibold truncate">{title}</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 flex items-center justify-center transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-px bg-white/10" />

          <div className="px-7 py-5 overflow-y-auto max-h-[calc(85vh-88px)]">
            <pre className="whitespace-pre-wrap font-sans text-sm text-white/90">
              {content.trim().length > 0 ? content : "No questions entered yet."}
            </pre>

            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/85 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


