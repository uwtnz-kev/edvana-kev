// Renders class, search, and status filters for grade submissions.
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { useGradeSubmissionsState } from "./useGradeSubmissionsState";

type Props = { state: ReturnType<typeof useGradeSubmissionsState> };

export function GradeSubmissionsFilters({ state }: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl p-4 teacher-panel-hover">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
        <Select value={state.classValue} onValueChange={state.setClassValue}>
          <SelectTrigger className="sm:w-40 h-11 px-4 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white"><SelectValue placeholder="All classes" /></SelectTrigger>
          <SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl text-white rounded-2xl">{state.classOptions.map((option) => <SelectItem key={option.value} value={option.value} className="focus:bg-white/10">{option.label}</SelectItem>)}</SelectContent>
        </Select>
        <div className="relative w-full sm:w-72"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" /><Input value={state.search} onChange={(event) => state.setSearch(event.target.value)} placeholder="Search student name" className="h-11 w-full rounded-2xl bg-white/10 border-white/10 backdrop-blur-xl pl-11 pr-4 text-white placeholder:text-[var(--text-muted)]" /></div>
        <Select value={state.status} onValueChange={(value) => state.setStatus(value as typeof state.status)}>
          <SelectTrigger className="sm:w-40 h-11 px-4 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white"><SelectValue placeholder="All statuses" /></SelectTrigger>
          <SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl text-white rounded-2xl"><SelectItem value="all" className="focus:bg-white/10">All statuses</SelectItem><SelectItem value="submitted" className="focus:bg-white/10">Submitted</SelectItem><SelectItem value="graded" className="focus:bg-white/10">Graded</SelectItem></SelectContent>
        </Select>
      </div>
    </div>
  );
}




