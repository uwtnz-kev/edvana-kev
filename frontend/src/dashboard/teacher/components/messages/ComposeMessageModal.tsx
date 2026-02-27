// src/dashboard/teacher/components/messages/ComposeMessageModal.tsx
import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";
import RecipientSearchSelect from "./RecipientSearchSelect";
import {
  MESSAGE_MAX,
  Option,
  RECIPIENT_LABEL_MAP,
  RECIPIENT_ROLE_OPTIONS,
} from "./recipientsData";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "compose" | "reply";
  replyToName?: string;
  replySubject?: string;
  onSend?: (payload: {
    courseId: string;
    to: string;
    subject: string;
    message: string;
    individual: boolean;
  }) => void;
};

export default function ComposeMessageModal(props: Props) {
  const [recipientRole, setRecipientRole] = React.useState("administrator");
  const [toSelected, setToSelected] = React.useState<Option[]>([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (!props.open) return;

    setRecipientRole("administrator");
    setMessage("");

    if (props.mode === "reply" && props.replyToName?.trim()) {
      const name = props.replyToName.trim();
      setToSelected([{ value: name.toLowerCase().replace(/\s+/g, "."), label: name }]);
    } else {
      setToSelected([]);
    }
  }, [props.open, props.mode, props.replyToName]);

  const placeholder = RECIPIENT_LABEL_MAP[recipientRole] ?? "Search recipients";
  const disabled = !toSelected.length || !message.trim();

  const send = () => {
    if (disabled) return;

    props.onSend?.({
      courseId: recipientRole,
      to: toSelected.map((s) => s.label).join(", "),
      subject: "",
      message,
      individual: false,
    });

    props.onOpenChange(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") props.onOpenChange(false);
  };

  const onRoleChange = (value: string) => {
    setRecipientRole(value);
    setToSelected([]);
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
              <DialogTitle className="text-white text-xl font-semibold">
                {props.mode === "reply" ? "Reply" : "Compose Message"}
              </DialogTitle>
              <div className="text-sm text-white/70">
                {props.mode === "reply"
                  ? "Send a reply to the selected conversation."
                  : "Create a message to one or more recipients."}
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
                <h3 className="text-lg font-semibold text-white">Message Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-white/70">Recipient Group</div>
                    <GlassSelect value={recipientRole} onValueChange={onRoleChange}>
                      <GlassSelectTrigger className="h-12 rounded-xl border border-white/20 bg-white/10 text-white">
                        <GlassSelectValue placeholder="Select recipient group" />
                      </GlassSelectTrigger>
                      <GlassSelectContent>
                        {RECIPIENT_ROLE_OPTIONS.map((o) => (
                          <GlassSelectItem key={o.value} value={o.value}>
                            {o.label}
                          </GlassSelectItem>
                        ))}
                      </GlassSelectContent>
                    </GlassSelect>
                  </div>
                </div>

                <RecipientSearchSelect
                  role={recipientRole}
                  placeholder={placeholder}
                  selected={toSelected}
                  onSelectedChange={setToSelected}
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/70">Message</div>
                    <div className={cn("text-xs", message.length >= MESSAGE_MAX ? "text-amber-300" : "text-white/60")}>
                      {message.length}/{MESSAGE_MAX}
                    </div>
                  </div>

                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message"
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