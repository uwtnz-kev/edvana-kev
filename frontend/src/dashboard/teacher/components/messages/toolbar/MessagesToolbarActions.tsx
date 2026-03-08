// Renders the toolbar action buttons with their labels and disabled states.
import type { ReactNode } from "react";
import { Archive, Pencil, Reply, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { iconButtonClass } from "./messagesToolbarHelpers";

type Props = {
  actionsDisabled: boolean;
  onArchive: () => void;
  onCompose: () => void;
  onDelete: () => void;
  onReply: () => void;
};

function LabeledActionButton({ children, disabled, label, onClick, title }: { children: ReactNode; disabled?: boolean; label: string; onClick: () => void; title: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-medium text-[#6B4F3A]">{label}</span>
      <Button variant="ghost" className={iconButtonClass} onClick={onClick} disabled={disabled} title={title}>{children}</Button>
    </div>
  );
}

export function MessagesToolbarActions({ actionsDisabled, onArchive, onCompose, onDelete, onReply }: Props) {
  return (
    <div className="ml-auto flex items-end gap-3">
      <LabeledActionButton label="Compose" title="Compose" onClick={onCompose}><Pencil className="h-5 w-5 text-[#FF715B]" /></LabeledActionButton>
      <LabeledActionButton label="Reply" title="Reply" onClick={onReply} disabled={actionsDisabled}><Reply className="h-5 w-5 text-[#A855F7]" /></LabeledActionButton>
      <LabeledActionButton label="Archive" title="Archive" onClick={onArchive} disabled={actionsDisabled}><Archive className="h-5 w-5 text-[#1EA896]" /></LabeledActionButton>
      <LabeledActionButton label="Delete" title="Delete" onClick={onDelete} disabled={actionsDisabled}><Trash2 className="h-5 w-5 text-[#FF715B]" /></LabeledActionButton>
    </div>
  );
}
