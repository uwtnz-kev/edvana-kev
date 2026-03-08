// Expanded submodule list shown under an open module.
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";

type Props = {
  module: SubjectModuleItem;
  onDeleteSubmodule: (moduleId: string, submoduleId: string) => void;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
};

export function SubjectSubmoduleList({ module, onDeleteSubmodule, onOpenSubmodule }: Props) {
  return (
    <div className="border-t border-white/10 bg-white/5 px-5 py-3">
      <div className="space-y-2 pl-[3.75rem]">
        {module.submodules.map((submodule) => (
          <div
            key={submodule.id}
            role="button"
            tabIndex={0}
            onClick={() => onOpenSubmodule(module.id, submodule.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpenSubmodule(module.id, submodule.id);
              }
            }}
            className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/10 px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#4B2E1F] transition hover:text-[#1EA896]">{submodule.title}</p>
            <p className="mt-1 text-sm text-[#4B2E1F]/70">{submodule.description}</p>
            </div>
            <Button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDeleteSubmodule(module.id, submodule.id);
              }}
              className="h-6 shrink-0 rounded-2xl border border-white/10 bg-white/10 px-2 text-[11px] text-white hover:bg-white/20"
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
