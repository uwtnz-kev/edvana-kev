// Card row for a single subject module with expand/collapse behavior.
import { useEffect, useMemo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BookOpen, ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { StatusBadge } from "@/dashboard/teacher/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildModuleErrors } from "@/dashboard/teacher/components/subjects/upload/uploadModuleValidation";
import { RichDescriptionTextarea } from "@/dashboard/teacher/components/subjects/upload/RichDescriptionTextarea";
import type { SubjectFileItem } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";
import type { SubjectModuleItem, SubjectModulePayload } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
import { SubjectModuleMeta } from "./SubjectModuleMeta";
import { SubjectModuleStatus } from "./SubjectModuleStatus";
import { SubjectSubmoduleList } from "./SubjectSubmoduleList";

function getModuleDescriptionPreview(content: string) {
  return content
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type Props = {
  availableFiles: SubjectFileItem[];
  existingModuleTitles: string[];
  isExpanded: boolean;
  module: SubjectModuleItem;
  onDeleteModule: (moduleId: string) => void;
  onDeleteSubmodule: (moduleId: string, submoduleId: string) => void;
  onOpenAttachedFile: (fileId: string, moduleId?: string, submoduleId?: string) => void;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
  onPublish: (moduleId: string) => void;
  onReorderSubmodules: (moduleId: string, orderedSubmoduleIds: string[]) => void;
  onSaveModule: (moduleId: string, payload: SubjectModulePayload) => void;
  onToggle: (moduleId: string) => void;
  theme: { bgClass: string; iconClass: string };
};

export function SubjectModuleRow({
  availableFiles,
  existingModuleTitles,
  isExpanded,
  module,
  onDeleteModule,
  onDeleteSubmodule,
  onOpenAttachedFile,
  onOpenSubmodule,
  onPublish,
  onReorderSubmodules,
  onSaveModule,
  onToggle,
  theme,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [moduleTitle, setModuleTitle] = useState(module.title);
  const [description, setDescription] = useState(module.description);
  const [submitted, setSubmitted] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: module.id });

  useEffect(() => {
    setModuleTitle(module.title);
    setDescription(module.description);
    setIsEditing(false);
    setSubmitted(false);
  }, [module]);

  const errors = useMemo(
    () => buildModuleErrors(
      moduleTitle,
      description,
      module.submodules.map((submodule) => ({
        id: submodule.id,
        title: submodule.title,
        description: submodule.description,
        content: submodule.content ?? "",
        attachedFileIds: submodule.attachedFileIds ?? [],
      })),
      existingModuleTitles.filter((title) => title.trim().toLowerCase() !== module.title.trim().toLowerCase()),
    ),
    [description, existingModuleTitles, module.submodules, module.title, moduleTitle],
  );
  const descriptionPreview = useMemo(() => getModuleDescriptionPreview(module.description), [module.description]);

  const handleSave = () => {
    setSubmitted(true);
    if (errors.moduleTitle || errors.description) {
      return;
    }

    onSaveModule(module.id, {
      title: moduleTitle.trim(),
      description: description.trim(),
      attachedFileIds: module.attachedFileIds,
      submodules: module.submodules.map((submodule) => ({
        title: submodule.title,
        description: submodule.description,
        content: submodule.content ?? "",
        attachedFileIds: submodule.attachedFileIds ?? [],
      })),
    });
    setIsEditing(false);
    setSubmitted(false);
  };

  const handleCancel = () => {
    setModuleTitle(module.title);
    setDescription(module.description);
    setIsEditing(false);
    setSubmitted(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-sm transition hover:bg-white/15 hover:shadow-md ${isDragging ? "z-10 opacity-90 ring-1 ring-cyan-300/50" : ""}`}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onToggle(module.id)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle(module.id);
          }
        }}
        className="flex w-full cursor-pointer flex-col gap-3 px-5 py-4 text-left"
      >
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-4 overflow-hidden">
            <button
              type="button"
              className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/65 transition hover:bg-white/20 hover:text-white"
              aria-label={`Reorder ${module.title}`}
              onClick={(event) => event.stopPropagation()}
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.bgClass}`}><BookOpen className={`h-5 w-5 ${theme.iconClass}`} /></div>
            <div className="min-w-0 max-w-[55%] flex-1 overflow-hidden">
              <div className="flex min-w-0 items-center gap-2">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggle(module.id);
                  }}
                  className="rounded-full p-1 text-[var(--text-primary)]/60 transition hover:bg-white/20 hover:text-[var(--text-primary)]"
                  aria-label={isExpanded ? `Collapse ${module.title}` : `Expand ${module.title}`}
                >
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
                <h3 className="min-w-0 flex-1 truncate whitespace-nowrap overflow-hidden text-ellipsis text-base font-semibold text-[var(--text-primary)]" title={module.title}>{module.title}</h3>
              </div>
              {descriptionPreview ? (
                <p className="mt-1 truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm text-[var(--text-primary)]/70" title={descriptionPreview}>
                  {descriptionPreview}
                </p>
              ) : null}
            </div>
          </div>
          <div className="shrink-0">
            <StatusBadge status={module.status} label={module.status === "draft" ? "Draft" : "Published"} className="px-3" />
          </div>
        </div>
        <div className="flex min-w-0 items-center justify-between gap-4">
          <SubjectModuleMeta module={module} className="mt-0 min-w-0 flex-1 flex-wrap gap-6 text-sm text-white/70" />
          <SubjectModuleStatus module={module} onDelete={onDeleteModule} onPublish={onPublish} />
        </div>
      </div>
      {isEditing ? (
        <div className="border-t border-white/10 bg-white/5 px-5 py-4">
          <div className="space-y-4 pl-0 sm:pl-[3.75rem]">
            <div className="space-y-2">
              <Label htmlFor={`module-title-${module.id}`} className="text-white">Module title</Label>
              <Input id={`module-title-${module.id}`} value={moduleTitle} onChange={(event) => setModuleTitle(event.target.value)} className="h-12 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70" />
              {submitted && errors.moduleTitle ? <p className="text-sm font-medium text-red-600">{errors.moduleTitle}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`module-description-${module.id}`} className="text-white">Description</Label>
              <RichDescriptionTextarea
                id={`module-description-${module.id}`}
                value={description}
                onChange={setDescription}
                placeholder="Describe what this module covers."
                className="min-h-[120px] rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-white/70"
              />
              {submitted && errors.description ? <p className="text-sm font-medium text-red-600">{errors.description}</p> : null}
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" onClick={handleCancel} className="rounded-2xl border border-white/15 bg-white/10 px-5 py-2.5 text-white hover:bg-white/15">Cancel</Button>
              <Button type="button" onClick={handleSave} className="rounded-2xl border border-white/25 bg-white/20 px-5 py-2.5 font-semibold text-white hover:bg-white/30">Save</Button>
            </div>
          </div>
        </div>
      ) : null}
      {isExpanded ? (
        <SubjectSubmoduleList
          availableFiles={availableFiles}
          module={module}
          onDeleteSubmodule={onDeleteSubmodule}
          onOpenAttachedFile={onOpenAttachedFile}
          onOpenSubmodule={onOpenSubmodule}
          onReorderSubmodules={onReorderSubmodules}
        />
      ) : null}
    </div>
  );
}





