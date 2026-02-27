// src/dashboard/teacher/components/messages/ReplyMessageModal.tsx
import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MESSAGE_MAX } from "./recipientsData";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toName: string;
  onSend?: (payload: {
    to: string;
    message: string;
  }) => void;
};

export default function ReplyMessageModal(props: Props) {
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (!props.open) return;
    setMessage("");
  }, [props.open, props.toName]);

  const disabled = !props.toName.trim() || !message.trim();

  const send = () => {
    if (disabled) return;
    props.onSend?.({ to: props.toName, message });
    props.onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") props.onOpenChange(false);
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent
        className={cn(
          "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100vw-2rem)] sm:w-full max-w-4xl",
          "max-h-[85vh] overflow-hidden",
          "bg-white/15 backdrop-blur-xl border border-white/20 text-white",
          "p-0",
          "[&>button]:hidden"
        )}
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-col max-h-[85vh]">
          <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-white/20">
            <div className="space-y-1">
              <DialogTitle className="text-white text-xl font-semibold">Reply</DialogTitle>
              <div className="text-sm text-white/70">
                Reply to the selected conversation.
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => props.onOpenChange(false)}
              className="text-white hover:bg-white/20 rounded-xl"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogHeader>

          <div className="px-6 py-6 overflow-y-auto overscroll-contain max-h-[calc(85vh-72px)]">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Reply Details</h3>

                <div className="space-y-2">
                  <div className="text-sm text-white/70">To</div>
                  <div
                    className={cn(
                      "h-12 rounded-xl border border-white/20 bg-white/10",
                      "flex items-center px-4 text-white"
                    )}
                  >
                    {props.toName || "No recipient selected"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/70">Message</div>
                    <div
                      className={cn(
                        "text-xs",
                        message.length >= MESSAGE_MAX ? "text-amber-300" : "text-white/60"
                      )}
                    >
                      {message.length}/{MESSAGE_MAX}
                    </div>
                  </div>

                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your reply"
                    maxLength={MESSAGE_MAX}
                    className="min-h-[170px] rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />

                  <div className="text-xs text-white/60">Max {MESSAGE_MAX} characters.</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-white/20">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => props.onOpenChange(false)}
                  className="text-white hover:bg-white/20 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={send}
                  disabled={disabled}
                  className="bg-white/20 hover:bg-white/25 text-white rounded-xl disabled:opacity-50"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}