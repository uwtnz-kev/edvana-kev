import { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SubjectFileItem } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
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
  isExpanded: boolean;
  module: SubjectModuleItem;
  onDeleteModule: (moduleId: string) => void;
  onDeleteSubmodule: (moduleId: string, submoduleId: string) => void;
  onOpenAttachedFile: (fileId: string, moduleId?: string, submoduleId?: string) => void;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
  onPublish: (moduleId: string) => void;
  onReorderSubmodules: (moduleId: string, orderedSubmoduleIds: string[]) => void;
  onToggle: (moduleId: string) => void;
  theme: { bgClass: string; iconClass: string };
};

export function SubjectModuleRow({
  availableFiles,
  isExpanded,
  module,
  onDeleteModule,
  onDeleteSubmodule,
  onOpenAttachedFile,
  onOpenSubmodule,
  onPublish,
  onReorderSubmodules,
  onToggle,
  theme,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: module.id });
  const descriptionPreview = useMemo(() => getModuleDescriptionPreview(module.description), [module.description]);

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
