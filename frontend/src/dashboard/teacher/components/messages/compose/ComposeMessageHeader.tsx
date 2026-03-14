// Header for the compose-message modal with title and close action.
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  mode: "compose" | "reply";
  onClose: () => void;
};

export function ComposeMessageHeader({ mode, onClose }: Props) {
  return (
    <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-white/20">
      <div className="space-y-1">
        <DialogTitle className="text-white text-xl font-semibold">{mode === "reply" ? "Reply" : "Compose Message"}</DialogTitle>
        <div className="text-sm text-[var(--text-secondary)]">{mode === "reply" ? "Send a reply to the selected conversation." : "Create a message to one or more recipients."}</div>
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 rounded-xl">
        <X className="w-4 h-4" />
      </Button>
    </DialogHeader>
  );
}
