// Renders the module overview card and basic title/description inputs.
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import { RichDescriptionTextarea } from "./RichDescriptionTextarea";

type Props = {
  theme: SubjectIconTheme;
  subjectTitle: string;
  moduleTitle: string;
  description: string;
  titleError: string | null;
  descriptionError: string | null;
  titleTouched: boolean;
  descriptionTouched: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTitleBlur: () => void;
  onDescriptionBlur: () => void;
};

export function UploadModuleBasicFields(props: Props) {
  return (
    <>
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${props.theme.bgClass}`}>
          <Upload className={`h-6 w-6 ${props.theme.iconClass}`} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">Subject Module Upload</p>
          <h2 className="mt-2 text-lg font-semibold text-white">{props.subjectTitle}</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Add a new module for {props.subjectTitle} by filling out the details below.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="module-title" className="text-white">Module title</Label>
        <Input id="module-title" value={props.moduleTitle} onChange={(event) => props.onTitleChange(event.target.value)} onBlur={props.onTitleBlur} placeholder="Enter module title" className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70" />
        {props.titleTouched && props.titleError ? <p className="mt-1 text-sm font-medium text-red-600">{props.titleError}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="module-description" className="text-white">Description</Label>
        <RichDescriptionTextarea
          id="module-description"
          value={props.description}
          onChange={props.onDescriptionChange}
          onBlur={props.onDescriptionBlur}
          placeholder="Describe what this module covers. text field supports:link, image URL and  simple HTML."
          className="min-h-[140px] rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70"
        />
        {props.descriptionTouched && props.descriptionError ? <p className="mt-1 text-sm font-medium text-red-600">{props.descriptionError}</p> : null}
      </div>
    </>
  );
}
