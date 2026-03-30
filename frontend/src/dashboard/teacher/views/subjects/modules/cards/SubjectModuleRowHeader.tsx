import { useSortable } from "@dnd-kit/sortable";
import { BookOpen, ChevronDown, ChevronRight, GripVertical } from "lucide-react";
import { StatusBadge } from "@/dashboard/teacher/components/shared";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
import { SubjectModuleMeta } from "./SubjectModuleMeta";
import { SubjectModuleStatus } from "./SubjectModuleStatus";

type SortableBindings = Pick<ReturnType<typeof useSortable>, "attributes" | "listeners">;

type Props = {
  attributes: SortableBindings["attributes"];
  descriptionPreview: string;
  isExpanded: boolean;
  listeners: SortableBindings["listeners"];
  module: SubjectModuleItem;
  onDeleteModule: (moduleId: string) => void;
  onPublish: (moduleId: string) => void;
  onToggle: (moduleId: string) => void;
  theme: { bgClass: string; iconClass: string };
};

export function SubjectModuleRowHeader({
  attributes,
  descriptionPreview,
  isExpanded,
  listeners,
  module,
  onDeleteModule,
  onPublish,
  onToggle,
  theme,
}: Props) {
  return (
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
      className="flex w-full cursor-pointer flex-col gap-3 px-5 py-4 text-left"
    >
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-4 overflow-hidden">
          <button
            type="button"
            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/65 transition hover:bg-white/20 hover:text-white"
            aria-label={`Reorder ${module.title}`}
            onClick={(event) => event.stopPropagation()}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </button>
          <div className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.bgClass}`}>
            <BookOpen className={`h-5 w-5 ${theme.iconClass}`} />
          </div>
          <div className="min-w-0 max-w-[55%] flex-1 overflow-hidden">
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
              <h3 className="min-w-0 flex-1 truncate whitespace-nowrap overflow-hidden text-ellipsis text-base font-semibold text-[var(--text-primary)]" title={module.title}>
                {module.title}
              </h3>
            </div>
            {descriptionPreview ? (
              <p className="mt-1 truncate whitespace-nowrap overflow-hidden text-ellipsis text-sm text-[var(--text-primary)]/70" title={descriptionPreview}>
                {descriptionPreview}
              </p>
            ) : null}
          </div>
        </div>
        <div className="shrink-0">
          <StatusBadge status={module.status} label={module.status === "draft" ? "Draft" : "Published"} className="px-3" />
        </div>
      </div>
      <div className="flex min-w-0 items-center justify-between gap-4">
        <SubjectModuleMeta module={module} className="mt-0 min-w-0 flex-1 flex-wrap gap-6 text-sm text-white/70" />
        <SubjectModuleStatus module={module} onDelete={onDeleteModule} onPublish={onPublish} />
      </div>
    </div>
  );
}
