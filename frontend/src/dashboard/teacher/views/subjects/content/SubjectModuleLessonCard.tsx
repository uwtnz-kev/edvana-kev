// Renders the main lesson content card for the selected module or submodule.
import { FileText } from "lucide-react";
import { SubjectModuleContentSections } from "./SubjectModuleContentSections";
import type { useSubjectModuleContentState } from "./useSubjectModuleContentState";

type Props = { state: ReturnType<typeof useSubjectModuleContentState> };

export function SubjectModuleLessonCard({ state }: Props) {
  return (
    <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${state.theme.bgClass}`}>
          <FileText className={`h-6 w-6 ${state.theme.iconClass}`} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">Module Content</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{state.contentTitle}</h2>
          <p className="mt-1 text-sm text-[var(--text-primary)]/70">{state.contentDescription}</p>
        </div>
      </div>

      <article className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-5">
        <SubjectModuleContentSections sections={state.sections} />
      </article>
    </section>
  );
}

