import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichDescriptionTextarea } from "@/dashboard/teacher/components/subjects/upload/RichDescriptionTextarea";

type Props = {
  description: string;
  descriptionError: string | null | undefined;
  moduleId: string;
  moduleTitle: string;
  onCancel: () => void;
  onDescriptionChange: (value: string) => void;
  onSave: () => void;
  onTitleChange: (value: string) => void;
  submitted: boolean;
  titleError: string | null | undefined;
};

export function SubjectModuleEditForm({
  description,
  descriptionError,
  moduleId,
  moduleTitle,
  onCancel,
  onDescriptionChange,
  onSave,
  onTitleChange,
  submitted,
  titleError,
}: Props) {
  return (
    <div className="border-t border-white/10 bg-white/5 px-5 py-4">
      <div className="space-y-4 pl-0 sm:pl-[3.75rem]">
        <div className="space-y-2">
          <Label htmlFor={`module-title-${moduleId}`} className="text-white">Module title</Label>
          <Input
            id={`module-title-${moduleId}`}
            value={moduleTitle}
            onChange={(event) => onTitleChange(event.target.value)}
            className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70"
          />
          {submitted && titleError ? <p className="text-sm font-medium text-red-600">{titleError}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`module-description-${moduleId}`} className="text-white">Description</Label>
          <RichDescriptionTextarea
            id={`module-description-${moduleId}`}
            value={description}
            onChange={onDescriptionChange}
            placeholder="Describe what this module covers."
            className="min-h-[120px] rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70"
          />
          {submitted && descriptionError ? <p className="text-sm font-medium text-red-600">{descriptionError}</p> : null}
        </div>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button type="button" onClick={onCancel} className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 text-white hover:bg-white/15"><span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300"><X className="h-4 w-4" /></span>Cancel</Button>
          <Button type="button" onClick={onSave} className="rounded-2xl border border-white/25 bg-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/30"><span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300"><Save className="h-4 w-4" /></span>Save</Button>
        </div>
      </div>
    </div>
  );
}
