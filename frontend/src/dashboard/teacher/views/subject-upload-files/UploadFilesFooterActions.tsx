import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type Props = {
  canSubmit: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  saving: boolean;
  selectedFilesCount: number;
  uploadMessage: string | null;
  uploadProgressTotal: number;
  uploadStatus: UploadStatus;
};

export function UploadFilesFooterActions({
  canSubmit,
  onCancel,
  onSubmit,
  saving,
  selectedFilesCount,
  uploadMessage,
  uploadProgressTotal,
  uploadStatus,
}: Props) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      {!uploadProgressTotal && uploadMessage ? (
        <p
          className={`sm:mr-auto text-sm ${
            uploadStatus === "success"
              ? "text-emerald-300"
              : uploadStatus === "error"
                ? "text-red-300"
                : "text-white/70"
          }`}
        >
          {uploadMessage}
        </p>
      ) : null}
      <Button type="button" onClick={onCancel} className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/20">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
          <X className="h-4 w-4" />
        </span>
        Cancel
      </Button>
      <Button type="button" onClick={onSubmit} disabled={!canSubmit} className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-60">
        <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/15 text-amber-300">
          <Upload className="h-4 w-4" />
        </span>
        {saving ? "Uploading..." : selectedFilesCount > 1 ? "Upload Files" : "Upload File"}
      </Button>
    </div>
  );
}
