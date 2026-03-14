// Header for the export grades page and back navigation.
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ExportGradesHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="h-11 w-11 rounded-2xl teacher-panel-surface flex items-center justify-center hover:bg-white/15 transition" type="button">
          <ArrowLeft className="h-5 w-5 text-[var(--text-primary)]" />
        </button>
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 flex items-center justify-center"><Download className="h-5 w-5 text-white" /></div>
        <div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Export Grades</h1><p className="text-sm text-[var(--text-secondary)]">Create grade lists, import grades, and export reports</p></div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-[var(--text-secondary)]"><Download className="h-4 w-4" /><span className="text-sm font-medium">Export</span></div>
    </div>
  );
}


