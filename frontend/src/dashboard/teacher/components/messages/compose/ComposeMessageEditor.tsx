// Message editor area with character count and textarea.
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/cn";
import { MESSAGE_MAX } from "../recipientsData";

type Props = {
  message: string;
  setMessage: (value: string) => void;
};

export function ComposeMessageEditor({ message, setMessage }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/70">Message</div>
        <div className={cn("text-xs", message.length >= MESSAGE_MAX ? "text-amber-300" : "text-white/60")}>{message.length}/{MESSAGE_MAX}</div>
      </div>
      <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message" maxLength={MESSAGE_MAX} className="min-h-[170px] rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50" />
      <div className="text-xs text-white/60">Max {MESSAGE_MAX} characters.</div>
    </div>
  );
}
