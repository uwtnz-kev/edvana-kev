/**
 * AnnouncementAttachment
 * ----------------------
 * Handles attachment UI for the teacher dashboard a nn ou nc em en ts feature.
 */
import { Paperclip, Upload } from "lucide-react";
import type { AnnouncementAttachment as Attachment } from "@/dashboard/teacher/types/announcementTypes";

type Props = {
  value: Attachment | null;
  onChange: (value: Attachment | null) => void;
};

export function AnnouncementAttachment({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white">Attachment</label>
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/20 bg-white/10 p-4 text-white">
        <Upload className="h-4 w-4 text-white/70" />
        <span className="text-sm">{value ? "Replace attachment" : "Upload file"}</span>
        <input
          type="file"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            onChange(file ? { name: file.name, size: file.size, type: file.type } : null);
          }}
        />
      </label>
      {value ? (
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <Paperclip className="h-4 w-4" />
          <span>{value.name}</span>
        </div>
      ) : null}
    </div>
  );
}

