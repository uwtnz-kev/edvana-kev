// Status badge and publish/delete actions for a subject module row.
import { Trash2, Upload } from "lucide-react";
import { destructiveActionButtonClass, destructiveActionIconClass } from "@/dashboard/teacher/components/shared/destructiveActionStyles";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";

type Props = {
  module: SubjectModuleItem;
  onDelete: (moduleId: string) => void;
  onPublish: (moduleId: string) => void;
};

const moduleActionButton =
  "flex items-center justify-center h-8 min-w-[90px] px-2.5 text-xs gap-1.5 rounded-md";

export function SubjectModuleStatus({ module, onDelete, onPublish }: Props) {
  return (
    <div className="flex items-center gap-2">
      {module.status === "draft" ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPublish(module.id);
          }}
          className={`${moduleActionButton} bg-emerald-500 text-white transition hover:bg-emerald-600`}
        >
          <Upload className="h-3.5 w-3.5" />
          Publish
        </button>
      ) : null}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(module.id);
        }}
        className={`${moduleActionButton} ${destructiveActionButtonClass}`}
      >
        <Trash2 className={`h-3.5 w-3.5 ${destructiveActionIconClass}`} />
        Delete
      </button>
    </div>
  );
}
