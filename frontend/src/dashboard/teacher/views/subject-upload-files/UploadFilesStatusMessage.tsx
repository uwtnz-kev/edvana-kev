type UploadStatus = "idle" | "uploading" | "success" | "error";

type UploadProgress = {
  current: number;
  total: number;
  currentFileName: string;
};

type Props = {
  progressPercent: number;
  saving: boolean;
  uploadMessage: string | null;
  uploadProgress: UploadProgress;
  uploadStatus: UploadStatus;
};

export function UploadFilesStatusMessage({ progressPercent, saving, uploadMessage, uploadProgress, uploadStatus }: Props) {
  if ((!saving && !uploadMessage) || uploadProgress.total <= 0) return null;

  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm font-medium ${uploadStatus === "error" ? "text-red-300" : uploadStatus === "success" ? "text-emerald-300" : "text-white"}`}>
          {uploadMessage ?? "Uploading file..."}
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          {saving ? `Uploading ${uploadProgress.current} of ${uploadProgress.total}` : `${uploadProgress.total} file${uploadProgress.total === 1 ? "" : "s"}`}
        </p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-300 ${uploadStatus === "error" ? "bg-red-400" : uploadStatus === "success" ? "bg-emerald-400" : "bg-cyan-400"}`}
          style={{ width: `${saving ? progressPercent : uploadStatus === "success" ? 100 : progressPercent}%` }}
        />
      </div>
      {saving && uploadProgress.currentFileName ? <p className="truncate text-xs text-white/60">{uploadProgress.currentFileName}</p> : null}
    </div>
  );
}
