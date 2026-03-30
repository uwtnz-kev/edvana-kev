import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  disabled: boolean;
  selectedFilesCount: number;
  title: string;
  titleError: string | null;
  onTitleChange: (value: string) => void;
};

export function UploadFilesTitleInput({ disabled, onTitleChange, selectedFilesCount, title, titleError }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="file-title" className="text-white">File Title</Label>
      <Input
        id="file-title"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        disabled={disabled}
        placeholder={selectedFilesCount > 1 ? "Titles will use each filename during multi-file upload" : "Enter file title"}
        className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70 disabled:cursor-not-allowed disabled:opacity-70"
      />
      {selectedFilesCount > 1 ? <p className="text-xs text-[var(--text-secondary)]">Multiple files selected. Each upload will use its filename as the default title.</p> : null}
      {titleError ? <p className="mt-1 text-sm font-medium text-red-600">{titleError}</p> : null}
    </div>
  );
}
