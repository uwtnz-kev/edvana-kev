// Renders the module content page header and back navigation.
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { useSubjectModuleContentState } from "./useSubjectModuleContentState";

type Props = { state: ReturnType<typeof useSubjectModuleContentState> };

export function SubjectModuleContentHeader({ state }: Props) {
  return (
    <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="button"
          onClick={state.goBack}
          className="w-fit rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/30 hover:shadow-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${state.theme.bgClass}`}>
            <BookOpen className={`h-6 w-6 ${state.theme.iconClass}`} />
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <h1 className="text-2xl font-semibold leading-tight text-[var(--text-primary)] break-words [overflow-wrap:anywhere] whitespace-normal">{state.pageTitle}</h1>
            {state.module?.description ? (
              <p className="mt-1 text-[var(--text-secondary)] break-words [overflow-wrap:anywhere] whitespace-normal">
                {state.module.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
