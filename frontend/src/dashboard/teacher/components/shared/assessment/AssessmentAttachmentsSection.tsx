/** Renders the shared attachment picker and attachment list UI for assessment forms. */
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAssessmentFileSize } from "./assessmentAttachmentHelpers";
import { attachmentChipStyles } from "./assessmentVisualStyles";

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
      <div className={attachmentChipStyles.container}>
        <span className={attachmentChipStyles.icon}>
          <Paperclip className="h-4 w-4" />
        </span>
        <span className={attachmentChipStyles.text}>Attachments (Optional)</span>
      </div>
      <input ref={attachmentsInputRef} type="file" multiple onChange={onPickAttachments} className="hidden" />
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => attachmentsInputRef.current?.click()} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-white hover:bg-[var(--card-hover)]">Add attachments</Button>
        {attachments.length > 1 ? <Button type="button" onClick={onClearAttachments} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-white hover:bg-[var(--card-hover)]">Clear all</Button> : null}
      </div>
      <div className={attachmentChipStyles.list}>
        {attachments.length === 0 ? <p className="text-sm text-[var(--text-secondary)]">No files selected.</p> : attachments.map((attachment) => (
          <div key={attachment.id} className={attachmentChipStyles.item}>
            <div className="min-w-0"><p className="truncate text-sm text-white">{attachment.name}</p><p className="text-xs text-[var(--text-secondary)]">{formatAssessmentFileSize(attachment.size)}</p></div>
            <Button type="button" onClick={() => onRemoveAttachment(attachment.id)} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-white hover:bg-[var(--card-hover)]">Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
