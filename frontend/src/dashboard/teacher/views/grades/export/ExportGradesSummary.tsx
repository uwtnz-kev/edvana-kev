// Summary and preview area for the export grades workspace.
import GradeListBuilderCard from "@/dashboard/teacher/components/grades/export/GradeListBuilderCard";
import type { useExportGradesState } from "./useExportGradesState";

type Props = { state: ReturnType<typeof useExportGradesState> };

export function ExportGradesSummary({ state }: Props) {
  return (
    <>
      {state.activeNewListName ? <GradeListBuilderCard listName={state.activeNewListName} /> : null}
      <div className="group rounded-2xl teacher-panel-surface p-6 text-[var(--text-secondary)] hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B6F52]/25">
        Export configuration UI will go here next.
      </div>
    </>
  );
}


