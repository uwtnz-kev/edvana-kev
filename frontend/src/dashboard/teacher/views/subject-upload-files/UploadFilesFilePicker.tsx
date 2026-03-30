import type { ChangeEventHandler, RefObject } from "react";
import { Label } from "@/components/ui/label";

type Props = {
  fileError: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  onOpenFileDialog: () => void;
  selectedFilesCount: number;
};

export function UploadFilesFilePicker({ fileError, fileInputRef, onFileChange, onOpenFileDialog, selectedFilesCount }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="subject-file" className="text-white">Choose Files</Label>
      <input
        ref={fileInputRef}
        id="subject-file"
        type="file"
        multiple
        className="sr-only"
        onChange={onFileChange}
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onOpenFileDialog}
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-white/30 hover:bg-white/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.97] active:bg-white/25"
        >
          Choose Files
        </button>
        {selectedFilesCount > 0 ? <span className="text-sm text-white/70">{selectedFilesCount} selected</span> : null}
      </div>
      {fileError ? <p className="mt-1 text-sm font-medium text-red-600">{fileError}</p> : null}
    </div>
  );
}
