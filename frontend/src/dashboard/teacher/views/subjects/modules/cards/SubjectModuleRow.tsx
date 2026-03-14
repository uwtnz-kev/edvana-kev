// Card row for a single subject module with expand/collapse behavior.
import { BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
import { SubjectModuleMeta } from "./SubjectModuleMeta";
import { SubjectModuleStatus } from "./SubjectModuleStatus";
import { SubjectRichDescription } from "./SubjectRichDescription";
import { SubjectSubmoduleList } from "./SubjectSubmoduleList";

type Props = {
  isExpanded: boolean;
  module: SubjectModuleItem;
  onDeleteModule: (moduleId: string) => void;
  onDeleteSubmodule: (moduleId: string, submoduleId: string) => void;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
  onPublish: (moduleId: string) => void;
  onToggle: (moduleId: string) => void;
  theme: { bgClass: string; iconClass: string };
};

export function SubjectModuleRow({
  isExpanded,
  module,
  onDeleteModule,
  onDeleteSubmodule,
  onOpenSubmodule,
  onPublish,
  onToggle,
  theme,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-sm transition hover:bg-white/15 hover:shadow-md">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onToggle(module.id)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle(module.id);
          }
        }}
        className="flex w-full cursor-pointer flex-col gap-4 px-5 py-4 text-left lg:flex-row lg:items-start lg:justify-between"
      >
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.bgClass}`}><BookOpen className={`h-5 w-5 ${theme.iconClass}`} /></div>
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onToggle(module.id);
                }}
                className="rounded-full p-1 text-[var(--text-primary)]/60 transition hover:bg-white/20 hover:text-[var(--text-primary)]"
                aria-label={isExpanded ? `Collapse ${module.title}` : `Expand ${module.title}`}
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              <h3 className="min-w-0 text-base font-semibold text-[var(--text-primary)]">{module.title}</h3>
            </div>
            <SubjectRichDescription
              content={module.description}
              className="mt-1 text-sm text-[var(--text-primary)]/70 [&_a]:break-all [&_a]:text-[#1EA896] [&_a]:underline [&_img]:mt-3 [&_img]:max-h-56 [&_img]:w-full [&_img]:rounded-xl [&_img]:object-contain"
            />
            <SubjectModuleMeta module={module} />
          </div>
        </div>
        <SubjectModuleStatus module={module} onDelete={onDeleteModule} onPublish={onPublish} />
      </div>
      {isExpanded ? (
        <SubjectSubmoduleList
          module={module}
          onDeleteSubmodule={onDeleteSubmodule}
          onOpenSubmodule={onOpenSubmodule}
        />
      ) : null}
    </div>
  );
}
