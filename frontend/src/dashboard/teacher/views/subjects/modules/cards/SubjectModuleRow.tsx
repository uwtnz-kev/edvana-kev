// Card row for a single subject module with expand/collapse behavior.
import { BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
import { SubjectModuleMeta } from "./SubjectModuleMeta";
import { SubjectModuleStatus } from "./SubjectModuleStatus";
import { SubjectSubmoduleList } from "./SubjectSubmoduleList";

type Props = {
  isExpanded: boolean;
  module: SubjectModuleItem;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
  onPublish: (moduleId: string) => void;
  onToggle: (moduleId: string) => void;
  theme: { bgClass: string; iconClass: string };
};

export function SubjectModuleRow({ isExpanded, module, onOpenSubmodule, onPublish, onToggle, theme }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-sm transition hover:bg-white/15 hover:shadow-md">
      <button type="button" onClick={() => onToggle(module.id)} className="flex w-full items-start justify-between gap-4 px-5 py-4 pr-32 text-left">
        <div className="flex min-w-0 items-start gap-4">
          <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.bgClass}`}><BookOpen className={`h-5 w-5 ${theme.iconClass}`} /></div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">{isExpanded ? <ChevronDown className="h-4 w-4 text-[#4B2E1F]/60" /> : <ChevronRight className="h-4 w-4 text-[#4B2E1F]/60" />}<h3 className="text-base font-semibold text-[#4B2E1F]">{module.title}</h3></div>
            <p className="mt-1 text-sm text-[#4B2E1F]/70">{module.description}</p>
            <SubjectModuleMeta module={module} />
          </div>
        </div>
      </button>
      <SubjectModuleStatus module={module} onPublish={onPublish} />
      {isExpanded ? <SubjectSubmoduleList module={module} onOpenSubmodule={onOpenSubmodule} /> : null}
    </div>
  );
}
