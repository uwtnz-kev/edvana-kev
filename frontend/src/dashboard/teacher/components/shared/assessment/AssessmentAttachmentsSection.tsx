/** Renders the shared attachment picker and attachment list UI for assessment forms. */
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAssessmentFileSize } from "./assessmentAttachmentHelpers";

type AttachmentLike = {
  id: string;
  name: string;
  size: number;
};

type Props = {
  attachments: AttachmentLike[];
  attachmentsInputRef: React.RefObject<HTMLInputElement | null>;
  onPickAttachments: React.ChangeEventHandler<HTMLInputElement>;
  onRemoveAttachment: (id: string) => void;
  onClearAttachments: () => void;
};

export function AssessmentAttachmentsSection({
  attachments,
  attachmentsInputRef,
  onPickAttachments,
  onRemoveAttachment,
  onClearAttachments,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-purple-500/15 text-purple-700">
          <Paperclip className="h-4 w-4" />
        </span>
        <span className="text-sm font-medium text-[#3B240F]">Attachments (Optional)</span>
      </div>
      <input ref={attachmentsInputRef} type="file" multiple onChange={onPickAttachments} className="hidden" />
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => attachmentsInputRef.current?.click()} className="rounded-2xl border border-white/20 bg-white/20 text-[#3B240F] hover:bg-white/30">Add attachments</Button>
        {attachments.length > 1 ? <Button type="button" onClick={onClearAttachments} className="rounded-2xl border border-white/20 bg-white/20 text-[#3B240F] hover:bg-white/30">Clear all</Button> : null}
      </div>
      <div className="space-y-2 rounded-2xl border border-white/10 bg-white/10 p-3">
        {attachments.length === 0 ? <p className="text-sm text-[#3B240F]/70">No files selected.</p> : attachments.map((attachment) => (
          <div key={attachment.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/10 p-2">
            <div className="min-w-0"><p className="truncate text-sm text-[#3B240F]">{attachment.name}</p><p className="text-xs text-[#3B240F]/70">{formatAssessmentFileSize(attachment.size)}</p></div>
            <Button type="button" onClick={() => onRemoveAttachment(attachment.id)} className="rounded-2xl border border-white/20 bg-white/20 text-[#3B240F] hover:bg-white/30">Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
