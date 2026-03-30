import type { ReactNode } from "react";
import { File as FileIcon, FileImage, X } from "lucide-react";

type PreviewKind = "image" | "pdf" | "doc" | "ppt" | "xls" | "file";

type SelectedUploadFile = {
  id: string;
  file: File;
  title: string;
  previewUrl: string | null;
  previewKind: PreviewKind;
};

type Props = {
  files: SelectedUploadFile[];
  formatSelectedFileSize: (sizeBytes: number) => string;
  onRemoveFile: (fileId: string) => void;
  renderPreviewTile: (file: SelectedUploadFile) => ReactNode;
};

export function UploadFilesSelectedFilesPreview({ files, formatSelectedFileSize, onRemoveFile, renderPreviewTile }: Props) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div>
        <p className="text-sm font-semibold text-white">Selected files</p>
        <p className="text-xs text-[var(--text-secondary)]">Preview selected files before uploading.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {files.map((file) => (
          <article key={file.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            <div className="relative h-32 w-full overflow-hidden bg-white/5">
              {renderPreviewTile(file)}
              <button
                type="button"
                onClick={() => onRemoveFile(file.id)}
                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[#1b2430]/80 text-white transition hover:bg-[#243041]"
                aria-label={`Remove ${file.file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-1 p-3">
              <p className="truncate text-sm font-medium text-white" title={file.title}>{file.title}</p>
              <p className="truncate text-xs text-[var(--text-secondary)]" title={file.file.name}>{file.file.name}</p>
              <div className="flex items-center gap-2 text-xs text-white/55">
                {file.previewKind === "image" ? <FileImage className="h-3.5 w-3.5" /> : <FileIcon className="h-3.5 w-3.5" />}
                <span>{formatSelectedFileSize(file.file.size)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
