// Expanded submodule list shown under an open module.
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";

type Props = {
  module: SubjectModuleItem;
  onDeleteSubmodule: (moduleId: string, submoduleId: string) => void;
  onOpenAttachedFile: (fileId: string, moduleId?: string, submoduleId?: string) => void;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
  onReorderSubmodules: (moduleId: string, orderedSubmoduleIds: string[]) => void;
};

type SortableSubmoduleRowProps = {
  moduleId: string;
  submodule: SubjectModuleItem["submodules"][number];
  onDeleteSubmodule: (moduleId: string, submoduleId: string) => void;
  onOpenAttachedFile: (fileId: string, moduleId?: string, submoduleId?: string) => void;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
};

function isDirectFileBackedSubmodule(submodule: SubjectModuleItem["submodules"][number]) {
  return submodule.attachedFileIds.length > 0 && submodule.content.trim().length === 0;
}

function SortableSubmoduleRow({ moduleId, submodule, onDeleteSubmodule, onOpenAttachedFile, onOpenSubmodule }: SortableSubmoduleRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: submodule.id });
  const primaryAttachedFileId = submodule.attachedFileIds[0] ?? null;

  const handleOpen = () => {
    if (primaryAttachedFileId && isDirectFileBackedSubmodule(submodule)) {
      onOpenAttachedFile(primaryAttachedFileId, moduleId);
      return;
    }

    onOpenSubmodule(moduleId, submodule.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpen();
        }
      }}
      className={`flex cursor-pointer flex-col gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4 ${isDragging ? "opacity-90 ring-1 ring-cyan-300/50" : ""}`}
    >
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <button
          type="button"
          className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white/65 transition hover:bg-white/20 hover:text-white"
          aria-label={`Reorder ${submodule.title}`}
          onClick={(event) => event.stopPropagation()}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex min-w-0 max-w-[80%] flex-1 flex-col">
          <p className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm font-semibold text-[var(--text-primary)] transition hover:text-[#1EA896]">{submodule.title}</p>
        </div>
      </div>
      <Button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDeleteSubmodule(moduleId, submodule.id);
        }}
        className="flex items-center justify-center shrink-0 !h-8 !min-h-[2rem] !min-w-[90px] !px-2.5 !py-0 !text-xs !gap-1.5 !rounded-md bg-white/10 text-white hover:bg-white/20"
      >
        <Trash2 className="h-3.5 w-3.5 text-red-400" />
        Delete
      </Button>
    </div>
  );
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
              <SortableSubmoduleRow
                key={submodule.id}
                moduleId={module.id}
                submodule={submodule}
                onDeleteSubmodule={onDeleteSubmodule}
                onOpenAttachedFile={onOpenAttachedFile}
                onOpenSubmodule={onOpenSubmodule}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}





