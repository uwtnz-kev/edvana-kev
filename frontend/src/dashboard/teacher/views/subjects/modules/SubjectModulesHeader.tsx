// Header for the subject modules page with back navigation and subject context.
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { useSubjectModulesViewState } from "./useSubjectModulesViewState";

type Props = { state: ReturnType<typeof useSubjectModulesViewState> };

export function SubjectModulesHeader({ state }: Props) {
  return (
    <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="button" onClick={state.goBack} className="w-fit rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/30 hover:shadow-sm">
          <ArrowLeft className="mr-2 h-4 w-4" />Back
        </Button>
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${state.theme.bgClass}`}><BookOpen className={`h-6 w-6 ${state.theme.iconClass}`} /></div>
          <div><h1 className="text-2xl font-semibold text-[var(--text-primary)]">Modules</h1><p className="mt-1 text-[var(--text-secondary)]">Subject: {state.subjectName}</p></div>
        </div>
      </div>
      <div className="mt-4 relative w-full sm:max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
        <Input
          value={state.searchQuery}
          onChange={(event) => state.setSearchQuery(event.target.value)}
          placeholder="Search modules and submodules"
          aria-label="Search modules and submodules"
          className="h-11 w-full rounded-2xl bg-white/10 border-white/10 backdrop-blur-xl pl-11 pr-4 text-white placeholder:text-[var(--text-muted)]"
        />
      </div>
    </header>
  );
}
