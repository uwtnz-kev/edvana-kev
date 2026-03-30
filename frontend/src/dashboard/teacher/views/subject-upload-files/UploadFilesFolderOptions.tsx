import { Plus, Upload } from "lucide-react";

type Props = {
  onToggleCreate: () => void;
  onToggleExisting: () => void;
};

export function UploadFilesFolderOptions({ onToggleCreate, onToggleExisting }: Props) {
  return (
    <div className="space-y-1">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <button
            type="button"
            onClick={onToggleCreate}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
              <Plus className="h-4 w-4" />
            </span>
            Create Folder
          </button>
          <p className="text-xs text-white/50">(Optional)</p>
        </div>
        <div className="space-y-1">
          <button
            type="button"
            onClick={onToggleExisting}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/15 text-amber-300">
              <Upload className="h-4 w-4" />
            </span>
            Upload to Existing Folder
          </button>
          <p className="text-xs text-white/50">(Optional)</p>
        </div>
      </div>
    </div>
  );
}
