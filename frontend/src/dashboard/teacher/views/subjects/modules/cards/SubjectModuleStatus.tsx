// Status badge and publish action for a subject module row.
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/dashboard/teacher/components/shared";
import { Trash2, Upload } from "lucide-react";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";

type Props = {
  module: SubjectModuleItem;
  onDelete: (moduleId: string) => void;
  onPublish: (moduleId: string) => void;
};

export function SubjectModuleStatus({ module, onDelete, onPublish }: Props) {
  return (
    <div className="flex w-full shrink-0 flex-wrap items-center justify-end gap-2 lg:w-auto lg:flex-col lg:items-end lg:text-right">
      <StatusBadge status={module.status} label={module.status === "draft" ? "Draft" : "Published"} className="px-3" />
      {module.status === "draft" ? (
        <button type="button" onClick={(event) => { event.stopPropagation(); onPublish(module.id); }} className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-emerald-700">
          <Upload className="h-3.5 w-3.5" />Publish
        </button>
      ) : null}
      <Button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(module.id);
        }}
        className="h-6 shrink-0 rounded-2xl border border-white/10 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20"
      >
        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
        Delete
      </Button>
    </div>
  );
}
