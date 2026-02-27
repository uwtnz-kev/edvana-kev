import { BarChart3, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  GlassSelect,
  GlassSelectTrigger,
  GlassSelectValue,
  GlassSelectContent,
  GlassSelectItem,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";

interface Props {
  subjectId: string;
  onSubjectChange: (v: string) => void;
}

export default function GradesHeader({ subjectId, onSubjectChange }: Props) {
  const navigate = useNavigate();

  return (
    <div className="group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-white/10 backdrop-blur-md p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B6F52]/25">
      
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <BarChart3 className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-[#3B240F]">
            Grades
          </h1>
          <p className="text-sm text-[#6B4F3A]">
            Track, edit, and review assessments
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <GlassSelect value={subjectId} onValueChange={onSubjectChange}>
          <GlassSelectTrigger className="w-full sm:w-56">
            <GlassSelectValue placeholder="Select subject" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            <GlassSelectItem value="math">Mathematics</GlassSelectItem>
            <GlassSelectItem value="science">Science</GlassSelectItem>
            <GlassSelectItem value="english">English</GlassSelectItem>
          </GlassSelectContent>
        </GlassSelect>

        <button
          onClick={() => navigate("/dashboard/teacher/grades/export")}
          className="group flex items-center gap-2 h-11 px-4 rounded-2xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 text-white hover:opacity-90 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-[#1EA896]/25"
        >
          <Download className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-medium">Import Grades</span>
        </button>
      </div>
    </div>
  );
}
