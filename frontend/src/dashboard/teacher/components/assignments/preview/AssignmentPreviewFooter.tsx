/** Renders the close action for the assignment preview modal. */
import { Button } from "@/components/ui/button";

type Props = {
  onClose: () => void;
};

export function AssignmentPreviewFooter({ onClose }: Props) {
  return (
    <div className="border-t border-white/20 pt-4 flex justify-end">
      <Button
        type="button"
        onClick={onClose}
        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl"
      >
        Close
      </Button>
    </div>
  );
}
