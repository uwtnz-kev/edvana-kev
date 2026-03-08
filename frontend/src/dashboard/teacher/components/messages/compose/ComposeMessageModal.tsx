// Orchestrates the compose-message modal from extracted compose sections.
import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { ComposeMessageEditor } from "./ComposeMessageEditor";
import { ComposeMessageFooter } from "./ComposeMessageFooter";
import { ComposeMessageHeader } from "./ComposeMessageHeader";
import { ComposeRecipientsSection } from "./ComposeRecipientsSection";
import { useComposeMessageState } from "./useComposeMessageState";
import type { ComposeMessagePayload } from "./composeMessageHelpers";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "compose" | "reply";
  replyToName?: string;
  replySubject?: string;
  onSend?: (payload: ComposeMessagePayload) => void;
};

export default function ComposeMessageModal(props: Props) {
  const state = useComposeMessageState(props);
  const handleKeyDown = (event: React.KeyboardEvent) => { if (event.key === "Escape") props.onOpenChange(false); };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className={cn("fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", "w-[calc(100vw-2rem)] sm:w-full max-w-4xl", "max-h-[85vh] overflow-hidden", "bg-white/15 backdrop-blur-xl border border-white/20 text-white", "p-0", "[&>button]:hidden")} onKeyDown={handleKeyDown}>
        <div className="flex flex-col max-h-[85vh]">
          <ComposeMessageHeader mode={props.mode} onClose={() => props.onOpenChange(false)} />
          <div className="px-6 py-6 overflow-y-auto overscroll-contain max-h-[calc(85vh-72px)]">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Message Details</h3>
                <ComposeRecipientsSection placeholder={state.placeholder} recipientRole={state.recipientRole} setRecipientRole={state.setRecipientRole} setToSelected={state.setToSelected} toSelected={state.toSelected} />
                <ComposeMessageEditor message={state.message} setMessage={state.setMessage} />
              </div>
              <ComposeMessageFooter disabled={state.disabled} onCancel={() => props.onOpenChange(false)} onSend={state.send} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
