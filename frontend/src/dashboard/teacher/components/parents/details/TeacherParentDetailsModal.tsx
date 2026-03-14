// Orchestrates the parent details modal shell and portal rendering.
import { createPortal } from "react-dom";
import type { ParentRecord } from "@/utils/data/parents/parentsStore";
import { ParentDetailsFooter } from "./ParentDetailsFooter";
import { ParentDetailsHeader } from "./ParentDetailsHeader";
import { ParentDetailsOverview } from "./ParentDetailsOverview";
import { ParentDetailsSections } from "./ParentDetailsSections";
import { useParentDetailsState } from "./useParentDetailsState";

type Props = {
  open: boolean;
  onClose: () => void;
  parent: ParentRecord | null;
};

export default function TeacherParentDetailsModal({ open, onClose, parent }: Props) {
  const isVisible = useParentDetailsState({ onClose, open, parent });

  if (!isVisible || !parent) return null;

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
          <ParentDetailsHeader fullName={parent.fullName} onClose={onClose} />
          <div className="h-px bg-white/10" />
          <div className="px-7 py-5 overflow-y-auto max-h-[calc(85vh-88px)] space-y-6">
            <ParentDetailsOverview parent={parent} />
            <ParentDetailsSections parent={parent} />
            <ParentDetailsFooter onClose={onClose} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

