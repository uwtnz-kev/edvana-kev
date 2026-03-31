// Renders the list of subject modules and expanded module state.
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { X } from "lucide-react";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ConfirmDeleteModal } from "@/dashboard/teacher/components/assignments/ConfirmDeleteModal";
import { SubjectModuleRow } from "./cards/SubjectModuleRow";
import type { useSubjectModulesViewState } from "./useSubjectModulesViewState";

type Props = { state: ReturnType<typeof useSubjectModulesViewState> };

export function SubjectModulesList({ state }: Props) {
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (state.isSearchActive) return;
    if (!over || active.id === over.id) return;
    const currentIds = state.visibleModules.map((module) => module.id);
    const activeIndex = currentIds.indexOf(String(active.id));
    const overIndex = currentIds.indexOf(String(over.id));
    if (activeIndex < 0 || overIndex < 0) return;
    state.reorderModules(arrayMove(currentIds, activeIndex, overIndex));
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={state.visibleModules.map((module) => module.id)} strategy={verticalListSortingStrategy}>
          <div className="mt-6 flex flex-col gap-6">
            {state.visibleModules.length === 0 ? (
              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-6 text-sm text-[var(--text-primary)]/70">
                No modules match your search.
              </div>
            ) : null}
            {state.visibleModules.map((module) => (
              <SubjectModuleRow
                key={module.id}
                module={module}
                availableFiles={state.subjectFiles}
                isExpanded={state.isModuleExpanded(module.id)}
                onDeleteModule={state.requestDeleteModule}
                onDeleteSubmodule={state.requestDeleteSubmodule}
                onOpenAttachedFile={state.openAttachedFile}
                onOpenSubmodule={state.openSubmodule}
                onPublish={state.publishModule}
                onReorderSubmodules={state.reorderSubmodules}
                onToggle={state.toggleModule}
                theme={state.theme}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <ConfirmDeleteModal
        open={state.deleteConfirmOpen}
        onOpenChange={(open) => {
          if (!open) state.closeDeleteConfirm();
        }}
        title={state.deleteConfirmTitle}
        description={state.deleteConfirmDescription}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={state.confirmDelete}
        cancelIcon={X}
      />
    </>
  );
}
