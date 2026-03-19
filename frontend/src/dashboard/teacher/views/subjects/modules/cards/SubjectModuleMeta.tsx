// Metadata row for lessons, duration, and submodule count.
import { Clock3, FileText } from "lucide-react";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";

type Props = {
  module: SubjectModuleItem;
  className?: string;
};

export function SubjectModuleMeta({ module, className }: Props) {
  return (
    <div className={`flex flex-wrap items-center gap-4 text-xs text-[var(--text-primary)]/60 ${className ?? "mt-3"}`}>
      <span className="inline-flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" />{module.lessons} lessons</span>
      <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{module.duration}</span>
      <span>{module.submodules.length} submodules</span>
    </div>
  );
}
