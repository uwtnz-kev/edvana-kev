// Expanded submodule list shown under an open module.
import type { SubjectModuleItem } from "@/dashboard/teacher/components/subjects/store/subjectModulesTypes";

type Props = {
  module: SubjectModuleItem;
  onOpenSubmodule: (moduleId: string, submoduleId: string) => void;
};

export function SubjectSubmoduleList({ module, onOpenSubmodule }: Props) {
  return (
    <div className="border-t border-white/10 bg-white/5 px-5 py-3">
      <div className="space-y-2 pl-[3.75rem]">
        {module.submodules.map((submodule) => (
          <div key={submodule.id} className="rounded-xl border border-white/10 bg-white/10 px-4 py-3">
            <button type="button" onClick={() => onOpenSubmodule(module.id, submodule.id)} className="text-left text-sm font-semibold text-[#4B2E1F] transition hover:text-[#1EA896]">{submodule.title}</button>
            <p className="mt-1 text-sm text-[#4B2E1F]/70">{submodule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
