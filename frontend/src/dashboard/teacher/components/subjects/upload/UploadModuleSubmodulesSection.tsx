// Renders editable submodule rows and add/remove actions for the module form.
import { Paperclip, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SubjectFileItem } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";
import { SubjectModuleAttachedFilesSection } from "./SubjectModuleAttachedFilesSection";
import type { ModuleErrors, SubmoduleDraft } from "./uploadModuleTypes";
import { RichDescriptionTextarea } from "./RichDescriptionTextarea";

type Props = {
  availableFiles: SubjectFileItem[];
  subjectId: string;
  submodules: SubmoduleDraft[];
  attachmentsOpenBySubmoduleId: Record<string, boolean>;
  errors: ModuleErrors;
  touched: Record<string, { title: boolean; description: boolean; content: boolean }>;
  onAdd: () => void;
  onUpdate: (submoduleId: string, field: "title" | "description" | "content", value: string) => void;
  onTouched: (submoduleId: string, field: "title" | "description" | "content") => void;
  onRemove: (submoduleId: string) => void;
  onToggleAttachments: (submoduleId: string) => void;
  onAddAttachedFile: (submoduleId: string, fileId: string) => void;
  onRemoveAttachedFile: (submoduleId: string, fileId: string) => void;
};

export function UploadModuleSubmodulesSection({
  availableFiles,
  subjectId,
  submodules,
  attachmentsOpenBySubmoduleId,
  errors,
  touched,
  onAdd,
  onUpdate,
  onTouched,
  onRemove,
  onToggleAttachments,
  onAddAttachedFile,
  onRemoveAttachedFile,
}: Props) {
  const showError = (submoduleId: string, field: "title" | "description" | "content") => Boolean(touched[submoduleId]?.[field] && errors.submodules[submoduleId]?.[field]);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-white">Submodules</p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">Add submodule titles, descriptions, full content, and file uploads for this module.</p>
      </div>
      <div className="space-y-3">
        {submodules.map((submodule, index) => {
          const isAttachmentsOpen = attachmentsOpenBySubmoduleId[submodule.id] ?? false;
          const canRemove = index > 0;

          return (
            <div key={submodule.id} className="rounded-2xl border border-white/15 bg-white/10 p-4">
              {canRemove ? (
                <div className="flex items-start justify-end gap-4">
                  <Button type="button" variant="ghost" onClick={() => onRemove(submodule.id)} className="h-12 rounded-2xl border border-white/15 bg-white/10 px-4 text-white hover:bg-white/20">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove Submodule
                  </Button>
                </div>
              ) : null}
              <div className={`${canRemove ? "mt-4 " : ""}space-y-2`}>
                <Label htmlFor={submodule.id} className="text-white">Submodule Title</Label>
                <Input id={submodule.id} value={submodule.title} onChange={(event) => onUpdate(submodule.id, "title", event.target.value)} onBlur={() => onTouched(submodule.id, "title")} placeholder="Enter submodule title" className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70" />
                {showError(submodule.id, "title") ? <p className="mt-1 text-sm font-medium text-red-600">{errors.submodules[submodule.id]?.title}</p> : null}
                <div className="space-y-2">
                  <Label htmlFor={`${submodule.id}-description`} className="text-white">Description (Optional)</Label>
                  <RichDescriptionTextarea
                    id={`${submodule.id}-description`}
                    value={submodule.description}
                    onChange={(value) => onUpdate(submodule.id, "description", value)}
                    onBlur={() => onTouched(submodule.id, "description")}
                    placeholder="Describe what this submodule covers. Supports links, image URLs, and simple HTML."
                    className="min-h-[80px] rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70"
                  />
                  {showError(submodule.id, "description") ? <p className="mt-1 text-sm font-medium text-red-600">{errors.submodules[submodule.id]?.description}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${submodule.id}-content`} className="text-white">Submodule Content</Label>
                  <RichDescriptionTextarea
                    id={`${submodule.id}-content`}
                    value={submodule.content}
                    onChange={(value) => onUpdate(submodule.id, "content", value)}
                    onBlur={() => onTouched(submodule.id, "content")}
                    placeholder="Enter the full content for this submodule. Supports links, image URLs, and simple HTML."
                    className="min-h-[180px] rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70"
                  />
                  {showError(submodule.id, "content") ? <p className="mt-1 text-sm font-medium text-red-600">{errors.submodules[submodule.id]?.content}</p> : null}
                </div>
                <div className="pt-2">
                  <Button type="button" onClick={() => onToggleAttachments(submodule.id)} className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20">
                    <Paperclip className="mr-2 h-4 w-4" />
                    Attach Files
                  </Button>
                </div>
                {isAttachmentsOpen ? (
                  <SubjectModuleAttachedFilesSection
                    availableFiles={availableFiles}
                    selectedFileIds={submodule.attachedFileIds}
                    subjectId={subjectId}
                    idPrefix={`submodule-${submodule.id}-attachments`}
                    enableUploadNewFile
                    onAddFile={(fileId) => onAddAttachedFile(submodule.id, fileId)}
                    onRemoveFile={(fileId) => onRemoveAttachedFile(submodule.id, fileId)}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Button type="button" onClick={onAdd} className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20">+ Add Submodule</Button>
      </div>
    </div>
  );
}

