import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { SubjectFileItem } from "@/dashboard/teacher/components/subjects/files/subjectFilesTypes";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
import { SubjectSubmoduleRow } from "./SubjectSubmoduleRow";

type Props = {
  availableFiles: SubjectFileItem[];
  module: SubjectModuleItem;
  onDeleteSubmodule: (moduleId: string, submoduleId: string) => void;
  onOpenAttachedFile: (fileId: string, moduleId?: string, submoduleId?: string) => void;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
  onReorderSubmodules: (moduleId: string, orderedSubmoduleIds: string[]) => void;
};

function isDirectFileBackedSubmodule(submodule: SubjectModuleItem["submodules"][number]) {
  return submodule.attachedFileIds.length > 0 && submodule.content.trim().length === 0;
}

export function SubjectSubmoduleList({ module, onDeleteSubmodule, onOpenAttachedFile, onOpenSubmodule, onReorderSubmodules }: Props) {
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const currentIds = module.submodules.map((submodule) => submodule.id);
    const activeIndex = currentIds.indexOf(String(active.id));
    const overIndex = currentIds.indexOf(String(over.id));
    if (activeIndex < 0 || overIndex < 0) return;
    onReorderSubmodules(module.id, arrayMove(currentIds, activeIndex, overIndex));
  };

  return (
    <div className="border-t border-white/10 bg-white/5 px-5 py-3">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={module.submodules.map((submodule) => submodule.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 pl-0 sm:pl-[3.75rem]">
            {module.submodules.map((submodule) => (
              <SubjectSubmoduleRow
                key={submodule.id}
                moduleId={module.id}
                submodule={submodule}
                onDelete={onDeleteSubmodule}
                onOpen={() => {
                  const primaryAttachedFileId = submodule.attachedFileIds[0] ?? null;

                  if (primaryAttachedFileId && isDirectFileBackedSubmodule(submodule)) {
                    onOpenAttachedFile(primaryAttachedFileId, module.id, submodule.id);
                    return;
                  }

                  onOpenSubmodule(module.id, submodule.id);
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
