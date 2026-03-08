// Summary and preview area for the export grades workspace.
import GradeListBuilderCard from "@/dashboard/teacher/components/grades/export/GradeListBuilderCard";
import type { useExportGradesState } from "./useExportGradesState";

type Props = { state: ReturnType<typeof useExportGradesState> };

export function ExportGradesSummary({ state }: Props) {
  return (
    <>
      {state.activeNewListName ? <GradeListBuilderCard listName={state.activeNewListName} /> : null}
      <div className="group rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 text-[#6B4F3A] hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B6F52]/25">
        Export configuration UI will go here next.
      </div>
    </>
  );
}
