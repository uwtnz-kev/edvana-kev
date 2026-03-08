// Status badge and publish action for a subject module row.
import { Upload } from "lucide-react";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";

type Props = {
  module: SubjectModuleItem;
  onPublish: (moduleId: string) => void;
};

export function SubjectModuleStatus({ module, onPublish }: Props) {
  return (
    <div className="absolute right-5 top-4 flex flex-col items-end gap-2 text-right">
      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-[#4B2E1F]/70">{module.status === "draft" ? "Draft" : "Published"}</span>
      {module.status === "draft" ? (
        <button type="button" onClick={(event) => { event.stopPropagation(); onPublish(module.id); }} className="mt-8 flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-emerald-700">
          <Upload className="h-3.5 w-3.5" />Publish
        </button>
      ) : null}
    </div>
  );
}
