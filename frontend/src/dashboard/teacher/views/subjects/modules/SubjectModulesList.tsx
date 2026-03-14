// Renders the list of subject modules and expanded module state.
import { ConfirmDeleteModal } from "@/dashboard/teacher/components/assignments/ConfirmDeleteModal";
import { SubjectModuleRow } from "./cards/SubjectModuleRow";
import type { useSubjectModulesViewState } from "./useSubjectModulesViewState";

type Props = { state: ReturnType<typeof useSubjectModulesViewState> };

export function SubjectModulesList({ state }: Props) {
  return (
    <>
      <div className="mt-6 flex flex-col gap-6">
        {state.visibleModules.length === 0 ? (
          <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-6 text-sm text-[var(--text-primary)]/70">
            No modules available for this subject.
          </div>
        ) : null}
        {state.visibleModules.map((module) => (
          <SubjectModuleRow
            key={module.id}
            module={module}
            isExpanded={state.expandedModuleId === module.id}
            onDeleteModule={state.requestDeleteModule}
            onDeleteSubmodule={state.requestDeleteSubmodule}
            onOpenSubmodule={state.openSubmodule}
            onPublish={state.publishModule}
            onToggle={state.toggleModule}
            theme={state.theme}
          />
        ))}
      </div>
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
      />
    </>
  );
}
