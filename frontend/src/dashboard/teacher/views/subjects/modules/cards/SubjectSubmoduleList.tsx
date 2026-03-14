// Expanded submodule list shown under an open module.
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";
import { SubjectRichDescription } from "./SubjectRichDescription";

type Props = {
  module: SubjectModuleItem;
  onDeleteSubmodule: (moduleId: string, submoduleId: string) => void;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
};

export function SubjectSubmoduleList({ module, onDeleteSubmodule, onOpenSubmodule }: Props) {
  return (
    <div className="border-t border-white/10 bg-white/5 px-5 py-3">
      <div className="space-y-2 pl-0 sm:pl-[3.75rem]">
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
            className="flex cursor-pointer flex-col gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[var(--text-primary)] transition hover:text-[#1EA896]">{submodule.title}</p>
              <SubjectRichDescription
                content={submodule.description}
                className="mt-1 text-sm text-[var(--text-primary)]/70 [&_a]:break-all [&_a]:text-[#1EA896] [&_a]:underline [&_img]:mt-3 [&_img]:max-h-48 [&_img]:w-full [&_img]:rounded-lg [&_img]:object-contain"
              />
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
