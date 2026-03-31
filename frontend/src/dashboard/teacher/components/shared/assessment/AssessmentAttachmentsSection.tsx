/** Renders the shared attachment picker and attachment list UI for assessment forms. */
import { Paperclip, Upload, X } from "lucide-react";
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
  attachmentsError?: string | null;
  attachmentsInputRef: React.RefObject<HTMLInputElement | null>;
  onPickAttachments: React.ChangeEventHandler<HTMLInputElement>;
  onRemoveAttachment: (id: string) => void;
  onClearAttachments: () => void;
  showActionIcons?: boolean;
  showHeader?: boolean;
  addAttachmentsLabel?: string;
};

export function AssessmentAttachmentsSection({
  attachments,
  attachmentsError,
  attachmentsInputRef,
  onPickAttachments,
  onRemoveAttachment,
  onClearAttachments,
  showActionIcons = false,
  showHeader = true,
  addAttachmentsLabel = "Add attachments",
}: Props) {
  return (
    <div className="space-y-2">
      {showHeader ? (
        <div className={attachmentChipStyles.container}>
          <span className={attachmentChipStyles.icon}>
            <Paperclip className="h-4 w-4" />
          </span>
          <span className={attachmentChipStyles.text}>Attachments (Optional)</span>
        </div>
      ) : null}
      <input ref={attachmentsInputRef} type="file" multiple onChange={onPickAttachments} className="hidden" />
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => attachmentsInputRef.current?.click()} className="rounded-2xl border border-white/25 bg-white/20 text-white hover:bg-white/30">{showActionIcons ? <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/15 text-amber-300"><Upload className="h-4 w-4" /></span> : null}{addAttachmentsLabel}</Button>
        {attachments.length > 1 ? <Button type="button" onClick={onClearAttachments} className="rounded-2xl border border-white/25 bg-white/20 text-white hover:bg-white/30">{showActionIcons ? <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300"><X className="h-4 w-4" /></span> : null}Clear all</Button> : null}
      </div>
      {attachmentsError ? <p className="text-sm font-medium text-red-600">{attachmentsError}</p> : null}
      <div className={attachmentChipStyles.list}>
        {attachments.length === 0 ? <p className="text-sm text-[var(--text-secondary)]">No files selected.</p> : attachments.map((attachment) => (
          <div key={attachment.id} className={attachmentChipStyles.item}>
            <div className="min-w-0"><p className="truncate text-sm text-white">{attachment.name}</p><p className="text-xs text-[var(--text-secondary)]">{formatAssessmentFileSize(attachment.size)}</p></div>
            <Button type="button" onClick={() => onRemoveAttachment(attachment.id)} className="rounded-2xl border border-white/25 bg-white/20 text-white hover:bg-white/30">{showActionIcons ? <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300"><X className="h-4 w-4" /></span> : null}Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

