// Orchestrates the export grades page using extracted workspace modules.
import {
  ExportGradesHeader,
  ExportGradesOptionsForm,
  ExportGradesSummary,
  useExportGradesState,
} from "./grades/export";

export default function ExportGradesView() {
  const state = useExportGradesState();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <ExportGradesHeader />
      <ExportGradesOptionsForm state={state} />
      <ExportGradesSummary state={state} />
    </div>
  );
}
