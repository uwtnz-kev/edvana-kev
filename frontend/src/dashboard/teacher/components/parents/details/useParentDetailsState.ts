// Owns modal visibility side effects such as body locking and escape handling.
import { useEffect } from "react";
import type { ParentRecord } from "@/utils/data/parents/parentsStore";

type Args = {
  open: boolean;
  onClose: () => void;
  parent: ParentRecord | null;
};

export function useParentDetailsState({ open, onClose, parent }: Args) {
  const isVisible = open && !!parent;

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Escape should mirror clicking the modal backdrop.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isVisible, onClose]);

  return isVisible;
}
