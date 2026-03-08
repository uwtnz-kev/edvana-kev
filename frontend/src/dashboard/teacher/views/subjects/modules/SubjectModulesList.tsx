// Renders the list of subject modules and expanded module state.
import { SubjectModuleRow } from "./cards/SubjectModuleRow";
import type { useSubjectModulesViewState } from "./useSubjectModulesViewState";

type Props = { state: ReturnType<typeof useSubjectModulesViewState> };

export function SubjectModulesList({ state }: Props) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {state.visibleModules.map((module) => (
        <SubjectModuleRow
          key={module.id}
          module={module}
          isExpanded={state.expandedModuleId === module.id}
          onOpenSubmodule={state.openSubmodule}
          onPublish={state.publishModule}
          onToggle={state.toggleModule}
          theme={state.theme}
        />
      ))}
    </div>
  );
}
