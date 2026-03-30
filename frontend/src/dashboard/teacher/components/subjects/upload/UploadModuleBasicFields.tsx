// Renders the module overview card and basic title input.
import { BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";

type Props = {
  description: string;
  theme: SubjectIconTheme;
  subjectTitle: string;
  moduleTitle: string;
  titleError: string | null;
  titleTouched: boolean;
  onDescriptionChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onTitleBlur: () => void;
  showDescriptionField?: boolean;
};

export function UploadModuleBasicFields(props: Props) {
  return (
    <>
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${props.theme.bgClass}`}>
          <BookOpen className={`h-6 w-6 ${props.theme.iconClass}`} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">Subject Module Creation</p>
          <h2 className="mt-2 text-lg font-semibold text-white">{props.subjectTitle}</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Add a new module for {props.subjectTitle} by filling out the details below.</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="module-title" className="text-white">Module title</Label>
        <Input id="module-title" value={props.moduleTitle} onChange={(event) => props.onTitleChange(event.target.value)} onBlur={props.onTitleBlur} placeholder="Enter module title" className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70" />
        {props.titleTouched && props.titleError ? <p className="mt-1 text-sm font-medium text-red-600">{props.titleError}</p> : null}
      </div>

      {props.showDescriptionField !== false ? (
        <div className="space-y-2">
          <Label htmlFor="module-description" className="text-white">Module Description (optional)</Label>
          <textarea
            id="module-description"
            value={props.description}
            onChange={(event) => props.onDescriptionChange(event.target.value)}
            placeholder="Describe what this module covers."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      ) : null}
    </>
  );
}

