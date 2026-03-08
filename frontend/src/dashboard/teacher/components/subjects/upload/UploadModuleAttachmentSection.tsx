// Renders the file input used to attach a module upload file.
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  fileName: string;
  onFileChange: (value: string) => void;
};

export function UploadModuleAttachmentSection({ fileName, onFileChange }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="module-file" className="text-[#4B2E1F]">Upload file</Label>
      <Input
        id="module-file"
        type="file"
        onChange={(event) => onFileChange(event.target.files?.[0]?.name ?? "")}
        className="h-12 rounded-2xl border-white/20 bg-white/10 text-[#4B2E1F] file:mr-4 file:rounded-xl file:border-0 file:bg-white/20 file:px-3 file:py-2 file:text-[#4B2E1F]"
      />
      {fileName ? <p className="text-xs text-[#4B2E1F]/60">Selected file: {fileName}</p> : null}
    </div>
  );
}
