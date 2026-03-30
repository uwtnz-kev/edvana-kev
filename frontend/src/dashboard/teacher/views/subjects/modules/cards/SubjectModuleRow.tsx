import { useEffect, useMemo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { buildModuleErrors } from "@/dashboard/teacher/components/subjects/upload/uploadModuleValidation";
import type { SubjectFileItem } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";
import type { SubjectModuleItem, SubjectModulePayload } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
import { SubjectModuleEditForm } from "./SubjectModuleEditForm";
import { SubjectModuleRowHeader } from "./SubjectModuleRowHeader";
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
      <SubjectModuleRowHeader
        attributes={attributes}
        descriptionPreview={descriptionPreview}
        isExpanded={isExpanded}
        listeners={listeners}
        module={module}
        onDeleteModule={onDeleteModule}
        onPublish={onPublish}
        onToggle={onToggle}
        theme={theme}
      />
      {isEditing ? (
        <SubjectModuleEditForm
          description={description}
          descriptionError={errors.description}
          moduleId={module.id}
          moduleTitle={moduleTitle}
          onCancel={handleCancel}
          onDescriptionChange={setDescription}
          onSave={handleSave}
          onTitleChange={setModuleTitle}
          submitted={submitted}
          titleError={errors.moduleTitle}
        />
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
