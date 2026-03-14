// Options panel for creating grade lists and importing grade files.
import { ListChecks, Plus, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import type { useExportGradesState } from "./useExportGradesState";

type Props = { state: ReturnType<typeof useExportGradesState> };

export function ExportGradesOptionsForm({ state }: Props) {
  return (
    <div className="group rounded-2xl teacher-panel-surface p-4 hover:bg-white/15 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B6F52]/25">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#8B6F52]/75 to-[#6F5238]/75 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"><ListChecks className="h-5 w-5 text-white" /></div>
          <div><p className="text-sm font-medium text-[var(--text-primary)]">Grade Lists</p><p className="text-xs text-[var(--text-secondary)]">Pick or create a list to import into</p></div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Popover open={state.createOpen} onOpenChange={state.setCreateOpen}>
            <PopoverTrigger asChild>
              <button className="group h-11 px-4 rounded-2xl bg-white/10 border border-white/20 text-[var(--text-primary)] hover:bg-white/15 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md hover:shadow-[#8B6F52]/20 flex items-center gap-2" type="button">
                <Plus className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />Create list
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" side="bottom" className="w-[--radix-popover-trigger-width] min-w-[280px] p-3 bg-white/18 backdrop-blur-xl border border-white/25 rounded-2xl">
              <div className="space-y-3">
                <div className="text-sm font-medium text-[var(--text-primary)]">New grade list</div>
                <Input value={state.newListName} onChange={(e) => state.setNewListName(e.target.value)} placeholder="Enter list name" className="bg-white/10 border-white/20 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]" onKeyDown={(e) => { if (e.key === "Enter") state.submitCreate(); }} />
                <div className="flex items-center justify-end gap-2">
                  <button type="button" onClick={() => { state.setNewListName(""); state.setCreateOpen(false); }} className="group h-9 px-3 rounded-xl bg-white/10 border border-white/20 text-[var(--text-primary)] hover:bg-white/15 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-md hover:shadow-[#8B6F52]/20 text-sm font-medium">Cancel</button>
                  <button type="button" onClick={state.submitCreate} className="group h-9 px-3 rounded-xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 text-white hover:opacity-90 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-[#1EA896]/25 text-sm font-medium">Create</button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <label className="group h-11 px-4 rounded-2xl bg-gradient-to-br from-[#1EA896]/85 to-[#159A85]/85 text-white hover:opacity-90 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-[#1EA896]/25 text-sm font-medium flex items-center gap-2 cursor-pointer">
            <Upload className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />Import grades
            <input type="file" accept=".csv,.xlsx" className="hidden" onChange={(e) => state.handleImportGrades(e.target.files?.[0] ?? null)} />
          </label>
        </div>
      </div>
      {state.lastImportedFile ? <div className="mt-3 rounded-xl bg-white/10 border border-white/15 p-3 text-sm text-[var(--text-secondary)]">Imported file: <span className="font-medium text-[var(--text-primary)]">{state.lastImportedFile}</span></div> : null}
    </div>
  );
}



