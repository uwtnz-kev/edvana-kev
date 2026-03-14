// Reply composer shown at the bottom of the message details view.
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { useMessageDetailsState } from "./useMessageDetailsState";

type Props = { state: ReturnType<typeof useMessageDetailsState> };

export function MessageReplyComposer({ state }: Props) {
  return (
    <div className="border-t border-white/10 p-6">
      <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
        <Textarea value={state.reply} onChange={(event) => state.setReply(event.target.value)} placeholder="Write a reply..." className="min-h-[70px] max-h-[120px] resize-none border-0 bg-transparent px-0 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus-visible:ring-0" />
        <div className="mt-4 flex justify-end">
          <Button type="button" onClick={state.sendReply} className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20">
            <Send className="mr-2 h-4 w-4" />Send Reply
          </Button>
        </div>
      </div>
    </div>
  );
}

