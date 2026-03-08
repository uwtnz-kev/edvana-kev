// Footer actions for cancelling or sending the compose-message modal.
import { Button } from "@/components/ui/button";

type Props = {
  disabled: boolean;
  onCancel: () => void;
  onSend: () => void;
};

export function ComposeMessageFooter({ disabled, onCancel, onSend }: Props) {
  return (
    <div className="flex justify-end gap-3 pt-6 border-t border-white/20">
      <Button type="button" variant="ghost" onClick={onCancel} className="text-white hover:bg-white/20 rounded-xl">Cancel</Button>
      <Button type="button" onClick={onSend} disabled={disabled} className="bg-white/20 hover:bg-white/25 text-white rounded-xl disabled:opacity-50">Send</Button>
    </div>
  );
}
